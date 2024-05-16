import { sql } from '@vercel/postgres';

// Define your username and password
const USERNAME = 'TusharAgrawal098';
const PASSWORD = 'TusharAgrawal@1234567890';

export default async function handler(request, response) {
  // Check if it's a POST request
  if (request.method === 'POST') {
    try {
      // Extract username and password from request headers
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        response.status(401).json({ success: false, message: 'Unauthorized: No credentials provided' });
        return;
      }

      const encodedCredentials = authHeader.split(' ')[1];
      const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
      const [username, password] = decodedCredentials.split(':');

      // Verify username and password
      if (username !== USERNAME || password !== PASSWORD) {
        response.status(401).json({ success: false, message: 'Unauthorized: Invalid credentials' });
        return;
      }

      const { name, email, country_phone_code, contact, comment } = request.body;

      // Basic validation
      if (!name || !email || !country_phone_code || !contact || !comment) {
        return response.status(400).json({ success: false, message: 'All fields are required' });
      }

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
