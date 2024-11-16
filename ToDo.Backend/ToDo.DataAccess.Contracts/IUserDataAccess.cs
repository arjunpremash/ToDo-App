using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.Models;

namespace ToDo.DataAccess.Contracts
{
    public interface IUserDataAccess
    {
        public Task CreateNewUserAsync (UserModel user);
        public Task DeleteUserAsync (UserModel user);
        public Task<UserModel> AuthenticateUserAsync (UserModel user);
    }
}
