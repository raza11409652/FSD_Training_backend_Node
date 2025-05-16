import Task from "../models/task.model";

class TaskService {
  constructor(private readonly task: typeof Task) {}

  /**
   *
   * @param obj
   * @returns
   */
  async newTask(obj: { [key: string]: any }) {
    return (await this.task.create(obj)).save();
  }

  /**
   *
   * @param filter
   * @param limit
   * @param skip
   * @returns
   */
  async getTasks(filter = {}, limit: number, skip: number) {
    const r1 = this.task.findAll({ where: filter, limit: limit, offset: skip });
    const r2 = this.task.count({ where: filter });
    const [count, records] = await Promise.all([r2, r1]);
    return { count, records };
  }

  /**
   *
   * @param id
   * @returns
   */
  async deleteTask(id: number) {
    return await this.task.destroy({ where: { id: id } });
  }
  /**
   *
   * @param id
   * @param body
   * @returns
   */
  async updateTask(id: number, body: { [key: string]: any }) {
    return this.task.update(body, { where: { id } });
  }
  /**
   *
   * @param id
   * @returns
   */
  async getTask(id: number) {
    return await this.task.findByPk(id);
  }
  /**
   *
   * @param filter
   * @param body
   * @returns
   */
  async updateTaskUsingFilter(
    filter: { [key: string]: any },
    body: { [key: string]: any }
  ) {
    return this.task.update(body, { where: filter });
  }
}

const taskService = new TaskService(Task);
export default taskService;
