import {MigrationInterface, QueryRunner} from "typeorm";

export class RequestExpire1520983260034 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."program_requests" ADD "expiration" bigint`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."program_requests" DROP "expiration"`);
    }

}
