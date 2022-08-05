import {AfterInsert, AfterRemove, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Exclude} from "class-transformer";
import {Report} from "../reports/report.entity";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column({default: true})
    admin: boolean

    @Column()
    @Exclude()
    password: string;

    @OneToMany(() => Report, (reports) => reports.user)
    reports: Report[]

    @AfterInsert()
    logInsert() {
        console.log('Inserted user with id: ' + this.id)
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`Update user with id: ${this.id}`)
    }

    @AfterRemove()
    logRemove() {
        console.log(`User with id: ${this.id} has been removed`)
    }
}
