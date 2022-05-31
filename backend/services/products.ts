import { Request } from "express";

interface Iproducts{
    image: string,
     category:string,
     sub_category:string,
     target_group:string,
     size:[],
     color:[],
     title: string,
     description: string,
     price: string,
     available_units:string

}
export const productsService = async(req:Request)=>{
    const filter:string = req.body.filter;
    const color:string = req.body.color;
    const size:string= req.body.size;
    const products:Iproducts[] = require('./product.json');
    var data:Iproducts[]=[]; 
    switch(filter){
        case "womens":{
            data = findFilteredProducts("Womens",products);           
           break;
        }
        case "mens":{
            data = findFilteredProducts("Mens",products);
            break;
        }
        case "kids":{
            data = findFilteredProducts("Kids",products);
            break;
        }
        default: data=products;
    } 
    var colorData:Iproducts[]=[];
    var sizeData:Iproducts[]=[];
    if(color!==null && size===null){
        colorData =  findFilteredProductsOnColor(products,color);
        return data.filter(x => colorData.indexOf(x) !== -1);
    }
    else if(color!==null && size!==null){
        colorData =  findFilteredProductsOnColor(products,color);
        sizeData = findFilteredProductsOnSize(products,size);
        return ((colorData.filter(x=>sizeData.indexOf(x))).filter(y=>data.indexOf(y) !== -1));

    } 
    else if(color===null && size!==null ){
        sizeData = findFilteredProductsOnSize(products,size);
        return (data.filter(x => sizeData.indexOf(x) !== -1)) 
    }
    else{
        return data;
    }
}

const findFilteredProducts = (filter:string,products:Iproducts[])=>{
    var filteredProducts:Iproducts[] = [];
    for(var product of products){
        if(product.title.includes(filter)){
            filteredProducts.push(product);
        }
    }
    return filteredProducts;
}

const findFilteredProductsOnColor = (products:Iproducts[],filter:string)=>{
    var filteredProducts:Iproducts[] = [];
    var setOfColors = new Set();
    var check:number=0;
    for(var product of products){
       const colorArray:string[] = product.color;
       var length:number = colorArray.length;
       while(length--){
           setOfColors.add(colorArray[length]);
        if(colorArray[length]===filter){
            check = 1;
            break;
        }
        else{
            check = 0;
            continue;
        }
     }
     if(check===1){
         filteredProducts.push(product);
     }
    }
    return filteredProducts;

}

const findFilteredProductsOnSize = (products:Iproducts[],filter:string)=>{
    var filteredProducts:Iproducts[] = [];
    var check:number=0;
    for(var product of products){
        const sizeArray:string[]  = product.size;
        var length:number = sizeArray.length;
        while(length--){
            if(sizeArray[length]===filter){
                check = 1;
                break;
            }
            else{
                check = 0;
                continue;
            }
         }
         if(check===1){
             filteredProducts.push(product);
         }
    }
    return filteredProducts;
}


export const productDetailsService = async(req:Request)=>{
    const products:Iproducts[] = require('./product.json');
    var title:string = req.body.title;
    var price:string = req.body.price;
    var message:string ='';
    var status:number=0;
    if(title===null && price===null){
        message="unsuccessful";
        status=402;
    }
    var image:string = '';
    var description:string = '';
    var targetGroup:string ='';
    // console.log(products[0].title.toLowerCase(),title.toLowerCase());
    for(var product of products){
        var productTitle = product.title.toLowerCase();
        var filterTitle = title.toLowerCase();
        if(productTitle===filterTitle){
            image = product.image;
            description=product.description;
            targetGroup=product.target_group;
            message="success";
            status=200;
        
        }
    }
    //console.log(description);
    // console.log(image,description,targetGroup);
    return {title,price,image,description,targetGroup,message,status};
}