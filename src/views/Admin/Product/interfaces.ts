
export type IBodyUser = {
    email?: string;
    password?: string;
    name?: string;
    role?: string;
    avatar?: string;
    birthday?: string;
};
export type IProduct={
    id:string
    tenSP:string;
    image:string;
    moTa:string;
    gia:number;
    tenTacGia:string;
}
export type  IProductGetAll= {
    items: [];
    totalItems: number;
}