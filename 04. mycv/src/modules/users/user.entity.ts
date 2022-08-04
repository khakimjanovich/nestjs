import {AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Exclude} from "class-transformer";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

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
