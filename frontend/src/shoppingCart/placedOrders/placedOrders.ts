
export const placedOrders = async (body: HTMLBodyElement) => {
    const res = await fetch(`http://localhost:5500/cart/placedOrders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ email: localStorage.getItem('login') })
    });
    const json = await res.text();
    const object = await JSON.parse(json);
    console.log(object.date.length);
    if (localStorage.getItem('login') === null || object.date[0] === 'null') {
        body.replaceWith('PLEASE ORDER SOMETHING')
    }
    var count = 0;
    var total = 0;
    var checkDate = object.date[0];
    const table = document.querySelector('.myTable') as HTMLTableElement;
    for (var item of object.date) {
        const cartImageList = document.createElement('td');
        const cartTitleList = document.createElement('td');
        const cartPriceList = document.createElement('td');
        const cartQuantityList = document.createElement('td');
        const row = document.createElement('tr');

        const divForDate = document.createElement('div');
        const divForPrice = document.createElement('div');
        const divForaddress = document.createElement('div');

        const cartImageListText = document.createElement('span');
        const cartTitleListText = document.createElement('span');
        const cartPriceListText = document.createElement('span');
        const cartQuantityListText = document.createElement('span');

        const img = document.createElement('img');
        img.src=`${object.image[count]}`;
        img.style.width='25%';
        img.style.height='20%';

        cartImageListText.appendChild(img);
        cartImageList.appendChild(cartImageListText);

        cartTitleListText.textContent = `${object.title[count]}`;
        cartTitleList.appendChild(cartTitleListText);

        cartPriceListText.textContent = object.price[count].slice(6);
        cartPriceList.appendChild(cartPriceListText);

        cartQuantityListText.textContent = `${object.quantity[count]}`;
        cartQuantityList.appendChild(cartQuantityListText);

        row.appendChild(cartImageList);
        row.appendChild(cartTitleList);
        row.appendChild(cartPriceList);
        row.appendChild(cartQuantityList);
        row.style.backgroundColor = 'whitesmoke';

        if (checkDate === object.date[count]) {
            divForDate.innerHTML = '';
            divForPrice.innerHTML = '';
            divForaddress.innerHTML = '';
            var matches = object.price[count].match(/(\d+)/);
            if (matches) {
                var price = '';
                price = matches[0];
                total += parseInt(object.quantity[count]) * parseInt(price);
            }
        }
        else {
            setDivContent(divForDate, `Date: ${object.date[count - 1].slice(0, 16)}`);
            setDivContent(divForPrice, `Total bill: ${total}$`);
            setDivContent(divForaddress, `Address: ${object.address[count - 1]}`);

            checkDate = object.date[count];
            var matches = object.price[count].match(/(\d+)/);
            if (matches) {
                var price = '';
                price = matches[0];
                total = parseInt(object.quantity[count]) * parseInt(price);
            }
        }
        table.appendChild(divForDate);
        table.appendChild(divForPrice);
        table.appendChild(divForaddress);
        table.appendChild(row);
        count++;

    } if (object.date[object.date.length - 1] !== undefined) {
        const latestDeliveredDate = document.createElement('div');
        const latestDeliveryBill = document.createElement('div');
        const latestDeliveryAddress = document.createElement('div');
        table.appendChild(setDivContent(latestDeliveredDate, `Date: ${object.date[object.date.length - 1].slice(0, 16)}`));
        table.appendChild(setDivContent(latestDeliveryBill, `Total bill: ${total}$`));
        table.appendChild(setDivContent(latestDeliveryAddress, `Address: ${object.address[object.address.length - 1]}`));
    }

}

const setDivContent = (div: HTMLDivElement, text: string) => {
    div.innerHTML = text;
    div.style.color = 'green';
    // div.style.backgroundColor='paleturquoise'
    return div;
}


