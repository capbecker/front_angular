import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Produto } from "../classes/Produto";
import { RespostaPaginada } from 'src/app/classes/RespostaPaginada';
import { Resposta } from "../classes/Resposta";
import { FiltroPaginacao } from "../classes/FiltroPaginacao";
import { Observable } from 'rxjs';
import { URL_BASE } from '../global_vars';
import { CONTENT_TYPE } from '../global_vars';
import { FormProduto } from '../classes/FormProduto';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ProdutoService {
    private _userUrl:string;

    private options = {};

    constructor(private http:  HttpClient) {
        this._userUrl=URL_BASE+'api/produto';
        this.options = {headers: new HttpHeaders().set('Content-Type', CONTENT_TYPE), responseType: 'text'};
    }

    private transformResponse(response: any): RespostaPaginada<Produto[]> {
        let data = response.data?response.data:response.content;
        let pageNumber = response.pageNumber?response.pageNumber:response.current_page;
        let first_page = response.first_page;
        let last_page = response.last_page;
        let totalPages = response.totalPages;
        let totalRecords = response.totalRecords? response.totalRecords:response.totalElements
        
        let pageable = response.pageable;
        let pageSize;
        if (pageable) {
            pageSize = pageable.pageSize;
        } else {
            pageSize = response.pageSize;
        }        
        return new RespostaPaginada<Produto[]>(
          data,
          response.current_page, 
          pageSize, 
          first_page, 
          last_page, 
          totalPages, 
          totalRecords, 
          response.next_page, 
          response.previous_page 
        );
      }

    public salvarProduto(formProduto:FormProduto) :Observable<Resposta<Produto>>{ 
        return this.http.post<Resposta<Produto>>(this._userUrl+"/salvarProduto", JSON.stringify(formProduto), this.options);
    }

    public atualizarProduto(produto:Produto) :Observable<Resposta<Produto>> {        
        return this.http.put<Resposta<Produto>>(this._userUrl+"/atualizarProduto", JSON.stringify(produto), this.options);           
    }  

    public buscarProdutos(filtroPaginacao: FiltroPaginacao) :Observable<RespostaPaginada<Produto[]>> {
        let url = this._userUrl+"/buscarProdutos";
        if (filtroPaginacao == null) {
            url+=new FiltroPaginacao().toString();
        } else {
            url+=filtroPaginacao.toString();
        }    
        return this.http.get<RespostaPaginada<Produto[]>>(url).pipe(map(response => this.transformResponse(response)));            
    }

    public getPaginado(url:string) :Observable<RespostaPaginada<Produto[]>> {        
        return this.http.get<RespostaPaginada<Produto[]>>(url);            
    }



    //public buscarProdutos() :Observable<Resposta<Produto[]>> {        
    //    return this.http.get<Resposta<Produto[]>>(this._userUrl+"/buscarProdutos");            
    //}  
    

    public excluirProduto(id_produto:Number) :Observable<String> {
        return this.http.delete(this._userUrl+"/excluirProduto/"+id_produto, {responseType: 'text'});
    }
}
