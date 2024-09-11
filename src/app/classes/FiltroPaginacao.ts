export class FiltroPaginacao{
    constructor (
        private _pageNumber: number|undefined=1,
        private _pageSize: number|undefined=10
    ) {
    }
    public set pageNumber(value:number|undefined) {this._pageNumber = value};
    public get pageNumber() {return this._pageNumber;};
    public set pageSize(value:number|undefined) {this._pageSize = value};
    public get pageSize() {return this._pageSize;};
    public toString() {return "?pageNumber="+this._pageNumber+"&pageSize="+this._pageSize}
}