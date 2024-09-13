import { randomUUID } from 'node:crypto';

enum role {
    DEVELOPER,   
	LIBRARIAN,  
	COORDINATOR,
	TEACHER,
	STUDENT    
}

class UserEntity {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    age: number;
    avatarURL: string;
    role: role
    isVerified: boolean;
    createdAt: Date;

    constructor({ name, email, password, age, avatarURL, username } : Omit<UserEntity, "id" | "role" | "createdAt" | "isVerified">) {
        this.id = randomUUID();
        this.username = username;
        this.name = name;
        this.email = email;
        this.password = password;
        this.age = age;
        this.avatarURL = avatarURL;
        this.role = role.STUDENT
        this.isVerified = false;
        this.createdAt = new Date();
    }
    
}

export { UserEntity };

