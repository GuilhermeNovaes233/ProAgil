using System;

namespace ProAgil.API.Models
{
    public class Evento
    {
        public int EventoId { get; set; }     
        public string Local { get; set; }
        public String DataEvento { get; set; }
        public string Tema { get; set; }
        public int QtdPessoas { get; set; }
        public string Lote { get; set; }
    }
}