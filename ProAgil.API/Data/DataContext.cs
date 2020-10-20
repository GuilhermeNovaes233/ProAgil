using Microsoft.EntityFrameworkCore;
using ProAgil.API.Models;

namespace ProAgil.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> option) : base(option){}

        public DbSet<Evento> Eventos { get; set; }
    }
}