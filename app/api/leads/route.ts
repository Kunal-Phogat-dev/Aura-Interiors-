import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ?? '';

export async function POST(request: Request) {
  console.log("--- NEW FORM SUBMISSION ---");

  // Validate environment variables safely BEFORE creating the Supabase client.
  if (!supabaseUrl.startsWith("http")) {
    console.error("FATAL: Supabase URL is missing or invalid in .env.local file.");
    return NextResponse.json({ error: 'Server misconfiguration: Invalid Supabase URL' }, { status: 500 });
  }

  if (!supabaseKey) {
    console.error("FATAL: Supabase Key is missing in .env.local file.");
    return NextResponse.json({ error: 'Server misconfiguration: Invalid Supabase Key' }, { status: 500 });
  }

  // Create client inside the request handler so it only runs when needed
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    // 1. Check if we receive the data
    const body = await request.json();
    console.log("1. Received Body:", body);

    const { full_name, email, phone, requirement, budget } = body;

    // 2. Check validation
    if (!full_name || !phone || !requirement || !email || !budget) {
      console.log("2. Error: Missing fields");
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    console.log("3. Checking for duplicate email in SheetDB...");
    const sheetdbUrl = process.env.SHEETDB_API_URL?.trim();
    if (sheetdbUrl && sheetdbUrl.startsWith("http")) {
      try {
        const sheetdbRes = await fetch(`${sheetdbUrl}/search?email=${encodeURIComponent(email)}`);
        if (sheetdbRes.ok) {
          const sheetData = await sheetdbRes.json();
          if (Array.isArray(sheetData) && sheetData.length > 0) {
            console.log("4. Duplicate email found in SheetDB! Returning 409.");
            return NextResponse.json({ error: 'We already have a consultation request from this email address!' }, { status: 409 });
          }
        } else {
          console.error("SheetDB search failed:", sheetdbRes.statusText);
        }
      } catch (err) {
        console.error("SheetDB fetch error:", err);
      }
    } else {
      console.log("SheetDB URL not configured, skipping SheetDB duplicate check.");
    }

    // Keep the existing Supabase phone number duplicate check just in case
    console.log("3b. Checking for duplicate phone number in Supabase...");
    const { data: existingLeads, error: selectError } = await supabase
      .from('leads')
      .select('id')
      .eq('phone', phone);

    if (selectError) {
      console.error("3a. Supabase select error:", selectError);
    }

    if (existingLeads && existingLeads.length > 0) {
      console.log("4b. Duplicate phone found! Returning 409.");
      return NextResponse.json({ error: 'Looks like we already have a request from this phone number!' }, { status: 409 });
    }

    console.log("5. Attempting Supabase Insert...");

    // 3. Check Supabase connection
    const { data, error } = await supabase
      .from('leads')
      .insert([{ full_name, email, phone, requirement, budget, source: 'website' }])
      .select();

    // 4. Log exactly what Supabase returns
    if (error) {
      console.error("6. SUPABASE ERROR:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("7. SUCCESS! Data inserted:", data);
    return NextResponse.json({ success: true, lead: data }, { status: 200 });

  } catch (error) {
    console.error("FATAL CATCH ERROR:", error);
    return NextResponse.json({ error: 'Server crashed' }, { status: 500 });
  }
}
