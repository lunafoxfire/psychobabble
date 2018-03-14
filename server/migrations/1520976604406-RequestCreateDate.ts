import {MigrationInterface, QueryRunner} from "typeorm";

export class RequestCreateDate1520976604406 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."program_requests" ADD "dateCreated" bigint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."program_requests" DROP "dateCreated"`);
    }

}
