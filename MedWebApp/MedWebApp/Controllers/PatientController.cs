using MedWebApp.Data;
using MedWebApp.Models.Dtos;
using MedWebApp.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MedWebApp.Controllers
{
    [Authorize(Roles = "Doctor's Assistant, Doctor")]
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        readonly MedAppDbContext dbContext;
        public PatientController(MedAppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpGet]
        public IActionResult GetAllPatients()
        {
            var allstudents = dbContext.Patients.ToList();
            return Ok(allstudents);
        }
        [HttpPost]
        public IActionResult AddPatient(AddPatientDto addPatientDto)
        {
            var patientEntity = new Patient()
            {
                PatientName = addPatientDto.PatientName,
                PatientSurname = addPatientDto.PatientSurname,
                PatientUsername = addPatientDto.PatientUsername,
                Gender = addPatientDto.Gender,
                HomeAddress = addPatientDto.HomeAddress,
                EmailAddress = addPatientDto.EmailAddress,
                PhoneNumber = addPatientDto.PhoneNumber,
                HasMedicalAid = addPatientDto.HasMedicalAid,
                MedicalAidCompany = addPatientDto.MedicalAidCompany
            };

            dbContext.Patients.Add(patientEntity);
            dbContext.SaveChanges();
            return Ok(patientEntity);
        }
        [HttpGet]
        [Route("{id:int}")]

        public IActionResult GetPatient(int id)
        {
            var patient = dbContext.Patients.Find(id);
            if (patient == null) 
            {
                return NotFound();
            }
            return Ok(patient);
        }

        [HttpPut]
        public IActionResult UpdatePatient(int id, UpdatePatientDto updatePatientDto)
        {
            var patient = dbContext.Patients.Find(id);
            if (patient == null)
            {
                return NotFound();
            }

            patient.PatientName = updatePatientDto.PatientName;
            patient.PatientSurname = updatePatientDto.PatientSurname;
            patient.PatientUsername = updatePatientDto.PatientUsername;
            patient.Gender = updatePatientDto.Gender;
            patient.HomeAddress = updatePatientDto.HomeAddress;
            patient.EmailAddress = updatePatientDto.EmailAddress;
            patient.PhoneNumber = updatePatientDto.PhoneNumber;
            patient.HasMedicalAid = updatePatientDto.HasMedicalAid;
            patient.MedicalAidCompany = updatePatientDto.MedicalAidCompany;
            dbContext.SaveChanges();
            return Ok(patient);
        }
        [HttpDelete]
        public IActionResult DeletePatient(int id)
        {
            var patient = dbContext.Patients.Find(id);
            if (patient == null)
            {
                return NotFound();
            }

            dbContext.Patients.Remove(patient);
            dbContext.SaveChanges();
            return Ok(patient);
        }

        [HttpGet("search")]
        [Authorize(Roles = "Doctor")]
        public IActionResult SearchPatients([FromQuery] string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
                return BadRequest("Search term is required");

            var patients = dbContext.Patients
                .Where(p =>
                    p.PatientId.ToString().Contains(searchTerm) ||
                    p.PatientName.Contains(searchTerm) ||
                    p.PatientSurname.Contains(searchTerm) ||
                    p.PatientUsername.Contains(searchTerm))
                .ToList();

            return Ok(patients);
        }

    }
}
