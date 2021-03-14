using DeveloperTest.Business;
using DeveloperTest.Business.Interfaces;
using DeveloperTest.Database;
using DeveloperTest.Database.Models;
using DeveloperTest.Models;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeveloperTest.Tests
{
    [TestFixture]
    public class CustomerServiceTests
    {
        private ICustomerService _sut;
        private ApplicationDbContext _context;

        [OneTimeSetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                            .UseInMemoryDatabase(databaseName: "ApplicationDataBase")
                            .Options;

            _context = new ApplicationDbContext(options);

            _context.Customers.Add(new Customer
            {
                CustomerId = 10,
                Name = "Cameron",
                Type = CustomerType.Small

            });

            _context.Customers.Add(new Customer
            {
                CustomerId = 11,
                Name = "Amelia",
                Type = CustomerType.Large

            });


            _context.SaveChanges();

            _sut = new CustomerService(_context);

        }

        

        [Test, Order(1)]
        [TestCase(0)]
        [TestCase(10)]
        [TestCase(11)]
        public async Task GetCustomer_Should_Return_A_CustomerModel(int customerId)
        {
            
            //Act
            var customer = await _sut.GetCustomer(customerId);

            //Assert
            if (customerId == 0)
            {
                Assert.IsNull(customer);
            }
            else
            {
                Assert.IsInstanceOf<CustomerModel>(customer);
                Assert.AreEqual(customerId, customer.CustomerId);
                Assert.AreEqual(customerId == 10 ? "Cameron" : "Amelia", customer.Name);
                Assert.AreEqual(customerId == 10 ? CustomerType.Small : CustomerType.Large, customer.Type);
            }

        }

        [Test, Order(2)]
        [TestCase]
        public async Task GetCustomerss_Should_Return_A_CustomerModel_Array()
        {
          
            //Act
            var customers = await _sut.GetCustomers();

            //Assert
            Assert.IsInstanceOf<CustomerModel[]>(customers);
            Assert.AreEqual(2, customers.Length);

        }

        [Test, Order(3)]
        [TestCase]
        public void CreateCustoimer_Should_Create_A_Customer()
        {
            //Arrange
            var model = new BaseCustomerModel
            {
                Name = "Anita",
                Type = 2
            };

            //Act
            var customer = _sut.CreateCustomer(model);

            //Assert
            Assert.IsInstanceOf<CustomerModel>(customer);
            Assert.AreEqual("Anita", customer.Name);
            Assert.AreEqual(CustomerType.Large,customer.Type);
            Assert.AreEqual(3, _context.Customers.Count());


        }
    }
}
