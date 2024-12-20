﻿using ToDo.Models;
using ToDo.Service.Contracts;
using ToDo.DataAccess.Contracts;

namespace ToDo.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectDataAccess _projectDataAccess;

        public ProjectService(IProjectDataAccess projectDataAccess)
        {
            _projectDataAccess = projectDataAccess;
        }

        public async Task<ProjectModel> GetProjectByIdAsync(int projectId)
        {
            return await _projectDataAccess.GetProjectByIdAsync(projectId);
        }

        public async Task<IEnumerable<ProjectModel>> GetUserProjectsAsync(int userId)
        {
            return await _projectDataAccess.GetUserProjectsAsync(userId);
        }

        public async Task CreateProjectAsync(string projectTitle, int userId)
        {
            await _projectDataAccess.AddProjectAsync(projectTitle, userId);
        }

        public async Task UpdateProjectAsync(ProjectModel project)
        {
            await _projectDataAccess.UpdateProjectAsync(project);
        }

        public async Task DeleteProjectAsync(int id)
        {
            await _projectDataAccess.DeleteProjectAsync(id);
        }

        public async Task<TodoModel> AddTodoToProjectAsync(int projectId, TodoModel todo)
        {
            return await _projectDataAccess.AddTodoToProjectAsync(projectId, todo);
        }
    }
}
