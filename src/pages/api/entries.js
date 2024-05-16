import { createPool, sql } from '@vercel/postgres';

// PostgreSQL connection details
const POSTGRES_URL = process.env.POSTGRES_URL || "postgres://default:wYsbxV7P2kNj@ep-odd-cell-a1hgzrd4-pooler.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require";

// Create a pool for database connections
const pool = createPool({
  connectionString: POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false // Only use this if you're not using self-signed certificates
  }
});

export default async function handler(req, res) {
  try {
    // Pagination parameters
    const pageSize = 200;
    const pageNumber = parseInt(req.query.page || 1);

    // Calculate the offset based on page number and page size
    const offset = (pageNumber - 1) * pageSize;

    // Query to select entries with pagination and sorting by latest
    const query = sql`
      SELECT *
      FROM form_data
      ORDER BY id DESC
      LIMIT ${pageSize}
      OFFSET ${offset}
    `;

    // Execute the query
    const result = await pool.query(query);

    // Extract the rows from the result
    const entries = result.rows;

    // Send the entries as JSON response
    res.status(200).json(entries);
  } catch (error) {
    console.error('Error fetching entries:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
