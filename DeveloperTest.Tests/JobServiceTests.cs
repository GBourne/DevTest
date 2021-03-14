using DeveloperTest.Business;
using DeveloperTest.Business.Interfaces;
using DeveloperTest.Database;
using DeveloperTest.Database.Models;
using DeveloperTest.Models;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Linq;

namespace DeveloperTest.Tests
{
    [TestFixture]
    public class JobServiceTests
    {
        private ApplicationDbContext _context;
        private DateTime _date1;
        private DateTime _date2;
        private IJobService _sut;

        [OneTimeSetUp]
        public void Setup()
        {
            _date1 = DateTime.Now.AddDays(1);
            _date2 = DateTime.Now.AddDays(10);
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                            .UseInMemoryDatabase(databaseName: "ApplicationDataBase")
                            .Options;

            _context = new ApplicationDbContext(options);

            _context.Jobs.Add(new Job
            {
                JobId = 1,
                Engineer = "Dave",
                When = _date1,
                CustomerId = 5,
                Customer = new Customer { CustomerId = 5, Name = "Jane", Type = CustomerType.Small }

            });

            _context.Jobs.Add(new Job
            {
                JobId = 2,
                Engineer = "Jon",
                When = _date2,
                CustomerId = 3,
                Customer = new Customer { CustomerId = 3, Name = "Sue", Type = CustomerType.Large }
            });


            _context.SaveChanges();

            _sut = new JobService(_context);

        }

       
        [Test, Order(1)]
        [TestCase(0)]
        [TestCase(1)]
        [TestCase(2)]
        public void GetJob_Should_Return_A_JobModel(int jobId)
        {
           
            //Act
            var job = _sut.GetJob(jobId);

            //Assert
            if (jobId == 0)
            {
                Assert.IsNull(job);
            }
            else
            {
                Assert.IsInstanceOf<JobModel>(job);
                Assert.AreEqual(jobId, job.JobId);
                Assert.AreEqual(jobId == 1 ? "Dave" : "Jon", job.Engineer);
                Assert.AreEqual(jobId == 1 ? "Jane" : "Sue", job.CustomerName);
                Assert.AreEqual(jobId == 1 ? _date1 : _date2, job.When);
                Assert.AreEqual(jobId == 1 ? CustomerType.Small : CustomerType.Large, job.CustomerType);
            }

        }

        [Test, Order(2)]
        [TestCase]
        public void GetJobs_Should_Return_A_JobModel_Array()
        {
            
            //Act
            var jobs = _sut.GetJobs();

            //Assert
            Assert.AreEqual(2, jobs.Length);
          
        }

        [Test, Order(3)]
        [TestCase]
        public void CreateJob_Should_Create_A_Job()
        {
            //Arrange
            var model = new BaseJobModel
            {
                Engineer = "Tim",
                When = DateTime.Now,
                CustomerId = 3
            };

            //Act
            var job = _sut.CreateJob(model);

            //Assert
            Assert.IsInstanceOf<JobModel>(job);
            Assert.AreEqual("Tim", job.Engineer);
            Assert.AreEqual(3, _context.Jobs.Count());

        }
    }
}