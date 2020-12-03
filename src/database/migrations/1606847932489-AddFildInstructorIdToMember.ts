import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddFildInstructorIdToMember1606847932489
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'members',
      new TableColumn({
        name: 'instructor_id',
        type: 'uuid',
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      'members',
      new TableForeignKey({
        name: 'MemberInstructor',
        columnNames: ['instructor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'instructors',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('members', 'MemberInstructor');
    await queryRunner.dropColumn('members', 'instructor_id');
  }
}
