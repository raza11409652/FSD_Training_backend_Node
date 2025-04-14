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

  async deleteTask(id: number) {
    return await this.task.destroy({ where: { id: id } });
  }
}

const taskService = new TaskService(Task);
export default taskService;
