export interface Category {
    id: number,
    name: string,
    subCategories: subCategories[]
}

export interface subCategories {
    sub_id: number,
    category_id: number,
    sub_name: string,
    sub_descr: string,
    sub_tag: string
}