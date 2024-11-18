using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDo.EntityFramework.Entity;
using ToDo.Models;
using ToDo.Service.Contracts;

namespace ToDo.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ITodoService _todoService;

        public TodoController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoModel>>> GetTodosByProjectIdAsync(int projectId)
        {
            var todos = await _todoService.GetTodosByProjectIdAsync(projectId);
            return Ok(todos);
        }

        [HttpPost]
        public async Task<IActionResult> AddTodoAsync(TodoModel todo)
        {
            if (string.IsNullOrWhiteSpace(todo.Description))
            {
                return BadRequest("Todo Description cannot be empty.");
            }

            await _todoService.AddTodoAsync(todo);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateTodoCompleteStatusAsync(int TodoId)
        {
            await _todoService.UpdateTodoStatusAsync(TodoId);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodoAsync(int id, [FromBody] TodoModel todo)
        {
            if (id != todo.TodoId)
            {
                return BadRequest("Task ID mismatch.");
            }
            await _todoService.UpdateTodoDescriptionAsync(todo);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task DeleteAsync(int id) {
            await _todoService.DeleteTodoAsync(id);
        }
    }
}
