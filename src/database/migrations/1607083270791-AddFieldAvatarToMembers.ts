import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFieldAvatarToMembers1607083270791
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'members',
      new TableColumn({
        name: 'avatar_url',
        type: 'varchar',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('members', 'avatar_url');
  }
}
