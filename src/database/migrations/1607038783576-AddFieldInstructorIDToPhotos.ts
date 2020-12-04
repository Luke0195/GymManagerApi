import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddFieldInstructorIDToPhotos1607038783576
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'photos',
      new TableColumn({
        name: 'instructor_id',
        type: 'uuid',
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      'photos',
      new TableForeignKey({
        name: 'PhotosInstructor',
        columnNames: ['instructor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'instructors',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('photos', 'PhotosInstructor');
    await queryRunner.dropColumn('photos', 'instructor_id');
  }
}
