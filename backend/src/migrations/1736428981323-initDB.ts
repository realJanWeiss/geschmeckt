import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1736428981323 implements MigrationInterface {
  name = 'InitDB1736428981323';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ean" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ratings" ("userId" uuid NOT NULL, "productId" uuid NOT NULL, "rating" smallint NOT NULL, CONSTRAINT "PK_c6dd5319da95523a9aa4708d9c3" PRIMARY KEY ("userId", "productId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "version" integer NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "version" integer NOT NULL, CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "groups_users_users" ("groupsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_8dee02fc8de57bffcccce22565d" PRIMARY KEY ("groupsId", "usersId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6320d5cbd6f7702b2e78d38d6b" ON "groups_users_users" ("groupsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0f3881cfe1ef94b0e435d1d72f" ON "groups_users_users" ("usersId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD CONSTRAINT "FK_4d0b0e3a4c4af854d225154ba40" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD CONSTRAINT "FK_abcea824a43708933e5ac15a0e4" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups_users_users" ADD CONSTRAINT "FK_6320d5cbd6f7702b2e78d38d6b8" FOREIGN KEY ("groupsId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups_users_users" ADD CONSTRAINT "FK_0f3881cfe1ef94b0e435d1d72f9" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "groups_users_users" DROP CONSTRAINT "FK_0f3881cfe1ef94b0e435d1d72f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups_users_users" DROP CONSTRAINT "FK_6320d5cbd6f7702b2e78d38d6b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" DROP CONSTRAINT "FK_abcea824a43708933e5ac15a0e4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" DROP CONSTRAINT "FK_4d0b0e3a4c4af854d225154ba40"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0f3881cfe1ef94b0e435d1d72f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6320d5cbd6f7702b2e78d38d6b"`,
    );
    await queryRunner.query(`DROP TABLE "groups_users_users"`);
    await queryRunner.query(`DROP TABLE "groups"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "ratings"`);
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
