import {MigrationInterface, QueryRunner} from "typeorm";

export class validated1519869764607 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."users" ADD "validated" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."users" DROP "validated"`);
    }

}
