import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EventoService } from '../services/evento.service';
import { Evento } from '../_models/Evento';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  _filtroLista = '';

  eventos: Evento[];
  eventosFiltrados: Evento[];
  modalRef: BsModalRef;
  registerForm: FormGroup;

  constructor(
      private eventoService: EventoService,
      private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getEventos();
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  get filtroLista(): string{
      return this._filtroLista;
  }
  set filtroLista(value: string){
      this._filtroLista = value;
      this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  filtrarEventos(filtrarPor: string): Evento[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();

    return this.eventos.filter(
       evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  getEventos(){
    this.eventoService.getAllEvento().subscribe(
        (_eventos: Evento[]) => {
          this.eventos = _eventos;
          this.eventosFiltrados = this.eventos;
          console.log(_eventos);
        }, error => {
            console.log(error);
        }
    );
  }

  validation(){
    this.registerForm = new FormGroup({
      tema: new FormControl,
      local: new FormControl,
      dataEvento: new FormControl,
      qtdPessoas: new FormControl,
      imagemURL: new FormControl,
      telefone: new FormControl,
      email: new FormControl,
    });
  }

  salvarAlteracao(){

  }
}
