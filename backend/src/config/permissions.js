const permissions = {
  owner: [
    "team.view",
    "team.update",
    "team.delete",

    "member.view",
    "member.add",
    "member.remove",
    "member.role.update",

    "project.view",
    "project.create",
    "project.update",
    "project.delete",

    "task.view",
    "task.create",
    "task.update",
    "task.delete",
    "task.assign",
  ],

  admin: [
    "team.view",
    "team.update",

    "member.view",
    "member.add",
    "member.remove",

    "project.view",
    "project.create",
    "project.update",
    "project.delete",

    "task.view",
    "task.create",
    "task.update",
    "task.delete",
    "task.assign",
  ],

  projectManager: [
    "team.view",
    "member.view",

    "project.view",
    "project.create",
    "project.update",
    "project.delete",

    "task.view",
    "task.create",
    "task.update",
    "task.delete",
    "task.assign",
  ],

  member: [
    "team.view",
    "member.view",

    "project.view",

    "task.view",
    "task.update",
  ],

  viewer: ["team.view", "member.view", "project.view", "task.view"],
};

module.exports = permissions;
