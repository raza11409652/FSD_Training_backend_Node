import Project from "../models/project.model";
class ProjectService {
  constructor(private readonly project: typeof Project) {}
  /**
   *
   * @param proj
   * @returns
   */
  async saveProject(proj: { [key: string]: any }) {
    return await this.project.create({ ...proj });
  }
  /**
   *
   * @param id
   * @returns
   */
  async getProject(id: number) {
    return await this.project.findByPk(id);
  }

  /**
   *
   * @param limit
   * @param skip
   * @param filter
   * @returns
   */
  async getRecords(limit: number, skip: number, filter = {}) {
    const r1 = this.project.findAll({
      limit: limit,
      offset: skip,
      where: { ...filter, isDeleted: false },
    });
    const r2 = this.project.count({ where: filter });
    const [records, counts] = await Promise.all([r1, r2]);
    return { records, counts };
  }
  /**
   *
   * @param id
   * @param body
   * @returns
   */
  async updateProject(id: number, body: { [key: string]: any }) {
    return this.project.update(body, { where: { id } });
  }
}

const projectService = new ProjectService(Project);

export default projectService;
