import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Produto } from 'src/app/classes/Produto';
import { RespostaPaginada } from 'src/app/classes/RespostaPaginada';
//import { Resposta } from 'src/app/classes/Resposta';
import { FormProduto } from 'src/app/classes/FormProduto';
import { ProdutoService } from 'src/app/service/ProdutoService';
import { FormControl, FormGroup } from '@angular/forms';
import { FiltroPaginacao } from 'src/app/classes/FiltroPaginacao';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {

  filtroPaginacao: FiltroPaginacao = new FiltroPaginacao();
  totalPaginas: number|null = 0;
  totalRegistros: number|null = 0;
  proximaPagina: string|null = "";
  anteriorPagina: string|null = "";
  primeiraPagina: string|null = "";
  ultimaPagina: string|null = "";

  listProduto: Produto[] = [];

  baseProduto: Produto = new Produto(0);
  //modalRef?: BsModalRef;
  modalVisivel: boolean = false;
  tipoAcao: String = "";
  formulario = new FormGroup ({
    nome: new FormControl(),
    preco: new FormControl(),
    validade: new FormControl()
  });

  constructor(private produtoService: ProdutoService) {}

  excluirProduto(id_produto:Number) {
    this.produtoService.excluirProduto(id_produto).subscribe
    ({
      next: () => {this.recarregaListagem();},
      error: (error: HttpErrorResponse) => 
      {
        console.log(error.message);
        alert("Erro ao remover");
        this.recarregaListagem();
      }
    });
    
  }

  recarregaListagem(pageNumber?: number) {    
    if (pageNumber!=undefined && pageNumber != null) 
      this.filtroPaginacao.pageNumber = pageNumber;
    this.produtoService.buscarProdutos(this.filtroPaginacao).subscribe
    ({
      next: (response: RespostaPaginada<Produto[]>) => 
        {
          this.listProduto = response.data==null?[]:response.data;
          this.filtroPaginacao = new FiltroPaginacao(response.pageNumber, response.pageSize);
          this.totalPaginas = response.totalPages;
          this.totalRegistros = response.totalRecords;
          this.proximaPagina = response.nextPage;
          this.anteriorPagina = response.previousPage;
          this.primeiraPagina = response.firstPage;
          this.ultimaPagina =  response.lastPage;
        },
      error: (error: HttpErrorResponse) => 
        {alert(error.message);}
    });
    this.modalVisivel = false;
  }
  
  carregaUrl(url: string|null) {
    if (url == null) {
      return;
    }
    this.produtoService.getPaginado(url).subscribe
    ({
      next: (response: RespostaPaginada<Produto[]>) => 
        {
          this.listProduto = response.data==null?[]:response.data;
          this.filtroPaginacao = new FiltroPaginacao(response.pageNumber, response.pageSize);
          this.totalPaginas = response.totalPages;
          this.totalRegistros = response.totalRecords;
          this.proximaPagina = response.nextPage;
          this.anteriorPagina = response.previousPage;
          this.primeiraPagina = response.firstPage;
          this.ultimaPagina =  response.lastPage;
        },
      error: (error: HttpErrorResponse) => 
        {alert(error.message);}
    });
    this.modalVisivel = false;
  }
  onOpenModal(produto : Produto|null) {    
    this.modalVisivel = false;
    if (produto == null) {
      this.baseProduto = new Produto(0);
      this.tipoAcao = "Inclusão";
    } else {
      this.baseProduto = produto;
      this.tipoAcao = "Alteração";
    }
    this.formulario.setValue(
      {
        nome:this.baseProduto.nome,
        preco:this.baseProduto.preco,
        validade:this.baseProduto.validade
      });
    this.modalVisivel = true;
  }

  acao() {    
    if (this.tipoAcao=="Inclusão") {
      let produtoNovo = this.formulario.value as FormProduto;
      this.produtoService.salvarProduto(produtoNovo).subscribe
      ({
        next: () => {
          alert("Inserido com sucesso");
          this.recarregaListagem();
        },
        error: (error: HttpErrorResponse) => 
        {
          console.log(error.message);
          alert("Erro ao salvar");
          this.recarregaListagem();
        }
      });
    } else {
      let produtoAtualizado = this.formulario.value as Produto;
      produtoAtualizado.id = this.baseProduto.id;
      this.produtoService.atualizarProduto(produtoAtualizado).subscribe
      ({
        next: () => {
          alert("Alterado com sucesso")
          this.recarregaListagem();
        },
        error: (error: HttpErrorResponse) => 
        {
          console.log(error.message);
          alert("Erro ao salvar");
          this.recarregaListagem();
        }
      });
    }    
  }
  
  ngOnInit(): void {
    this.recarregaListagem();
  }
}
