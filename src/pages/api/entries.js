import { sql } from '@vercel/postgres';

import { pool } from '../../utils/db';

export default async function handler(req, res) {
  try {
    // Connect to the PostgreSQL database
    const client = await pool.connect();

    // Pagination parameters
    const pageSize = 200;
    const pageNumber = parseInt(req.query.page || 1);

    // Calculate the offset based on page number and page size
    const offset = (pageNumber - 1) * pageSize;

    // Query to select entries with pagination and sorting by latest
    const query = `
      SELECT *
      FROM form_data
      ORDER BY id DESC
      LIMIT ${pageSize}
      OFFSET ${offset}
    `;

    // Execute the query
    const result = await client.query(query);

    // Release the client back to the pool
    client.release();

    // Extract the rows from the result
    const entries = result.rows;

    // Send the entries as JSON response
    res.status(200).json(entries);
  } catch (error) {
    console.error('Error fetching entries:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

