using ToDo.Models;

namespace ToDo.Service.Contracts
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectModel>> GetUserProjectsAsync(int userId);
        Task<ProjectModel> GetProjectByIdAsync(int projectId);
        Task CreateProjectAsync(string projectTitle, int userId);
        Task UpdateProjectAsync(ProjectModel project);
        Task DeleteProjectAsync(int id);
        Task<TodoModel> AddTodoToProjectAsync(int projectId, TodoModel todo);
    }
}
