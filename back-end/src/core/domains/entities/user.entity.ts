enum role {
  DEVELOPER,
  LIBRARIAN,
  COORDINATOR,
  TEACHER,
  STUDENT,
}

class UserEntity {
  readonly id: string;
  readonly name: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly age: number;
  readonly avatarURL: string;
  readonly role: role;
  readonly isVerified: boolean;
  readonly createdAt: Date;

  constructor({
    name,
    email,
    password,
    age,
    avatarURL,
    username,
  }: Omit<UserEntity, 'id' | 'role' | 'createdAt' | 'isVerified'>) {
    this.id = crypto.randomUUID();
    this.username = username;
    this.name = name;
    this.email = email;
    this.password = password;
    this.age = age;
    this.avatarURL = avatarURL;
    this.role = role.STUDENT; // default role
    this.isVerified = false;
    this.createdAt = new Date();
  }
}

export { UserEntity, role };

