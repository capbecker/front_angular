export class FormProduto {
    constructor (
        private _nome: String|null=null,
        private _preco: Number|null=null
        //data
    ) {}
    public set nome(value:String|null) {this._nome = value};
    public get nome() {return this._nome;};
    public set preco(value:Number|null) {this._preco = value};
    public get preco() {return this._preco;};
}