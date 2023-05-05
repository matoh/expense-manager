import { Kysely, MigrationResultSet, Migrator, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Database } from '../database';
import StaticMigrationProvider from './StaticMigrationProvider';

function createDbConnection() {
  return new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({
        host: process.env['DB_HOST'],
        user: process.env['DB_USER'],
        password: process.env['DB_PASSWORD'],
        database: 'expense_manager'
      })
    })
  });
}

/**
 * Execute migrations to the latest db state
 */
async function migrateToLatest(): Promise<MigrationResultSet> {
  const db = createDbConnection();
  const migrator = new Migrator({
    db,
    provider: new StaticMigrationProvider()
  });

  const migrationResultSet = await migrator.migrateToLatest();
  await db.destroy();

  return migrationResultSet;
}

/**
 * Execute one up migration at the time
 */
async function migrateOneUp(): Promise<MigrationResultSet> {
  const db = createDbConnection();
  const migrator = new Migrator({
    db,
    provider: new StaticMigrationProvider()
  });

  const migrationResultSet = await migrator.migrateUp();
  await db.destroy();

  return migrationResultSet;
}

/**
 * Execute one down migration at the time
 */
async function migrateOneDown(): Promise<MigrationResultSet> {
  const db = createDbConnection();
  const migrator = new Migrator({
    db,
    provider: new StaticMigrationProvider()
  });

  const migrationResultSet = await migrator.migrateDown();
  await db.destroy();

  return migrationResultSet;
}

export { migrateToLatest, migrateOneUp, migrateOneDown };
