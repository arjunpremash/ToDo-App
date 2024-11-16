using Microsoft.EntityFrameworkCore;
using ToDo.EntityFramework.Entity;

namespace ToDo.EntityFramework
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Project> Projects { get; set; }
        public DbSet<Todo> Todos { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    }
}
