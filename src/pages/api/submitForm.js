import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  if (request.method === 'POST') {
    const { name, email, country_phone_code, contact, comment } = request.body;

    // Basic validation
    if (!name || !email || !country_phone_code || !contact || !comment) {
      return response.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
      // Insert form data into the database
      await sql`INSERT INTO form_data (name, email, country_phone_code, contact, comment) VALUES (${name}, ${email}, ${country_phone_code}, ${contact}, ${comment});`;

      return response.status(201).json({ success: true, message: 'Form data saved successfully' });
    } catch (error) {
      console.error('Error saving form data:', error);
      return response.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    return response.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
