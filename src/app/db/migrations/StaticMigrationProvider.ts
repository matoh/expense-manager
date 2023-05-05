import { Migration, MigrationProvider } from 'kysely';
import { migrations } from './Migrations';

export default class StaticMigrationProvider implements MigrationProvider {
  async getMigrations(): Promise<Record<string, Migration>> {
    return migrations;
  }
}
