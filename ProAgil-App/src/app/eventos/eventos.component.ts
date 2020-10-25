import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  _filtroLista: string;

  get filtroLista(): string{
      return this._filtroLista;
  }
  set filtroLista(value: string){
      this._filtroLista = value;
      this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  eventos: any = [];
  eventosFiltrados: any = [];


  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.getEventos();
  }

  filtrarEventos(filtrarPor: string): any{
    filtrarPor = filtrarPor.toLocaleLowerCase();

    return this.eventos.filter(
       evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  getEventos(){
    this.http.get('https://localhost:5001/Home').subscribe(
        response => {
          this.eventos = response;
        }, error => {
            console.log(error);
        }
    );
  }
}
