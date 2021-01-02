import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'issues',
})
export class IssueEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public content: string;
}
