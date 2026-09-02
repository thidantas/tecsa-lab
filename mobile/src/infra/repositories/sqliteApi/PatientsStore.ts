import type {
  Biomarker,
  ListPatientsQuery,
  PatientDetail,
  PatientListItem,
} from '@/domain/models/patients';

import { getWalletDb } from './db';

export type PatientsLocalStore = {
  saveList(items: PatientListItem[]): Promise<void>;
  saveDetail(patient: PatientDetail): Promise<void>;
  list(query?: ListPatientsQuery): Promise<PatientListItem[]>;
  getById(id: string): Promise<PatientDetail | null>;
};

type PatientRow = {
  id: string;
  name: string;
  birth_date: string;
  sex: string | null;
  notes: string | null;
  created_at: string | null;
  detail_cached: number;
};

type BiomarkerRow = {
  id: string;
  patient_id: string;
  name: string;
  value: number;
  unit: string;
  measured_at: string;
  ref_low: number | null;
  ref_high: number | null;
};

function toListItem(row: PatientRow): PatientListItem {
  return {
    id: row.id,
    name: row.name,
    birthDate: row.birth_date,
    sex: row.sex,
  };
}

function toBiomarker(row: BiomarkerRow): Biomarker {
  return {
    id: row.id,
    patientId: row.patient_id,
    name: row.name,
    value: row.value,
    unit: row.unit,
    measuredAt: row.measured_at,
    refLow: row.ref_low,
    refHigh: row.ref_high,
  };
}

export function createSqlitePatientsStore(): PatientsLocalStore {
  return {
    async saveList(items) {
      const db = await getWalletDb();
      if (!db) {
        return;
      }

      await db.withTransactionAsync(async () => {
        for (const item of items) {
          await db.runAsync(
            `INSERT INTO patients (id, name, birth_date, sex)
             VALUES (?, ?, ?, ?)
             ON CONFLICT(id) DO UPDATE SET
               name = excluded.name,
               birth_date = excluded.birth_date,
               sex = excluded.sex`,
            [item.id, item.name, item.birthDate, item.sex],
          );
        }
      });
    },

    async saveDetail(patient) {
      const db = await getWalletDb();
      if (!db) {
        return;
      }

      await db.withTransactionAsync(async () => {
        await db.runAsync(
          `INSERT INTO patients (id, name, birth_date, sex, notes, created_at, detail_cached)
           VALUES (?, ?, ?, ?, ?, ?, 1)
           ON CONFLICT(id) DO UPDATE SET
             name = excluded.name,
             birth_date = excluded.birth_date,
             sex = excluded.sex,
             notes = excluded.notes,
             created_at = excluded.created_at,
             detail_cached = 1`,
          [
            patient.id,
            patient.name,
            patient.birthDate,
            patient.sex,
            patient.notes,
            patient.createdAt,
          ],
        );

        await db.runAsync('DELETE FROM biomarkers WHERE patient_id = ?', [
          patient.id,
        ]);

        for (const marker of patient.biomarkers) {
          await db.runAsync(
            `INSERT INTO biomarkers (
               id, patient_id, name, value, unit, measured_at, ref_low, ref_high
             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              marker.id,
              marker.patientId,
              marker.name,
              marker.value,
              marker.unit,
              marker.measuredAt,
              marker.refLow,
              marker.refHigh,
            ],
          );
        }
      });
    },

    async list(query) {
      const db = await getWalletDb();
      if (!db) {
        return [];
      }

      const search = query?.search?.trim().toLowerCase();
      const rows = search
        ? await db.getAllAsync<PatientRow>(
            `SELECT id, name, birth_date, sex, notes, created_at, detail_cached
             FROM patients
             WHERE LOWER(name) LIKE ?
             ORDER BY name COLLATE NOCASE`,
            [`%${search}%`],
          )
        : await db.getAllAsync<PatientRow>(
            `SELECT id, name, birth_date, sex, notes, created_at, detail_cached
             FROM patients
             ORDER BY name COLLATE NOCASE`,
          );

      return rows.map(toListItem);
    },

    async getById(id) {
      const db = await getWalletDb();
      if (!db) {
        return null;
      }

      const row = await db.getFirstAsync<PatientRow>(
        `SELECT id, name, birth_date, sex, notes, created_at, detail_cached
         FROM patients
         WHERE id = ? AND detail_cached = 1`,
        [id],
      );

      if (!row || !row.created_at) {
        return null;
      }

      const markers = await db.getAllAsync<BiomarkerRow>(
        `SELECT id, patient_id, name, value, unit, measured_at, ref_low, ref_high
         FROM biomarkers
         WHERE patient_id = ?
         ORDER BY measured_at DESC`,
        [id],
      );

      return {
        ...toListItem(row),
        notes: row.notes,
        createdAt: row.created_at,
        biomarkers: markers.map(toBiomarker),
      };
    },
  };
}
