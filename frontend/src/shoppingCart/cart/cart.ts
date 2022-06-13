const totalElm = document.querySelector('.total') as HTMLInputElement;
const heading = document.querySelector('.heading') as HTMLHeadingElement;
const table = document.querySelector('.myTable') as HTMLTableElement;
const checkout = document.querySelector('.checkout') as HTMLTableElement;
export const addCartItem = async(body:HTMLBodyElement)=>{
    if(localStorage.getItem('login')===null){
        body.replaceWith('PLEASE LOGIN');
    }
    const res = await fetch(`http://localhost:5500/cart/items`,{
              method: 'POST',
              headers: {
             'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({email:localStorage.getItem('login')})
    });
    const json = await res.text()
    const object = await JSON.parse(json);
    console.log(object);
    if(object.price.length===0){
          body.replaceWith('PLEASE ADD ITEMS TO CART')
    }
    console.log(object.price,object.title);
    var count=0;
    var total = 0;
    for(var item of object.title){
    const cartTitleList = document.createElement('td');
    const cartPriceList = document.createElement('td');
    const cartQuantityList = document.createElement('td');
    const row = document.createElement('tr');
   
    const cartTitleListText = document.createElement('span');
    const cartPriceListText = document.createElement('span');
    const cartQuantityListText = document.createElement('span');
    const cartRemoveBtn =  document.createElement('button');
    const cartAddBtn = document.createElement('button');
    const cartDeleteBtn = document.createElement('button');

    cartTitleListText.textContent = `${object.title[count]}`;
    cartTitleList.appendChild(cartTitleListText);
    console.log(typeof object.price[count])
    cartPriceListText.textContent = `${object.price[count]}`;
    cartPriceList.appendChild(cartPriceListText);

    cartAddBtn.textContent = `+`;
    cartQuantityList.appendChild(cartAddBtn);

    cartQuantityListText.textContent = `${object.quantity[count]}`;
    cartQuantityList.appendChild(cartQuantityListText);

    cartDeleteBtn.textContent = `-`;
    cartQuantityList.appendChild(cartDeleteBtn);

    cartRemoveBtn.textContent = `REMOVE`;
    cartQuantityList.appendChild(cartRemoveBtn);

    row.appendChild(cartTitleList);
    row.appendChild(cartPriceList);
    row.appendChild(cartQuantityList);

    table.appendChild(row)

    callCartAddBtn(cartAddBtn,cartTitleListText,cartPriceListText,cartQuantityListText);
    callCartDeleteBTn(cartDeleteBtn,cartTitleListText,cartPriceListText,cartQuantityListText,row,table);

    cartRemoveBtn.addEventListener('click', () => {
        table.removeChild(row);
        callApiRemove(cartTitleListText,cartPriceListText,cartQuantityListText);
    });
    var matches = object.price[count].match(/(\d+)/);
    if(matches){
        var price ='';
        price=matches[0];
        total += parseInt(object.quantity[count])*parseInt(price);
    }
    console.log("grandTotal",total);
    totalElm.value = total.toString();
    count = count+1;
}   
}

const callCartAddBtn = (cartAddBtn:HTMLButtonElement,cartTitleListText:HTMLSpanElement,cartPriceListText:HTMLSpanElement,cartQuantityListText:HTMLSpanElement)=>{
    cartAddBtn.addEventListener('click',()=>{
        var data = cartQuantityListText.textContent;
        if(data!=null){
            cartQuantityListText.textContent = (parseInt(data)+1).toString();
            callUpdateCartQuantityApi(cartTitleListText,cartPriceListText,cartQuantityListText);
        }
    });
}

const callCartDeleteBTn = (cartDeleteBtn:HTMLButtonElement,cartTitleListText:HTMLSpanElement,cartPriceListText:HTMLSpanElement,cartQuantityListText:HTMLSpanElement,row:HTMLTableRowElement,table:HTMLTableElement)=>{
    cartDeleteBtn.addEventListener('click',()=>{
        var data = cartQuantityListText.textContent;
        if(data!=null && parseInt(data)>1){
            cartQuantityListText.textContent = (parseInt(data)-1).toString();
            callUpdateCartQuantityApi(cartTitleListText,cartPriceListText,cartQuantityListText);
        }
       else{
           table.removeChild(row);
           callApiRemove(cartTitleListText,cartPriceListText,cartQuantityListText);          
       }
    })

}

const callApiRemove = async(cartTitleListText:HTMLSpanElement,cartPriceListText:HTMLSpanElement,cartQuantityListText:HTMLSpanElement)=>{
    console.log(cartTitleListText.textContent);
    const res = await fetch(`http://localhost:5500/cart/remove`,{
              method: 'POST',
              headers: {
             'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({title:cartTitleListText.textContent,
                              price:cartPriceListText.textContent,
                              quantity:cartQuantityListText.textContent,
                              email:localStorage.getItem('login')
        })
    });
    const json = await res.text()
    const object = await JSON.parse(json);
    console.log(object.message);
    window.location.href='./cart.html'

}

const callUpdateCartQuantityApi = async(cartTitleListText:HTMLSpanElement,cartPriceListText:HTMLSpanElement,cartQuantityListText:HTMLSpanElement)=>{
    console.log(cartTitleListText.textContent);
    const res = await fetch(`http://localhost:5500/cart/update`,{
              method: 'POST',
              headers: {
             'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({title:cartTitleListText.textContent,
                              price:cartPriceListText.textContent,
                              quantity:cartQuantityListText.textContent,
                              email:localStorage.getItem('login')
        })
    });
    const json = await res.text()
    const object = await JSON.parse(json);
    console.log(object.message);
    window.location.href='./cart.html'

}

