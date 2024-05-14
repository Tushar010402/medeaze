// utils/db.js

// utils/db.js

import { Pool } from 'pg';

// Database configuration
const dbConfig = {
  user: 'mydatabaseuser',
  host: 'localhost',
  database: 'mydatabase',
  password: 'mypassword',
  port: 5432, // Default PostgreSQL port
};

// Create a new Pool instance with the database configuration
export const pool = new Pool(dbConfig);
