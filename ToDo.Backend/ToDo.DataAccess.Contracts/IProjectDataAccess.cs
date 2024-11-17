using ToDo.Models;

namespace ToDo.DataAccess.Contracts
{
    public interface IProjectDataAccess
    {
        Task<IEnumerable<ProjectModel>> GetUserProjectsAsync(int userId);
        Task AddProjectAsync(string projectTitle, int userId);
        Task UpdateProjectAsync(ProjectModel project);
        Task DeleteProjectAsync(int id);
        Task<TodoModel> AddTodoToProjectAsync(int projectId, TodoModel todo);
    }
}
