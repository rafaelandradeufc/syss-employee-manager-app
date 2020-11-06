import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { DepartmentRole } from "../constants/Department";

@Entity()
export class Employee {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ type: "enum", enum: DepartmentRole })
    department: DepartmentRole

    @Column()
    salary: number;

    @Column({ type: "date" })
    birth_date: Date;

}
