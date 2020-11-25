import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/Evento';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ToastrService } from 'ngx-toastr';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})

export class EventosComponent implements OnInit {

  _filtroLista = '';
  titulo = 'Eventos';

  eventos: Evento[];
  evento: Evento;
  modoSalvar = '';
  bodyDeletarEvento = '';
  eventosFiltrados: Evento[];
  registerForm: FormGroup;

  constructor(
      private eventoService: EventoService,
      private modalService: BsModalService,
      private fb: FormBuilder,
      private localeService: BsLocaleService,
      private toastr: ToastrService
  ) {

      this.localeService.use('pt-br');
   }

  ngOnInit() {
    this.validation();
    this.getEventos();
  }

  openModal(template: any){
    template.show();
  }

  editarEvento(evento: Evento, template: any){
    this.modoSalvar = 'put';
    this.openModal(template);
    this.evento = evento;
    this.registerForm.patchValue(evento);
  }

  novoEvento(template: any){
    this.modoSalvar = 'post';
    this.openModal(template);
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

  validation() {
    this.registerForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(10000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  excluirEvento(evento: Evento, template: any) {

    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id}`;
  }

  confirmeDelete(template: any) {
    this.eventoService.deleteEvento(this.evento).subscribe(
      () => {
        template.hide();
        this.getEventos();
        this.toastr.success('Item Deletado com Sucesso');
      }, error => {
        this.toastr.error('Erro ao deletar');
      }
    );
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {

      if(this.modoSalvar === 'post'){
        this.evento = Object.assign({}, this.registerForm.value);
        this.eventoService.postEvento(this.evento).subscribe(
          (novoEvento: Evento) => {
            template.hide();
            this.getEventos();
            this.toastr.success('Item inserido com Sucesso');
          }, error => {
            this.toastr.error('Erro ao inserir ${error}');
          }
        );
      }
      else{
        this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
        this.eventoService.putEvento(this.evento).subscribe(
          () => {
            template.hide();
            this.getEventos();
            this.toastr.success('Item Editado com Sucesso');
          }, error => {
            this.toastr.error('Erro ao editar ${error}');
          }
        );
      }
    }
  }
}
