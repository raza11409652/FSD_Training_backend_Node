import User from "../models/user.model";
class UserService {
  constructor(private readonly user: typeof User) {}
  async getUserByEmail(email: string) {
    return await this.user.findOne({ where: { email } });
  }
  async newUser(o: { [key: string]: any }) {
    return (await this.user.create(o)).save();
  }
}
const userService = new UserService(User);
export default userService;
