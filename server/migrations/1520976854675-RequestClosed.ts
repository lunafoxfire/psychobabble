import {MigrationInterface, QueryRunner} from "typeorm";

export class RequestClosed1520976854675 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."program_requests" ADD "closed" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."program_requests" DROP "closed"`);
    }

}
