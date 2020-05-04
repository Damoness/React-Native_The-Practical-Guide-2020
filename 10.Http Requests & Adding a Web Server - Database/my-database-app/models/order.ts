import CartItem from "./cart-item"

export default class Order{

    items:Array<CartItem>
    totals:number
    time:string
    id:string

    constructor(id:string,items:Array<CartItem>,totals:number,time:string,){
        this.id = id;
        this.items = items;
        this.totals = totals;
        this.time = time;
    }

}