import { Model, Column, Table } from 'sequelize-typescript';

@Table({ tableName: 'Logs', underscored: true })
export class Log extends Model {
  @Column({ allowNull: false })
  module: string;

  @Column({ allowNull: false })
  moduleId: number;

  @Column({ allowNull: false })
  state: string;
}
