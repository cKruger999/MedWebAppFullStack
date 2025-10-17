using MedWebApp.Models;
using MedWebApp.Models.SignUp;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace MedWebApp.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        public AdminController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] User registerUser, string role)
        {
            IdentityUser? userExist = await _userManager.FindByEmailAsync(registerUser.EmailAddress);
            if (userExist != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, new Response { Status = "Error", Message = "User Already Exists!" });
            }

            IdentityUser user = new()
            {
                Email = registerUser.EmailAddress,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = registerUser.Username,
            };
            if (await _roleManager.RoleExistsAsync(role))
            {
                var result = await _userManager.CreateAsync(user, registerUser.Password);
                if (!result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User Failed To Create!" });
                }
                await _userManager.AddToRoleAsync(user, role);
                return StatusCode(StatusCodes.Status200OK, new Response { Status = "Success", Message = "User Created SuccessFully!" });

            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "This Role Does Not Exist!" });
            }
        }

        [HttpGet("users-with-roles")]
        public async Task<IActionResult> GetAllUsersWithRoles()
        {
            var users = _userManager.Users.ToList();
            var userList = new List<object>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                userList.Add(new
                {
                    user.Id,
                    user.UserName,
                    user.Email,
                    Roles = roles
                });
            }

            return Ok(userList);
        }

        [HttpDelete("Delte-users")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound(new Response { Status = "Error", Message = "User not found." });
            }

            var result = await _userManager.DeleteAsync(user);


            return Ok(user);



        }


    }
}
