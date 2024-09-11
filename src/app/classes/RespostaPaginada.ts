import { Resposta } from "./Resposta";
//Objeto destinado para receber a paginacao vinda do backend (alternativa no caso de uma demanada alta)
export class RespostaPaginada<T> extends Resposta<T>{
    constructor (
        private _pageNumber: number|undefined=1,
        private _pageSize: number|undefined=10,
        private _firstPage: string|null=null,
        private _lastPage: string|null=null,
        private _totalPages: number|null=null,
        private _totalRecords: number|null=null,
        private _nextPage: string|null=null,
        private _previousPage: string|null=null
    ) {
        super();
    }
    public set pageNumber(value:number|undefined) {this._pageNumber = value};
    public get pageNumber() {return this._pageNumber;};
    public set pageSize(value:number|undefined) {this._pageSize = value};
    public get pageSize() {return this._pageSize;};
    public set firstPage(value:string|null) {this._firstPage = value};
    public get firstPage() {return this._firstPage;};
    public set lastPage(value:string|null) {this._lastPage = value};
    public get lastPage() {return this._lastPage;};
    public set totalPages(value:number|null) {this._totalPages = value};
    public get totalPages() {return this._totalPages;};
    public set totalRecords(value:number|null) {this._totalRecords = value};
    public get totalRecords() {return this._totalRecords;};
    public set nextPage(value:string|null) {this._nextPage = value};
    public get nextPage() {return this._nextPage;};
    public set previousPage(value:string|null) {this._previousPage = value};
    public get previousPage() {return this._previousPage;};
}
