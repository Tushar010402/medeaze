// pages/api/submitForm.js

import { pool } from '../../utils/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, country_phone_code, contact, comment } = req.body;

    // Basic validation
    if (!name || !email || !country_phone_code || !contact || !comment) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
      // Insert form data into the database
      const query = 'INSERT INTO form_data (name, email, country_phone_code, contact, comment) VALUES ($1, $2, $3, $4, $5)';
      const values = [name, email, country_phone_code, contact, comment];
      await pool.query(query, values);

      return res.status(201).json({ success: true, message: 'Form data saved successfully' });
    } catch (error) {
      console.error('Error saving form data:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
