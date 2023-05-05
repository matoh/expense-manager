import { Kysely, MigrationResultSet, Migrator, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Database } from '../database';
import StaticMigrationProvider from './StaticMigrationProvider';

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: process.env['DB_HOST'],
      user: process.env['DB_USER'],
      password: process.env['DB_PASSWORD'],
      database: 'expense_manager'
    })
  })
});

const migrator = new Migrator({
  db,
  provider: new StaticMigrationProvider()
});

function showResultsInConsole(resultSet: MigrationResultSet) {
  resultSet.results?.forEach((result) => {
    if (result.status === 'Success') {
      console.log(`Migration "${result.migrationName}" was executed successfully`);
    } else if (result.status === 'Error') {
      console.error(`Failed to execute migration "${result.migrationName}"`);
    }
  });

  if (resultSet.error) {
    console.error('Failed to migrate');
    console.error(resultSet.error);
    process.exit(1);
  }
}

/**
 * Execute migrations to the latest db state
 */
async function migrateToLatest() {
  const migrationResultSet = await migrator.migrateToLatest();
  showResultsInConsole(migrationResultSet);

  await db.destroy();
}

/**
 * Execute one up migration at the time
 */
async function migrateOneUp() {
  const migrationResultSet = await migrator.migrateUp();
  showResultsInConsole(migrationResultSet);

  await db.destroy();
}

/**
 * Execute one down migration at the time
 */
async function migrateOneDown() {
  const migrationResultSet = await migrator.migrateDown();
  showResultsInConsole(migrationResultSet);

  await db.destroy();
}

export { migrateToLatest, migrateOneUp, migrateOneDown };
