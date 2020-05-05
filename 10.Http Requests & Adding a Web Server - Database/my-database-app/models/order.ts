import CartItem from "./cart-item"


const moment = require('moment');
export default class Order{

    items:Array<CartItem>
    totals:number
    time:Date
    id:string

    get readableDate() {
        return moment(this.time).format('MMMM Do YYYY, hh:mm');
    }

    constructor(id:string,items:Array<CartItem>,totals:number,time:Date,){
        this.id = id;
        this.items = items;
        this.totals = totals;
        this.time = time;
    }



}