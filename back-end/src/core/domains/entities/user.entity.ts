enum role {
  DEVELOPER,
  LIBRARIAN,
  COORDINATOR,
  TEACHER,
  STUDENT,
}

class UserEntity {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  age: number;
  avatarURL: string;
  role: role;
  isVerified: boolean;
  createdAt: Date;

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
