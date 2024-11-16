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
    public class UserService: IUserService
    {
        private readonly IUserDataAccess _userDataAccess;

        public UserService(IUserDataAccess userDataAccess)
        {
            _userDataAccess = userDataAccess;
        }

        public async Task CreateNewUserAsync(UserModel userModel)
        {
            await _userDataAccess.CreateNewUserAsync(userModel);
        }

        public async Task<UserModel> AuthenticateUserAsync(UserModel userModel)
        {
            return await _userDataAccess.AuthenticateUserAsync(userModel);
        }
    }
}
