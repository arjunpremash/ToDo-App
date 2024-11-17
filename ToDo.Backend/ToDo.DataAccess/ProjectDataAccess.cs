using Microsoft.EntityFrameworkCore;
using ToDo.DataAccess.Contracts;
using ToDo.EntityFramework;
using ToDo.EntityFramework.Entity;
using ToDo.Models;

namespace ToDo.DataAccess
{
    public class ProjectDataAccess : IProjectDataAccess
    {
        private readonly ApplicationDbContext _context;

        public ProjectDataAccess(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ProjectModel>> GetAllProjectsAsync(int userId)
        {
            var projects = _context.Projects
                                .Where(p => p.UserId == userId)
                                .ToList();

            List<ProjectModel> result = new List<ProjectModel>();
            foreach (var project in projects)
            {
                result.Add(new ProjectModel()
                {
                    ProjectId = project.ProjectId,
                    Title = project.Title,
                    CreatedDate = project.CreatedDate,
                });
            }
            return result;
        }


        public async Task AddProjectAsync(string projectTitle, int userId)
        {
            _context.Projects.Add(new Project()
            {
                Title = projectTitle,
                CreatedDate = DateTime.Now,
                UserId = userId
            });
            await _context.SaveChangesAsync();
            return;
        }

        public async Task UpdateProjectAsync(ProjectModel project)
        {
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProjectAsync(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project != null)
            {
                _context.Projects.Remove(project);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<TodoModel> AddTodoToProjectAsync(int projectId, TodoModel todo)
        {
            var project = await _context.Projects.FindAsync(projectId);
            if (project != null)
            {
                todo.ProjectId = projectId;
                _context.Todos.Add(new Todo()
                {
                    ProjectId = project.ProjectId,
                    Description = todo.Description,
                    CreatedDate= DateTime.Now,
                    UpdatedDate = DateTime.Now,
                });
                await _context.SaveChangesAsync();
                return todo;
            }
            return null;
        }
    }
}
