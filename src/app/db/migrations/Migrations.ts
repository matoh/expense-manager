import { Kysely, MigrationResultSet, Migrator, sql } from 'kysely';
import { kyselyConnection } from '../Database';
import StaticMigrationProvider from './StaticMigrationProvider';

/**
 * Migrate Database based on direction of the migration
 * "up":    Execute one up migration at the time
 * "down":  Execute one down migration at the time
 * "latest":Execute migrations to the latest db state
 * @param direction
 */
async function migrate(direction: 'up' | 'down' | 'latest') {
  const db = kyselyConnection();
  const migrator = new Migrator({
    db,
    provider: new StaticMigrationProvider()
  });

  let migrationResultSet: MigrationResultSet;
  switch (direction) {
    case 'up':
      migrationResultSet = await migrator.migrateUp();
      break;
    case 'down':
      migrationResultSet = await migrator.migrateDown();
      break;
    default:
      migrationResultSet = await migrator.migrateToLatest();
  }

  return migrationResultSet;
}

const migrations = {
  '2023_05_05_create_expense_table': {
    async up(db: Kysely<any>): Promise<void> {
      await db.schema
        .createTable('expense')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('merchant', 'text', (col) => col.notNull())
        .addColumn('description', 'text')
        .addColumn('category', 'text', (col) => col.notNull())
        .addColumn('cost_sek', 'float4', (col) => col.notNull())
        .addColumn('cost_eur', 'float4', (col) => col.notNull())
        .addColumn('date', 'date', (col) => col.notNull())
        .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`NOW()`))
        .execute();
    },
    async down(db: Kysely<any>): Promise<void> {
      await db.schema.dropTable('expense').execute();
    }
  },
  // '2023_05_27_add_date_field_to_expense_table': {
  //   async up(db: Kysely<any>): Promise<void> {
  //     await db.schema.alterTable('expense').addColumn('date', 'date' ).execute();
  //   },
  //   async down(db: Kysely<any>): Promise<void> {
  //     await db.schema.alterTable('expense').dropColumn('date').execute();
  //   }
  // }
};

export { migrations, migrate };
