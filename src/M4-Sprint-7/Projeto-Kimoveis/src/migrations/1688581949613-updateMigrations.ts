import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMigrations1688581949613 implements MigrationInterface {
  name = "UpdateMigrations1688581949613";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "admin" SET DEFAULT true`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "admin" SET DEFAULT false`);
  }
}
