using ToDo.Models;

namespace ToDo.DataAccess.Contracts
{
    public interface IProjectDataAccess
    {
        Task<IEnumerable<ProjectModel>> GetAllProjectsAsync();
        Task AddProjectAsync(string projectTitle);
        Task UpdateProjectAsync(ProjectModel project);
        Task DeleteProjectAsync(int id);
        Task<TodoModel> AddTodoToProjectAsync(int projectId, TodoModel todo);
    }
}
