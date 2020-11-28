using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace ProAgil.Domain.identity
{
    public class User : IdentityUser<int>
    {
        [Column(TypeName = "nvachar(150)")]
        public string FullName { get; set; }
        public List<UserRole> UserRoles { get; set; }
    }
}