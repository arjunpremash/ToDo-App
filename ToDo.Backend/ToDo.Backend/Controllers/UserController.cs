using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDo.Models;
using ToDo.Service.Contracts;

namespace ToDo.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserModel userModel)
        {
            try
            {
                await _userService.CreateNewUserAsync(userModel);
                return StatusCode(201);
                //return CreatedAtAction(nameof(Register), new { id = userId }, new { id = userId });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserModel  userModel)
        {
            var user = await _userService.AuthenticateUserAsync(userModel);

            if (user == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            return Ok(new { message = "Login successful", user });
        }
    }
}
