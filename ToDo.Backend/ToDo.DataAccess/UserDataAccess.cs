using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
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
    public class UserDataAccess : IUserDataAccess
    {
        private ApplicationDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;

        public UserDataAccess(ApplicationDbContext context, IPasswordHasher<User> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        public async Task CreateNewUserAsync(UserModel userModel)
        {
            if (UserNameExists(userModel.Username))
            {
                throw new Exception("Username already exists");
            }
            User user = new User();
            user.Username = userModel.Username;
            user.PasswordHash = _passwordHasher.HashPassword(user, userModel.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task<UserModel> AuthenticateUserAsync(UserModel userModel)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u=> u.Username == userModel.Username);
            if (user == null) {
                return null;
            }
            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, userModel.Password);
            return result == PasswordVerificationResult.Success ? userModel : null;
        }

        public Task DeleteUserAsync(UserModel user) { return Task.CompletedTask; }

        private bool UserNameExists(string username)
        {
            if (_context.Users.Any(u => u.Username == username))
                return true;
            else
                return false;
        }

    }
}
