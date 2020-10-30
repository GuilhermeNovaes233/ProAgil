using System.ComponentModel.DataAnnotations;

namespace ProAgil.API.Dtos
{
    public class LoteDto
    {
        public int Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public decimal Preco { get; set; }
        public string DataInicio { get; set; }
        public string DataFim { get; set; }
        
        [Range(2, 10000, ErrorMessage = "Quantidade de lotes é entre 2 e 10000")]
        public int Quantidade { get; set; }
    }
}