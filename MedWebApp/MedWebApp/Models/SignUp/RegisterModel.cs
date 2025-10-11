using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace MedWebApp.Models.SignUp
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Username is Required")]
        public string Username { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is Required")]
        public string EmailAddress { get; set; }

        [Required(ErrorMessage = "Password is Required")]
        public string Password { get; set; }
    }
}
