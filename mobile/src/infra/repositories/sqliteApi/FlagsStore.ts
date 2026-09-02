import type { FeatureFlags } from '@/domain/models/flags';

import { getWalletDb } from './db';

export type FlagsLocalStore = {
  save(flags: FeatureFlags): Promise<void>;
  get(): Promise<FeatureFlags | null>;
};

export function createSqliteFlagsStore(): FlagsLocalStore {
  return {
    async save(flags) {
      const db = await getWalletDb();
      if (!db) {
        return;
      }

      await db.runAsync(
        `INSERT INTO flags (key, enabled)
         VALUES (?, ?)
         ON CONFLICT(key) DO UPDATE SET enabled = excluded.enabled`,
        ['ai_actions', flags.aiActions ? 1 : 0],
      );
    },

    async get() {
      const db = await getWalletDb();
      if (!db) {
        return null;
      }

      const row = await db.getFirstAsync<{ enabled: number }>(
        `SELECT enabled FROM flags WHERE key = ?`,
        ['ai_actions'],
      );

      if (!row) {
        return null;
      }

      return { aiActions: row.enabled === 1 };
    },
  };
}
