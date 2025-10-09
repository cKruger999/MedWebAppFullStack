using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace MedWebApp.Models.Entities
{
    public class VisitRecord
    {
        [Key]
        public int VisitId { get; set; }

        public DateTime VisitDate { get; set; }

        public string? Diagnosis { get; set; } 

        public string? Treatment { get; set;}

        public int PatientId { get; set; }

        [JsonIgnore]
        
        public Patient Patient { get; set; }

    }
}
