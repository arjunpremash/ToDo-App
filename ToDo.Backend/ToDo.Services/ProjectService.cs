using ToDo.Models;
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

        public async Task<IEnumerable<ProjectModel>> GetAllProjectsAsync()
        {
            return await _projectDataAccess.GetAllProjectsAsync();
        }

        public async Task CreateProjectAsync(string projectTitle)
        {
            await _projectDataAccess.AddProjectAsync(projectTitle);
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
