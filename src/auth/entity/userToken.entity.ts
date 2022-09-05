import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index('FK_user')
    user_id: number;

    @Column()
    token: string;

    @Column()
    expired_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}