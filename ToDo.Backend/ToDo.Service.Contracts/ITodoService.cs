using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.Models;

namespace ToDo.Service.Contracts
{
    public interface ITodoService
    {
        Task<IEnumerable<TodoModel>> GetTodosByProjectIdAsync(int projectId);
        Task AddTodoAsync(TodoModel todo);
    }
}
