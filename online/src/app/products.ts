export interface Product {
    id: number;
    name: string;
    category: string;
    image : string
    price: number;
    description: string;
}

export interface ProductViewModel{
    id: number;
    name: string;
    category: string;
    price: number;
}


export const products = [
    {
        id: 0,
        name: "Notebook Basic 15",
        category: "Laptops",
        image: "assets/images/mac.jpg",
        price: 956,
        description: "Notebook Basic 15 with 2,80 GHz quad core, 15\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro"
    },
    {
        id: 2,
        name: 'Phone Mini',
        image: "assets/images/mac.jpg",
        category: "phones",
        price: 699,
        description: 'A great phone with one of the best cameras'
    },
    {
        id: 3,
        name: 'Phone Standard',
        image: "",
        category: "phones",
        price: 299,
        description: 'the coolest one'
    },
    {
        id: 0,
        name: "Notebook Basic 15",
        category: "Laptops",
        image: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1000.jpg",
        price: 956,
        description: "Notebook Basic 15 with 2,80 GHz quad core, 15\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro"
    },
    {
        id: 2,
        name: 'Phone Mini',
        image: "",
        category: "phones",
        price: 699,
        description: 'A great phone with one of the best cameras'
    },
    {
        id: 3,
        name: 'Phone Standard',
        image: "",
        category: "phones",
        price: 299,
        description: 'the coolest one'
    }
];
