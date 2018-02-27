import {MigrationInterface, QueryRunner} from "typeorm";

export class NormalizedEmail1519771412500 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."users" ADD "normalized_email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."users" DROP "normalized_email"`);
    }

}
