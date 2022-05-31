export const addToCart =(out:HTMLParagraphElement)=>{
    addItemsToCartAddedBeforeLogin();
    const addToCartBtn = out.getElementsByTagName('button');
    for(var btn of addToCartBtn){
        const title = btn.parentElement?.querySelector('.title')?.textContent;
        const price = btn.parentElement?.querySelector('.price')?.textContent;
        btnOfAddToCartBtns(btn,title!,price!);     
    }
}

const addItemsToCartAddedBeforeLogin =async()=>{
    if(localStorage.getItem('title') && localStorage.getItem('price') && localStorage.getItem('login')){
        const res = await fetch(`http://localhost:5500/cart`,{
            method: 'POST',
            headers: {
           'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({title:localStorage.getItem('title'),price:localStorage.getItem('price'),email:localStorage.getItem('login')})
    });
    const json = await res.text()
    const object = await JSON.parse(json);
    if(object.status===200){
        localStorage.removeItem('title');
        localStorage.removeItem('price');
    }

    }
}

const btnOfAddToCartBtns = (btn:HTMLButtonElement,title:string,price:string)=>{
    btn.addEventListener('click',async(e)=>{
        e.preventDefault();
        if(localStorage.getItem('login')===null){
            if(title !=null && price!=null){
                localStorage.setItem("title",title);
                localStorage.setItem("price",price);
            }
            window.location.href='./login.html';    
        }
        callAddToCartApi(localStorage.getItem('login')!,title!,price!);
    })
}

const callAddToCartApi = async(email:string,title:string,price:string)=>{
    const res = await fetch(`http://localhost:5500/cart`,{
        method: 'POST',
        headers: {
       'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({title:title?.trim(),price:price,email:localStorage.getItem('login')})
});
const json = await res.text()
const object = await JSON.parse(json);
if(object.status===402){ 
  window.location.href='./login.html';
}
}
