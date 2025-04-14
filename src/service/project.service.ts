import Project from "../models/project.model";
class ProjectService {
  constructor(private readonly project: typeof Project) {}

  async saveProject(proj: { [key: string]: any }) {
    return await this.project.create({ ...proj });
  }

  async getRecords(limit: number, skip: number, filter = {}) {
    const r1 = this.project.findAll({
      limit: limit,
      offset: skip,
      where: filter,
    });
    const r2 = this.project.count({ where: filter });
    const [records, counts] = await Promise.all([r1, r2]);
    return { records, counts };
  }
}

const projectService = new ProjectService(Project);

export default projectService;
