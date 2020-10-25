using System.Collections.Generic;

namespace ProAgil.Domain
{
    public class Palestrante
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int Resumo { get; set; }
        public int ImagemUrl { get; set; }
        public int Telefone { get; set; }
        public int Email { get; set; }
        public List<RedeSocial> RedesSociais { get; set; }
        public List<PalestranteEvento> PalestrantesEventos { get; set; }
    }
}