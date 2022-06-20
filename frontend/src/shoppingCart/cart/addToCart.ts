// export const addToCart = (out: HTMLParagraphElement) => {
//     addItemsToCartAddedBeforeLogin();
//     const addToCartBtn = out.getElementsByTagName('button');


//     for (var btn of addToCartBtn) {
//         const addBtn = btn.parentElement?.querySelector('.add-btn') as HTMLDivElement;
//         const quantityText = btn.parentElement?.querySelector('.quantity') as HTMLDivElement;
//         const subBtn = btn.parentElement?.querySelector('.subtract-btn') as HTMLDivElement

//         const title = btn.parentElement?.querySelector('.title')?.textContent;
//         const price = btn.parentElement?.querySelector('.price')?.textContent;
//         const image = btn.parentElement?.querySelector('.image');
//         // console.log(image);

//         btnOfAddToCartBtns(btn, title!, price!, image?.getAttribute('src'), addBtn, quantityText, subBtn);
//     }
// }

// const addItemsToCartAddedBeforeLogin = async () => {
//     if (localStorage.getItem('title') && localStorage.getItem('price') && localStorage.getItem('login')) {
//         const res = await fetch(`http://localhost:5500/cart`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json;charset=utf-8'
//             },
//             body: JSON.stringify({ title: localStorage.getItem('title'), price: localStorage.getItem('price'), email: localStorage.getItem('login'), image: localStorage.getItem('image') })
//         });
//         const json = await res.text()
//         const object = await JSON.parse(json);
//         if (object.status === 200) {
//             localStorage.removeItem('title');
//             localStorage.removeItem('price');
//         }

//     }
// }

// const btnOfAddToCartBtns = (btn: HTMLButtonElement, title: string, price: string, image: any, addBtn: HTMLDivElement, quantityText: HTMLDivElement, subBtn: HTMLDivElement) => {
//     // alert(image);
//     btn.addEventListener('click', async (e) => {
//         e.preventDefault();

//         if (localStorage.getItem('login') === null) {
//             if (title != null && price != null && image != null) {
//                 localStorage.setItem("title", title);
//                 localStorage.setItem("price", price);
//                 localStorage.setItem("image", image);
//             }
//             window.location.href = './login.html';
//         }
//         else {
//             btn.style.display = 'none';
//             addBtn.style.display = 'block';
//             quantityText.style.display = 'block';
//             subBtn.style.display = 'block';

//             //    const data = await callAddToCartApi(btn, localStorage.getItem('login')!, title!, price!, image);
//             //     addBtn.addEventListener('click',(e)=>{
//             //         e.preventDefault();
//             //         callUpdateCartQuantityApi(title,price,data.quantity,image);

//             //     });

//             //     subBtn.addEventListener('click',(e)=>{
//             //         e.preventDefault();
//             //         callUpdateCartQuantityApi(title,price,data.quantity,image)

//             //     })

//         }
//     })
// }

// const callAddToCartApi = async (btn: HTMLButtonElement, email: string, title: string, price: string, image: any) => {
//     // const span = document.createElement('span');
//     // const addBtn = document.createElement('button');
//     // const count = document.createElement('span');
//     // const subBtn = document.createElement('button');

//     // count.style.color = 'palevioletred';
//     // addBtn.style.color = 'palevioletred';
//     // subBtn.style.color = 'palevioletred';




//     // callCartAddBtn(addBtn, title, price,quantity ,cartImageListText);
//     // callCartDeleteBTn(cartDeleteBtn, cartTitleListText, cartPriceListText, cartQuantityListText,cartImageListText,row, table);

//     const res = await fetch(`http://localhost:5500/cart`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify({ title: title?.trim(), price: price, email: localStorage.getItem('login'), image: image })
//     });
//     const json = await res.text()
//     const object = await JSON.parse(json);
//     if (object.status === 402) {
//         window.location.href = './login.html';
//     }
//     return object;

//     // if (object.status === 300) {
//     //     addBtn.innerHTML = `+`;
//     //     count.innerHTML = `${object.quantity}`;
//     //     subBtn.innerHTML = `-`;

