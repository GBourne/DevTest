using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DeveloperTest.Models
{
    public class BaseCustomerModel
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public int Type { get; set; }
    }
}
