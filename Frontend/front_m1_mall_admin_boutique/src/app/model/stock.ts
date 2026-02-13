export interface Stock{
    _id: string;
    product: {
    _id: string;
    designation: string;
    reference: string;
    };
    quantity:number;
    stockMin:number;
    shop:string;
}