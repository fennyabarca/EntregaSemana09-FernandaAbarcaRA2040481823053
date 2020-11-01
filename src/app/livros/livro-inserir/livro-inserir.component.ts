import { Component, EventEmitter, Output } from '@angular/core';
// import { Livro } from '../livro.model';
import { NgForm } from '@angular/forms';

import { LivroService } from '../livro.service';

@Component({
selector: 'app-livro-inserir',
templateUrl: './livro-inserir.component.html',
styleUrls: ['./livro-inserir.component.css'],
})

export class LivroInserirComponent {
  constructor(public livroService: LivroService) {};

    incrementa = 0;

  onAdicionarLivro(form: NgForm) {
    if(form.invalid) {
      return;
    }


    this.livroService.adicionarLivro(

      form.value.titulo,
      form.value.autor,
      form.value.header
    )
    form.resetForm()

  }
}
