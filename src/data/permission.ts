const getPermission = (role: string) => {
  const obj = {
    projects: {
      // Project can be read for any of the user
      read: true,
      create: role === "ADMIN",
      update: role === "ADMIN",
      delete: role === "ADMIN",
    },
    tasks: {
      read: true,
      create: role === "ADMIN" || role === "TASK_CREATOR",
      update: role === "ADMIN" || role === "TASK_CREATOR" || role === "USER",
      delete: role === "ADMIN",
    },
    users: {
      read: role === "ADMIN",
      create: role === "ADMIN",
      update: role === "ADMIN",
      delete: role === "ADMIN",
    },
  };
  return obj;
};
export default getPermission;
