import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMigrations1688582009299 implements MigrationInterface {
  name = "UpdateMigrations1688582009299";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "admin" SET DEFAULT false`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "admin" SET DEFAULT true`);
  }
}
