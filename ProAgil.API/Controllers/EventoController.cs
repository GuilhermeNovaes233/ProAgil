using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Domain;
using ProAgil.Repository;

namespace ProAgil.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventoController : ControllerBase
    {
        private readonly IProAgilRepository _repository;
        public EventoController(IProAgilRepository repository){
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try{
                var results = await _repository.GetAllEventosAsync(true);
                return Ok(results);
            }
            catch(System.Exception){
                  return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }
        }

        [HttpGet("{EventoId}")]
        public async Task<IActionResult> Get(int EventoId)
        {
            try{
                var results = await _repository.GetEventosAsyncById(EventoId, true);
                return Ok(results);
            }
            catch(System.Exception){
                  return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }
        }

        [HttpGet("getByTema/{EventoId}")]
        public async Task<IActionResult> Get(string tema)
        {
            try{
                var results = await _repository.GetAllEventosAsyncByTema(tema, true);
                return Ok(results);
            }
            catch(System.Exception){
                  return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Evento model)
        {
            try{
                _repository.Add(model);

                if(await _repository.SaveChancesAsync()){
                    return Created($"/evento/{model.Id}", model);
                }
 
            }
            catch(System.Exception){
                  return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }

            return BadRequest();
        }

        [HttpPut("{EventoId}")]
        public async Task<IActionResult> Put(int eventoId, Evento model)
        {
            try{

                var evento = await _repository.GetEventosAsyncById(eventoId, false);

                if(evento == null) return NotFound();

                _repository.Update(model);

                if(await _repository.SaveChancesAsync()){
                    return Created($"/evento/{model.Id}", model);
                }
 
            }
            catch(System.Exception){
                  return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }

            return BadRequest();
        }

       [HttpDelete("{EventoId}")]
        public async Task<IActionResult> Delete(int eventoId)
        {
            try{

                var evento = await _repository.GetEventosAsyncById(eventoId, false);

                if(evento == null) return NotFound();

                _repository.Delete(evento);

                if(await _repository.SaveChancesAsync()){
                    return Ok();
                }
            }
            catch(System.Exception){
                  return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }

            return BadRequest();
        }
    }
}