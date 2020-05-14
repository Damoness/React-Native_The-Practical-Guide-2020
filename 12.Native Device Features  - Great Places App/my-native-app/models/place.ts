export default class Place{

    id:number
    title:string
    imageUrl:string
    address:string
    lat:number
    lng:number

    constructor(id:number,title:string,imageUrl:string,address:string,lat:number,lng:number){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.address = address;
        this.lat = lat;
        this.lng = lng
    }

}