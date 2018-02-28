import {MigrationInterface, QueryRunner} from "typeorm";

export class DateCreate1519841871440 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."users" ADD "date_created" bigint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."users" DROP "date_created"`);
    }

}
