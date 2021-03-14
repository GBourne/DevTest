using DeveloperTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeveloperTest.Business.Interfaces
{
    public interface ICustomerService
    {
        Task<CustomerModel[]> GetCustomers();
        Task<CustomerModel> GetCustomer(int id);

        CustomerModel CreateCustomer(BaseCustomerModel model);


    }
}
