// import { Model } from "sequelize";
import User from "../models/user.model";
class UserService {
  constructor(private readonly user: typeof User) {}
  async getUserByEmail(email: string) {
    return await this.user.findOne({
      where: { email },
      raw: true,
      // include: { model: User, as: "users" },
    });
  }
  async newUser(o: { [key: string]: any }) {
    return (await this.user.create(o)).save();
  }
  async getRecords(limit: number, skip: number, filter = {}) {
    const r1 = this.user.findAll({
      limit: limit,
      offset: skip,
      where: filter,
    });
    const r2 = this.user.count({ where: filter });
    const [records, counts] = await Promise.all([r1, r2]);
    return { records, counts };
  }
  async updateUser(id: number, body: { [key: string]: any }) {
    return this.user.update(body, { where: { id } });
  }
}
const userService = new UserService(User);
export default userService;
