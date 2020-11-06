import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import bcrypt = require("bcrypt");

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;


  @BeforeInsert()
  @BeforeUpdate()
  private hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  compareHash(hash: string) {
    return bcrypt.compareSync(hash, this.password);
  }

}
