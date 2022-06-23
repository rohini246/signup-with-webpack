export interface Iproducts {
    image: string,
    category: string,
    sub_category: string,
    target_group: string,
    size: [],
    color: [],
    title: string,
    description: string,
    price: string,
    available_units: string
}

export interface Icart {
    email: string,
    title: string,
    price: string,
    image: any
}

export interface Iproduct {
    title: string,
    price: string,
    email: string,
    quantity: string,
    date: string,
    address: string,
    image: any
}

