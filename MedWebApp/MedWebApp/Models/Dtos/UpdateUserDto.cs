using MedWebApp.Models.SignUp;
using System.ComponentModel.DataAnnotations;

namespace MedWebApp.Models.Dtos
{
    public class UpdateUserDto
    {
        public string Username { get; set; }

        public string EmailAddress { get; set; }

        public string Password { get; set; }
    }
}
