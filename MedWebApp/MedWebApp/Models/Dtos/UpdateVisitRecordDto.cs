using MedWebApp.Models.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedWebApp.Models.Dtos
{
    public class UpdateVisitRecordDto
    {
        public DateTime VisitDate { get; set; } = DateTime.Now;

        public required string Diagnosis { get; set; }

        public required string Treatment { get; set; }

        public int PatientId { get; set; }

    }
}
