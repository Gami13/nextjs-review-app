'use server';

import Database from 'better-sqlite3';
import { NextResponse } from 'next/server';
import { getDbFilePath } from './serverPath';
const db = new Database(getDbFilePath()).exec(
  'CREATE TABLE IF NOT EXISTS reviews (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, movie TEXT, rating INTEGER, review TEXT)'
);
export async function send(formData: FormData) {
  'use server';
  console.log('received');
  let name = formData.get('name')?.toString() || '';
  let email = formData.get('email')?.toString() || '';
  let movie = formData.get('movie')?.toString() || '';
  let rating = formData.get('rating')?.toString() || '';
  let review = formData.get('review')?.toString() || '';
  const errors = [];
  if (!name) {
    errors.push('Imie jest wymagane');
  }
  if (!email) {
    errors.push('Email jest wymagany');
  }
  if (!movie) {
    errors.push('Film jest wymagany');
  }
  if (!rating) {
    errors.push('Ocena jest wymagana');
  }
  if (!review) {
    errors.push('Recenzja jest wymagana');
  }
  if (email && !email.includes('@')) {
    errors.push('Email musi zawierać znak @');
  }
  if (name.length < 2) {
    errors.push('Imie musi zawierać przynajmniej 2 znaki');
  }
  if (errors.length > 0) {
    return { ok: false, errors };
  }
  console.log(name, email, movie, rating, review);

  const insert = await db
    .prepare(
      'INSERT INTO reviews (name, email, movie, rating, review) VALUES (?, ?, ?, ?, ?)'
    )
    .run(name, email, movie, rating, review);
  console.log(insert);

  const rows = await db.prepare('SELECT * FROM reviews').all();
  console.log(rows);

  return { ok: true };
}
