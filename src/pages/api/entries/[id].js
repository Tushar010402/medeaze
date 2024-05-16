import { sql } from '@vercel/postgres';
import { pool } from '../../../utils/db.js';

// Define your username and password
const USERNAME = 'TusharAgrawal098';
const PASSWORD = 'TusharAgrawal@1234567890';

export default async function handler(req, res) {
  // Check if it's a POST request
  if (req.method === 'POST') {
    try {
      // Extract username and password from request headers
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        res.status(401).json({ error: 'Unauthorized: No credentials provided' });
        return;
      }

      const encodedCredentials = authHeader.split(' ')[1];
      const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
      const [username, password] = decodedCredentials.split(':');

      // Verify username and password
      if (username !== USERNAME || password !== PASSWORD) {
        res.status(401).json({ error: 'Unauthorized: Invalid credentials' });
        return;
      }

      // Get the entry ID from the URL
      const entryId = req.query.id;

      // Get the status and remark from the request body
      const { status, remark } = req.body;

      // Execute the query using sql template literal
      await sql`
        UPDATE form_data
        SET action_text = ${status}, remark_text = ${remark}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${entryId};
      `;

      // Send a success response
      res.status(200).json({ message: 'Entry updated successfully' });
    } catch (error) {
      console.error('Error updating entry:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      // Pagination parameters
      const pageSize = 200;
      const pageNumber = parseInt(req.query.page || 1);

      // Calculate the offset based on page number and page size
      const offset = (pageNumber - 1) * pageSize;

      // Execute the query using sql template literal
      const entries = await sql`
        SELECT *, action_text
        FROM form_data
        ORDER BY id DESC
        LIMIT ${pageSize}
        OFFSET ${offset};
      `;

      // Send the entries as JSON response
      res.status(200).json(entries);
    } catch (error) {
      console.error('Error fetching entries:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // If it's not a POST or GET request, return a 404 error
    res.status(404).json({ error: 'Not Found' });
  }
}
