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

  await db.destroy();

  return migrationResultSet;
}

const migrations = {
  '2023_05_05_create_user_table': {
    async up(db: Kysely<any>): Promise<void> {
      await db.schema
        .createTable('user')
        .addColumn('user_id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
        .addColumn('first_name', 'text')
        .addColumn('last_name', 'text')
        .addColumn('email', 'text', (col) => col.unique())
        .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`NOW()`))
        .execute();
    },
    async down(db: Kysely<any>): Promise<void> {
      await db.schema.dropTable('user').execute();
    }
  }
};

export { migrations, migrate };
