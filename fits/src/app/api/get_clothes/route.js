import mysql from 'mysql2';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Change this to your MySQL username
    password: 'mochinut',  // Change this to your MySQL password
    database: 'clothing_db',  // Your database name
  });

  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM clothes', (err, results) => {
      if (err) {
        reject(new Error('Database query failed'));
      } else {
        resolve(NextResponse.json({ clothes: results }));
      }
    });
  }).catch((err) => {
    // Handle errors
    return NextResponse.json({ error: 'Server error', details: err.message }, { status: 500 });
  }).finally(() => {
    // Close the database connection
    connection.end();
  });
}
