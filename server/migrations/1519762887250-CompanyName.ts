import {MigrationInterface, QueryRunner} from "typeorm";

export class CompanyName1519762887250 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."users" ADD "company_name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."users" DROP "company_name"`);
    }

}
