using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.Models;

namespace ToDo.DataAccess.Contracts
{
    public interface ITodoDataAccess
    {
        Task<IEnumerable<TodoModel>> GetTodosByProjectIdAsync(int projectId);
        Task AddTodoAsync(TodoModel todo);
    }
}
