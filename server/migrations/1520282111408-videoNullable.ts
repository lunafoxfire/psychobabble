import {MigrationInterface, QueryRunner} from "typeorm";

export class videoNullable1520282111408 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."videos" ALTER COLUMN "video_ref" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."videos" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."videos" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."videos" ALTER COLUMN "video_ref" DROP NOT NULL`);
    }

}
