import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateMembers1606838592235 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'members',
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
            name: 'blood',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: ' weight',
            type: 'numeric',
            isNullable: false,
          },
          {
            name: 'height',
            type: 'numeric',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('members');
  }
}
