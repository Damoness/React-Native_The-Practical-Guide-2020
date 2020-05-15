export default class Product{

    id:string
    userId:string
    title:string
    description:string
    imageUrl:string
    price:number

    constructor(id:string,userId:string,title:string,imageUrl:string,description:string,price:number){

        this.id=id,
        this.userId=userId,
        this.imageUrl = imageUrl;
        this.title = title;
        this.description = description;
        this.price = price;
    }

}