
export const placedOrders = async(body:HTMLBodyElement)=>{
    const res = await fetch(`http://localhost:5500/cart/placedOrders`,{
              method: 'POST',
              headers: {
             'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({email:localStorage.getItem('login')})
    });
    const json = await res.text();
    const object = await JSON.parse(json);
    console.log(object.date.length);
    if(localStorage.getItem('login')===null || object.date[0]==='null'){
        body.replaceWith('PLEASE ORDER SOMETHING')
    }
    var count=0;
    var c =1;
    var total = 0;
    var checkDate = object.date[0];
    console.log(checkDate);
    const table = document.querySelector('.myTable') as HTMLTableElement;   
    for(var item of object.date){    
    const cartTitleList = document.createElement('td');
    const cartPriceList = document.createElement('td');
    const cartQuantityList = document.createElement('td');
    const cartDateList = document.createElement('td');
    const row = document.createElement('tr');
    const div = document.createElement('div');
   
    const cartTitleListText = document.createElement('span');
    const cartPriceListText = document.createElement('span');
    const cartQuantityListText = document.createElement('span');
    const cartDateListText = document.createElement('span');

    cartTitleListText.textContent = `${object.title[count]}`;
    cartTitleList.appendChild(cartTitleListText);
    
    cartPriceListText.textContent = `${object.price[count]}`;
    cartPriceList.appendChild(cartPriceListText);

    cartDateListText.textContent = `${object.date[count].slice(0,16)}`;
    cartDateList.appendChild(cartDateListText);

    cartQuantityListText.textContent = `${object.quantity[count]}`;
    cartQuantityList.appendChild(cartQuantityListText);

    row.appendChild(cartTitleList);
    row.appendChild(cartPriceList);
    row.appendChild(cartQuantityList);
    row.appendChild(cartDateList);
    
    if(checkDate===object.date[count]){
        div.innerHTML=''; 
        var matches = object.price[count].match(/(\d+)/);
        if(matches){
            var price ='';
            price=matches[0];
            total += parseInt(object.quantity[count])*parseInt(price);
        }  
    }
    else{
        setDivContent(div,`Date: ${object.date[count-1].slice(0,16)}\n and Paid Bill = $${total}`)
        checkDate = object.date[count];
        var matches = object.price[count].match(/(\d+)/);
        if(matches){
            var price ='';
            price=matches[0];
            total = parseInt(object.quantity[count])*parseInt(price);
        } 
    }
    table.appendChild(div);
    table.appendChild(row);
    count++;

}   if(object.date[object.date.length-1]!==undefined){
    const latestDeliveredDate = document.createElement('div');
    table.appendChild(setDivContent(latestDeliveredDate,`Date: ${object.date[object.date.length-1].slice(0,16)} and Paid Bill = $${total}`));
}

}

const setDivContent = (div:HTMLDivElement,text:string)=>{
    div.innerHTML = text;
    div.style.color='green';
    div.style.backgroundColor='paleturquoise'
    return div;
}