//     //     span.appendChild(addBtn);
//     //     span.appendChild(count);
//     //     span.appendChild(subBtn);



//     //     btn.replaceWith(span);
//     //     addBtn.addEventListener('click', (e) => {
//     //         var data = object.quantity;
//     //         if (data != null) {
//     //             count.innerHTML = (parseInt(data) + 1).toString();
//     //             callUpdateCartQuantityApi(title, price, count.innerHTML, image);
//     //         }

//     //     });

//     //     subBtn.addEventListener('click', (e) => {
//     //         var data = object.quantity;
//     //         if (data != null && parseInt(data) > 1) {
//     //             count.innerHTML = (parseInt(data) - 1).toString();
//     //             callUpdateCartQuantityApi(title, price, count.innerHTML, image);
//     //         }
//     //         else {
//     //             // table.removeChild(row);
//     //             btn.replaceWith(btn);
//     //             callApiRemove(title, price, count.innerHTML, image);
//     //         }

//     //     })

//     //     // alert(object.message);
//     // }
// }

// const callUpdateCartQuantityApi = async (title: string, price: string, quantity: string, image: any) => {
//     const res = await fetch(`http://localhost:5500/cart/update`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify({
//             title: title,
//             price: price,
//             quantity: quantity,
//             email: localStorage.getItem('login'),
//             image: image
//         })
//     });
//     const json = await res.text()
//     const object = await JSON.parse(json);
//     console.log(object);
//     //  window.location.href = './shoppingApp.html'
// }

// const callApiRemove = async (title: string, price: string, quantity: string, image: any) => {
//     const res = await fetch(`http://localhost:5500/cart/remove`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify({
//             title: title,
//             price: price,
//             quantity: quantity,
//             email: localStorage.getItem('login')
//         })
//     });
//     const json = await res.text()
//     const object = await JSON.parse(json);
//     console.log(object.message);
//     // window.location.href = './shoppingApp.html'

// }

export const addToCart =(out:HTMLParagraphElement)=>{
    addItemsToCartAddedBeforeLogin();
    const addToCartBtn = out.getElementsByTagName('button');
    for(var btn of addToCartBtn){
        const title = btn.parentElement?.querySelector('.title')?.textContent;
        const price = btn.parentElement?.querySelector('.price')?.textContent;
        const image = btn.parentElement?.querySelector('.image');

        btnOfAddToCartBtns(btn,title!,price!,image?.getAttribute('src'));     
    }
}

const addItemsToCartAddedBeforeLogin =async()=>{
    if(localStorage.getItem('title') && localStorage.getItem('price') && localStorage.getItem('login')){
        const res = await fetch(`http://localhost:5500/cart`,{
            method: 'POST',
            headers: {
           'Content-Type': 'application/json;charset=utf-8'
        },
      body: JSON.stringify({title:localStorage.getItem('title'),price:localStorage.getItem('price'),email:localStorage.getItem('login'), image: localStorage.getItem('image')})
    });
    const json = await res.text()
    const object = await JSON.parse(json);
    if(object.status===200){
        localStorage.removeItem('title');
        localStorage.removeItem('price');
    }
    }
}

const btnOfAddToCartBtns = (btn:HTMLButtonElement,title:string,price:string,image:any)=>{
    btn.addEventListener('click',async(e)=>{
        e.preventDefault();
        if(localStorage.getItem('login')===null){
            if(title !=null && price!=null && image!=null){
                localStorage.setItem("title",title);
                localStorage.setItem("price",price);
                localStorage.setItem("image",image)
            }
            window.location.href='./login.html';    
        }
        callAddToCartApi(localStorage.getItem('login')!,title!,price!,image);
    })
}

const callAddToCartApi = async(email:string,title:string,price:string,image:any)=>{
    const res = await fetch(`http://localhost:5500/cart`,{
        method: 'POST',
        headers: {
       'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({title:title?.trim(),price:price,email:localStorage.getItem('login'),image:image})
});
const json = await res.text()
const object = await JSON.parse(json);
if(object.status===402){ 
  window.location.href='./login.html';
}
}