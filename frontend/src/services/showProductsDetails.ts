export const showProductsDetails = (out:HTMLParagraphElement,product:any)=>{
    console.log(product[0],"product")
    const viewProductDetailsBtn = out.getElementsByTagName('div');
    for(var btn of viewProductDetailsBtn){
        const title = (btn.parentElement?.querySelector('.title')?.textContent)?.toLowerCase();
        const price = (btn.parentElement?.querySelector('.price')?.textContent)?.toLowerCase();
        btnOfviewProductDetailsBtns(btn,title!,price!,product);     
    }
}

const btnOfviewProductDetailsBtns = (btn:HTMLDivElement,title:string,price:string,product:any)=>{
    console.log(title, price);
    btn.addEventListener('click',async(e)=>{
        e.preventDefault();
        for(let data of product){
            if((data.title).toLowerCase()===title && (data.price).toLowerCase()===price){
                console.log("match");
            }
        }

        if(localStorage.getItem('title')){
            window.location.href='./productDetails.html'; 
            return;
        }
        localStorage.setItem('title',title);
        localStorage.setItem('price',price)
        console.log(title,price,"title");
    })

}

