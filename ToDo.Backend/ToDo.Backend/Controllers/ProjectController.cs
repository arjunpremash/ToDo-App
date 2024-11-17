using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDo.EntityFramework.Entity;
using ToDo.Models;
using ToDo.Service.Contracts;

namespace ToDo.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<ProjectModel>>> GetProjects(int userId)
        {
            var projects = await _projectService.GetAllProjectsAsync(userId);
            return Ok(projects);
        }

        [HttpPost("{userId}")]
        public async Task<IActionResult> CreateProject([FromBody] ProjectModel project, int userId)
        {
            if (string.IsNullOrWhiteSpace(project.Title))
            {
                return BadRequest("Project title cannot be empty.");
            }

            await _projectService.CreateProjectAsync(project.Title, userId);
            return StatusCode(201);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, [FromBody] ProjectModel project)
        {
            if (id != project.ProjectId)
            {
                return BadRequest("Project ID mismatch.");
            }

            //var existingProject = await _projectService.GetProjectByIdAsync(id);
            //if (existingProject == null)
            //{
            //    return NotFound();
            //}

            await _projectService.UpdateProjectAsync(project);
            return NoContent();
        }

        // DELETE: api/project/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            //var project = await _projectService.GetProjectByIdAsync(id);
            //if (project == null)
            //{
            //    return NotFound();
            //}

            await _projectService.DeleteProjectAsync(id);
            return NoContent();
        }

        // POST: api/project/{id}/todo
        [HttpPost("{projectId}/todo")]
        public async Task<ActionResult<Todo>> AddTodoToProject(int projectId, [FromBody] TodoModel todo)
        {
            if (string.IsNullOrWhiteSpace(todo.Description))
            {
                return BadRequest("Todo description cannot be empty.");
            }

            //var project = await _projectService.GetProjectByIdAsync(projectId);
            //if (project == null)
            //{
            //    return NotFound("Project not found.");
            //}

            var createdTodo = await _projectService.AddTodoToProjectAsync(projectId, todo);
            return StatusCode(201);
        }
    }
}
