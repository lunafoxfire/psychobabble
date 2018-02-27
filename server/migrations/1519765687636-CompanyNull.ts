import {MigrationInterface, QueryRunner} from "typeorm";

export class CompanyNull1519765687636 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "company_name" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."users" ALTER COLUMN "company_name" DROP NOT NULL`);
    }

}
