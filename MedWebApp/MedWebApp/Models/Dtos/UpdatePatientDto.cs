using MedWebApp.Models.Entities;
using System.ComponentModel.DataAnnotations;

namespace MedWebApp.Models.Dtos
{
    public class UpdatePatientDto
    {
        public required string PatientName { get; set; }

        public required string PatientSurname { get; set; }

        public required string Gender { get; set; }

        public required string HomeAddress { get; set; }

        public required string EmailAddress { get; set; }

        public required string PhoneNumber { get; set; }

        public required bool HasMedicalAid { get; set; }

        public required string MedicalAidCompany { get; set; }

    }
}
