type role =
  'ADMIN' |
  'DEVELOPER' |
  'LIBRARIAN' |
  'STUDENT' 


class UserEntity {
  readonly id: string;
  readonly name: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly birthday: Date;
  readonly avatarURL: string;
  readonly role: role;
  readonly isVerified: boolean;
  readonly createdAt: Date;

  constructor({
    name,
    email,
    password,
    birthday,
    avatarURL,
    username,
  }: Omit<UserEntity, 'id' | 'role' | 'createdAt' | 'isVerified'>) {
    this.id = crypto.randomUUID();
    this.username = username;
    this.name = name;
    this.email = email;
    this.password = password;
    this.birthday = birthday;
    this.avatarURL = avatarURL;
    this.role = 'STUDENT'; // default role
    this.isVerified = false;
    this.createdAt = new Date();
  }
}

export { UserEntity, role };

