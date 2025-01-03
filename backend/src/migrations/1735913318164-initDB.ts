import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1735913318164 implements MigrationInterface {
  name = 'InitDB1735913318164';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`products\` (\`id\` varchar(36) NOT NULL, \`ean\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`ratings\` (\`userId\` varchar(255) NOT NULL, \`productId\` varchar(255) NOT NULL, \`rating\` tinyint NOT NULL, PRIMARY KEY (\`userId\`, \`productId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`version\` int NOT NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`groups\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`version\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`groups_users_users\` (\`groupsId\` varchar(36) NOT NULL, \`usersId\` varchar(36) NOT NULL, INDEX \`IDX_6320d5cbd6f7702b2e78d38d6b\` (\`groupsId\`), INDEX \`IDX_0f3881cfe1ef94b0e435d1d72f\` (\`usersId\`), PRIMARY KEY (\`groupsId\`, \`usersId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`ratings\` ADD CONSTRAINT \`FK_4d0b0e3a4c4af854d225154ba40\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`ratings\` ADD CONSTRAINT \`FK_abcea824a43708933e5ac15a0e4\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`groups_users_users\` ADD CONSTRAINT \`FK_6320d5cbd6f7702b2e78d38d6b8\` FOREIGN KEY (\`groupsId\`) REFERENCES \`groups\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`groups_users_users\` ADD CONSTRAINT \`FK_0f3881cfe1ef94b0e435d1d72f9\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`groups_users_users\` DROP FOREIGN KEY \`FK_0f3881cfe1ef94b0e435d1d72f9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`groups_users_users\` DROP FOREIGN KEY \`FK_6320d5cbd6f7702b2e78d38d6b8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`ratings\` DROP FOREIGN KEY \`FK_abcea824a43708933e5ac15a0e4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`ratings\` DROP FOREIGN KEY \`FK_4d0b0e3a4c4af854d225154ba40\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_0f3881cfe1ef94b0e435d1d72f\` ON \`groups_users_users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_6320d5cbd6f7702b2e78d38d6b\` ON \`groups_users_users\``,
    );
    await queryRunner.query(`DROP TABLE \`groups_users_users\``);
    await queryRunner.query(`DROP TABLE \`groups\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP TABLE \`ratings\``);
    await queryRunner.query(`DROP TABLE \`products\``);
  }
}
