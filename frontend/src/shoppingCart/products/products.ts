import { showProductsDetails } from "../productDetails/showProductsDetails";
import { addToCart } from "../cart/addToCart";

const out = document.querySelector('.products') as HTMLParagraphElement;
export const product=()=>{
    const params:string|null= getParams();
    productService(params!,localStorage.getItem('color'),localStorage.getItem('size'));
}

const getParams = ()=>{
    const queryString:string = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const param:string|null = urlParams.get('filter');
    console.log(param);
    return param;
}

const productService=async(params:string|null,color?:string|null,size?:string|null)=>{
    const product = await productFetchApi(params,color,size)  
    let output="";
    for(let item of product){   
        output += `
        <div class="product" name="product">
           <img class="image" src="${item.image}">
           <p class="title">${item.title}</p>
           <p class="price">
              <span>price ${item.price}</span>
              </p><br><br>
           <button style="color:palevioletred;display:block;" name="addCart">Add to cart</button>
           <div>
           <div style="display:none;color:palevioletred" class="add-btn">+</div>
           <div style="display:none;color:palevioletred" class="quantity"></div>
           <div style="display:none;color:palevioletred" class="subtract-btn">-</div>
           </div>

           <br><br>
           <div style="color:palevioletred" style="cursor:pointer;" name="view" class="view-details">Details</div>
        </div>`
    }
    out.innerHTML = output; 
    addToCart(out);
    showProductsDetails(out,product);
}

const productFetchApi = async(params:string|null,color?:string|null,size?:string|null)=>{
    const response = await fetch(`http://localhost:5500/products`,{
        method: 'POST',
        headers: {
       'Content-Type': 'application/json;charset=utf-8'
  }
  ,
  body: JSON.stringify({color:color,size:size,filter:params})
});
console.log(typeof response);
    const json = await response.text();
    console.log(typeof json);
    const obj = await JSON.parse(json);
    return obj;
};
