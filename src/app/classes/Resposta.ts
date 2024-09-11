export class Resposta<T> {
    constructor (
        private _data: T|null=null,
        private _succeeded: boolean|null=null,
        private _message: string|null=null,
        private _errors: string[]|null=null
    ) {}
    public set data(value:T|null) {this._data = value};
    public get data() {return this._data;};
    public set succeeded(value:boolean|null) {this._succeeded = value};
    public get succeeded() {return this._succeeded;};
    public set message(value:string|null) {this._message = value};
    public get message() {return this._message;};
    public set errors(value:string[]|null) {this._errors = value};
    public get errors() {return this._errors;};
}