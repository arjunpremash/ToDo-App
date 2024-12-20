﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.DataAccess.Contracts;
using ToDo.EntityFramework;
using ToDo.EntityFramework.Entity;
using ToDo.Models;

namespace ToDo.DataAccess
{
    public class TodoDataAccess : ITodoDataAccess
    {
        private readonly ApplicationDbContext _context;

        public TodoDataAccess(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TodoModel>> GetTodosByProjectIdAsync(int projectId)
        {
            var Todos = _context.Todos
                                .Where(t => t.ProjectId == projectId)
                                .ToList();
            List<TodoModel> todoModels = new List<TodoModel>();
            foreach (var t in Todos) {
                todoModels.Add(new TodoModel()
                {
                    TodoId = t.TodoId,
                    ProjectId = t.ProjectId,
                    Description = t.Description,
                    CreatedDate = t.CreatedDate,
                    UpdatedDate = t.UpdatedDate,
                    IsCompleted = t.IsCompleted,
                });
            }
            return todoModels;
        }

        public async Task AddTodoAsync(TodoModel todo)
        {
            Project project = await _context.Projects.FindAsync(todo.ProjectId);

            if (project == null)
            {
                throw new Exception($"Project was not found.");
            }

            _context.Todos.Add(new Todo()
            {
                ProjectId = todo.ProjectId,
                Description = todo.Description,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now,
                IsCompleted = false,
            });
            await _context.SaveChangesAsync();
        }

        public async Task UpdateTodoStatusAsync(int TodoId)
        {
            var todo = await _context.Todos.FindAsync(TodoId);
            if (todo == null)
            {
                throw new Exception("Task Not Found");
            }
            todo.IsCompleted = !todo.IsCompleted;
            todo.UpdatedDate = DateTime.Now;
            _context.Todos.Update(todo);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateTodoDescriptionAsync(TodoModel todoModel)
        {
            var todo = await _context.Todos.FindAsync(todoModel.TodoId);
            if (todo == null)
            {
                throw new Exception("Task Not Found");
            }
            todo.Description = todoModel.Description;
            todo.UpdatedDate = DateTime.Now;
            _context.Todos.Update(todo);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTodoAsync(int todoId)
        {
            var todo = await _context.Todos.FindAsync(todoId);
            if (todo == null)
            {
                throw new Exception("Task Not Found");
            }
            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();
        }
    }
}
