using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.DataAccess.Contracts;
using ToDo.Models;
using ToDo.Service.Contracts;

namespace ToDo.Services
{
    public class TodoService: ITodoService
    {
        private readonly ITodoDataAccess _todoDataAccess;

        public TodoService(ITodoDataAccess todoDataAccess)
        {
            _todoDataAccess = todoDataAccess;
        }   

        public async Task<IEnumerable<TodoModel>> GetTodosByProjectIdAsync(int projectId)
        {
            return await _todoDataAccess.GetTodosByProjectIdAsync(projectId);
        }

        public async Task AddTodoAsync(TodoModel todo)
        {
            await _todoDataAccess.AddTodoAsync(todo);
        }

        public async Task UpdateTodoStatusAsync(int TodoId)
        {
            await _todoDataAccess.UpdateTodoStatusAsync(TodoId);
        }
    }
}
