import { Iproducts } from "../models/cart";
export const productsService = async(filter:string,color:string,size:string)=>{
    const products:Iproducts[] = require('./product.json');
    let data:Iproducts[]=[]; 
    let output:Iproducts[]=[];
    if(filter!==null){
        data = findFilteredProducts(filter.toLowerCase(),products); 
        let colorData:Iproducts[]=[];
        let sizeData:Iproducts[]=[];
        if(color!==null && size===null){
            colorData =  findFilteredProductsOnColor(products,color);
            output= data.filter(x => colorData.indexOf(x) !== -1);
        }
        else if(color!==null && size!==null){
            colorData =  findFilteredProductsOnColor(products,color);
            sizeData = findFilteredProductsOnSize(products,size);
            output= ((colorData.filter(x=>sizeData.indexOf(x))).filter(y=>data.indexOf(y) !== -1));
    
        } 
        else if(color===null && size!==null ){
            sizeData = findFilteredProductsOnSize(products,size);
           output= (data.filter(x => sizeData.indexOf(x) !== -1)) 
        }
        else{
            output=data
        }
    }
    else{
        output = products;
    }
    return output;
}

const findFilteredProducts = (filter:string,products:Iproducts[])=>{
    let filteredProducts:Iproducts[]=[];
    if(filter==='home'){
        filteredProducts=products;
    }
    else{
       filteredProducts = products.filter(item=>item.target_group.toLowerCase()===filter)
   }
    return filteredProducts;
}

const findFilteredProductsOnColor = (products:Iproducts[],filter:string)=>{
    let filteredProducts:Iproducts[] = [];
    let setOfColors = new Set();
    let check:number=0;
    for(let product of products){
       const colorArray:string[] = product.color;
       let length:number = colorArray.length;
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
    let filteredProducts:Iproducts[] = [];
    let check:number=0;
    for(let product of products){
        const sizeArray:string[]  = product.size;
        let length:number = sizeArray.length;
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


export const productDetailsService = async(title:string,price:string)=>{
    const products:Iproducts[] = require('./product.json');
    let message:string ='';
    let status:number=0;
    if(title===null && price===null){
        message="unsuccessful";
        status=402;
    }
    let image:string = '';
    let description:string = '';
    let targetGroup:string ='';
    for(let product of products){
        let productTitle = product.title.toLowerCase();
        let filterTitle = title.toLowerCase();
        if(productTitle===filterTitle){
            image = product.image;
            description=product.description;
            targetGroup=product.target_group;
            message="success";
            status=200;
        
        }
    }
    return {title,price,image,description,targetGroup,message,status};
}
