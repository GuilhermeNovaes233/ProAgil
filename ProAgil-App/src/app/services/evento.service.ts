import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../_models/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  baseUrl = 'https://localhost:5001/evento';

  constructor(private http: HttpClient) { }

    getAllEvento(): Observable<Evento[]>{
        return this.http.get<Evento[]>(this.baseUrl);
    }

    getEventoByTema(tema: string): Observable<Evento[]>{
      return this.http.get<Evento[]>('${this.baseUrl}/getByTema/${tema}');
    }

    getEventoById(id: number): Observable<Evento[]>{
      return this.http.get<Evento[]>('${this.baseUrl}/${id}');
    }

    postEvento(evento: Evento) {
      console.log(evento);
      return this.http.post(this.baseUrl, evento);
    }

    putEvento(evento: Evento) {
      console.log(evento);
      return this.http.put(`${this.baseUrl}/${evento.id}`, evento);
    }

    deleteEvento(evento: Evento){
      return this.http.delete(`${this.baseUrl}/${evento.id}`);
    }
}
