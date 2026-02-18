export interface Commande{
    _id:string;
    referencecommande:string;
     product: {
    _id: string;
    designation: string;
    reference: string;
    };
    typelivraison:string;
    quantity:number;
    pricetotal:number;
    shop:{
        _id:string;
        nom:string;
    };
    user:{
        _id:string;
        nom:string;
    };
}