import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name: 'users'})
// @Entity({name: 'Administradores'})

export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    nombre: string

    @Column({unique: true})
    apellido: string

    @Column({unique: true})
    username: string

    @Column() 
    password: string

    @Column({ type:'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @Column({nullable: true})
    authStrategy: string
}

// export class Album{
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column({unique: true})
//     nombre: string

//     @Column({unique: true})
//     apellido: string

//     @Column({unique: true})
//     username: string

//     @Column() 
//     password: string

//     @Column({ type:'datetime', default: () => 'CURRENT_TIMESTAMP'})
//     createdAt: Date

//     @Column({nullable: true})
//     authStrategy: string
// }