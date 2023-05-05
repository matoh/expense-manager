import { Kysely, sql } from 'kysely';

export const migrations = {
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
