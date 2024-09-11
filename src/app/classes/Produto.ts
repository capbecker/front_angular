export class Produto {
    constructor (
        private _id:Number,
        private _nome: String|null=null,
        private _preco: Number|null=null,
        private _validade: Date|null=null
        //data
    ) {}
    public set id(value:Number) {this._id = value};
    public get id() {return this._id;};
    public set nome(value:String|null) {this._nome = value};
    public get nome() {return this._nome;};
    public set preco(value:Number|null) {this._preco = value};
    public get preco() {return this._preco;};
    public set validade(value:Date|null) {this._validade = value};
    public get validade() {return this._validade;};
}