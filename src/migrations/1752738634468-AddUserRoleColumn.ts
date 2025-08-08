import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserRoleColumn1752738634468 implements MigrationInterface {
    name = 'AddUserRoleColumn1752738634468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    }

}
