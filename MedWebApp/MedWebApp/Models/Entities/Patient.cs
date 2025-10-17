
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace MedWebApp.Models.Entities
{
    public class Patient
    {
        [Key]
        public int PatientId { get; set; }

        public required string PatientName { get; set; }

        public required string PatientSurname { get; set; }

        public required string PatientUsername { get; set; }

        public required string Gender { get; set; }

        public required string HomeAddress { get; set; }

        public required string EmailAddress { get; set; }

        public required string PhoneNumber { get; set; }

        public required bool HasMedicalAid { get; set; }

        public required string MedicalAidCompany { get; set; }

        [JsonIgnore]

        public ICollection<VisitRecord> Visits { get; set; }

    }
}
