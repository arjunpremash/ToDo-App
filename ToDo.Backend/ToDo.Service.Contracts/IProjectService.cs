using ToDo.Models;

namespace ToDo.Service.Contracts
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectModel>> GetAllProjectsAsync();
        Task CreateProjectAsync(string projectTitle);
        Task UpdateProjectAsync(ProjectModel project);
        Task DeleteProjectAsync(int id);
        Task<TodoModel> AddTodoToProjectAsync(int projectId, TodoModel todo);
    }
}
