import * as SQLite from 'expo-sqlite';

const SCHEMA = `
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS patients (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  birth_date TEXT NOT NULL,
  sex TEXT,
  notes TEXT,
  created_at TEXT,
  detail_cached INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS biomarkers (
  id TEXT PRIMARY KEY NOT NULL,
  patient_id TEXT NOT NULL,
  name TEXT NOT NULL,
  value REAL NOT NULL,
  unit TEXT NOT NULL,
  measured_at TEXT NOT NULL,
  ref_low REAL,
  ref_high REAL,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS biomarkers_patient_id ON biomarkers(patient_id);
CREATE TABLE IF NOT EXISTS flags (
  key TEXT PRIMARY KEY NOT NULL,
  enabled INTEGER NOT NULL
);
`

let dbPromise: Promise<SQLite.SQLiteDatabase | null> | null = null;

async function openWalletDb(): Promise<SQLite.SQLiteDatabase | null> {
  try {
    const db = await SQLite.openDatabaseAsync('tecsa-wallet.db');
    await db.execAsync(SCHEMA);
    return db;
  } catch {
    return null;
  }
}

export function getWalletDb() {
  if (!dbPromise) {
    dbPromise = openWalletDb();
  }

  return dbPromise;
}
