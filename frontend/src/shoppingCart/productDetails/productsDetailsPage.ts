export const callApiToGetProductDetails = async()=>{
    const response = await fetch(`http://localhost:5500/products/details`,{
        method: 'POST',
        headers: {
       'Content-Type': 'application/json;charset=utf-8'
  }
  ,
  body: JSON.stringify({title:localStorage.getItem('title'),price:localStorage.getItem('price')})
});
const json = await response.text();
const obj = await JSON.parse(json);
console.log(obj.description);
console.log(obj.message);
return obj;
}

export const detailsPage = async(body:HTMLBodyElement)=>{
    const data =await callApiToGetProductDetails();
    if(data.description!=null){
        localStorage.removeItem('title');
        localStorage.removeItem('price');
    }
    const details = body.querySelector('.product_details') as HTMLParagraphElement;
    let output="";
    output +=`<div class="product" name="product">
    <img src="${data.image}" width='50%' height="20%" alt="${data.description}">
    <p class="title">${data.title}</p>
    <p class="description">${data.description}</p>
    <p class="price">
       <span>price ${data.price}</span>
    </p><br><br>
 </div>`
    details.innerHTML = output;
}