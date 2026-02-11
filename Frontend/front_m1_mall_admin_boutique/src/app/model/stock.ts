export interface Stock{
    _id: string;
    product: {
    _id: string;
    designation: string;
    };
    quantity:number;
    stockMin:number;
}