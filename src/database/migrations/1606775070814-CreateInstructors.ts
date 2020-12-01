import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateInstructors1606775070814
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'instructors',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },

          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },

          {
            name: 'gender',
            type: 'varchar',
            isNullable: false,
          },

          {
            name: 'birth',
            type: 'date',
            isNullable: false,
          },

          {
            name: 'services',
            type: 'varchar',
            isNullable: false,
          },

          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },

          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('instructors');
  }
}
