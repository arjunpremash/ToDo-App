using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.Models;

namespace ToDo.Service.Contracts
{
    public interface IUserService
    {
        Task CreateNewUserAsync(UserModel user);
        Task<UserModel> AuthenticateUserAsync(UserModel user);
    }
}
