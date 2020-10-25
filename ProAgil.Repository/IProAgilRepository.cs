using System.Collections.Generic;
using System.Threading.Tasks;
using ProAgil.Domain;

namespace ProAgil.Repository
{
    public interface IProAgilRepository
    {
        //GERAL
         void Add<T>(T entity) where T : class;
         void Update<T>(T entity) where T : class;
         void Delete<T>(T entity) where T : class;
         Task<bool> SaveChancesAsync();

         //EVENTOS
         Task<Evento[]> GetAllEventosAsyncByTema(string tema, bool includePalestrantes);
         Task<Evento[]> GetAllEventosAsync( bool includePalestrantes);
         Task<Evento> GetEventosAsyncById(int eventoId, bool includePalestrantes);

         //PALESTRANTE
         Task<Palestrante[]> GetAllPalestrantesAsyncByName(string name, bool includeEventos);
         Task<Palestrante> GetPalestranteAsync(int palestranteId, bool includeEventos);
    }   
}