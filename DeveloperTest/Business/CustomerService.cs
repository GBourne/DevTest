using DeveloperTest.Business.Interfaces;
using DeveloperTest.Database;
using DeveloperTest.Database.Models;
using DeveloperTest.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeveloperTest.Business
{
    public class CustomerService:ICustomerService
    {
        private readonly ApplicationDbContext context;
        public CustomerService(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task< CustomerModel[]> GetCustomers()
        {
            return  await context.Customers.Select(x => new CustomerModel
            {
                CustomerId = x.CustomerId,
                Name = x.Name,
                Type = x.Type
            }).ToArrayAsync();
        }

        public async Task<CustomerModel> GetCustomer(int id)
        {
            return await context.Customers.Where(x => x.CustomerId == id).Select(x => new CustomerModel
            {
                CustomerId = x.CustomerId,
                Name = x.Name,
                Type = x.Type
            }).SingleOrDefaultAsync();
        }

        public CustomerModel CreateCustomer(BaseCustomerModel model)
        {
            var addedCustomer = context.Customers.Add(new Customer
            {
                Name = model.Name,
                Type = (CustomerType)model.Type
            });

            context.SaveChanges();

            return new CustomerModel
            {
                CustomerId = addedCustomer.Entity.CustomerId,
                Name = addedCustomer.Entity.Name,
                Type = addedCustomer.Entity.Type
            };
        }
    }
}
