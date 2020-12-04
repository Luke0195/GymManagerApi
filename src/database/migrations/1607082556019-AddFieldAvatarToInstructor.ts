import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFieldAvatarToInstructor1607082556019
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'instructors',
      new TableColumn({
        name: 'avatar_url',
        type: 'varchar',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('instructors', 'avatar_url');
  }
}
