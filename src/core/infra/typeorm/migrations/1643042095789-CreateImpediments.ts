import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateImpediments1643042095789 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "impediments",
            columns: [
              {
                name: "id",
                type: "uuid",
                isPrimary: true,
                generationStrategy: "uuid",
                default: "uuid_generate_v4()",
              },
              {
                name: "project_id",
                type: "uuid",
                isNullable: true,
              },
              {
                name: "name",
                type: "varchar",
              },
              {
                name: "description",
                type: "varchar",
              },
              {
                name: "active",
                type: "bool",
              },
              {
                name: "created_at",
                type: "timestamp",
                default: "now()",
              },
              {
                name: "updated_at",
                type: "timestamp",
                default: "now()",
              },
            ],

            
            foreignKeys: [
                {
                    name: "projectImpedimentId",
                    columnNames: ["project_id"],
                    referencedTableName: "projects",
                    referencedColumnNames: ["id"]
                }
            ]
          })
        );
      }
    
      
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("impediments", "project_id");
        await queryRunner.dropTable("impediments");
      }
}
