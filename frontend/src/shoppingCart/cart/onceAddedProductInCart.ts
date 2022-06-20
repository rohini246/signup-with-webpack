export const onceAddedProductInCart = (out: HTMLDivElement) => {
    const addBtn = out.querySelectorAll('.add-btn');
    const subBtn = out.querySelectorAll('.subtract-btn');
    for (let btn of addBtn) {
        const title = btn.parentElement?.querySelector('.title')?.textContent;
        const price = btn.parentElement?.querySelector('.price')?.textContent;
        const image = btn.parentElement?.querySelector('.image');

        const quantityText = btn.querySelector('.quantity') as HTMLDivElement;
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const quantity = await callApiToGetQuantity(btn, title!, price!, image?.getAttribute('src'));
            if (quantity.quantity != null) {
                quantityText.innerHTML = (parseInt(quantity.quantity) + 1).toString();
                callUpdateCartQuantityApi(title!, price!, quantity.quantity, image)

            }
        })

    }
    for (let btn of subBtn) {
        const title = btn.parentElement?.querySelector('.title')?.textContent;
        const price = btn.parentElement?.querySelector('.price')?.textContent;
        const image = btn.parentElement?.querySelector('.image');
        const quantityText = btn.querySelector('.quantity') as HTMLDivElement;
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const quantity = await callApiToGetQuantity(btn, title!, price!, image?.getAttribute('src'));
            if (quantity.quantity != null && parseInt(quantity.quantity) > 1) {
                quantityText.innerHTML = (parseInt(quantity.quantity) - 1).toString();
                callUpdateCartQuantityApi(title!, price!, quantityText.innerHTML, image);
            }
            else {
                callApiRemove(title!, price!, quantityText.innerHTML, image);
            }
        })

    }
}

const callApiToGetQuantity = async (btn: Element, title: string, price: string, image: any) => {
    const res = await fetch(`http://localhost:5500/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ title: title?.trim(), price: price, email: localStorage.getItem('login'), image: image })
    });
    const json = await res.text()
    const object = await JSON.parse(json);
    return object;

}

const callUpdateCartQuantityApi = async (title: string, price: string, quantity: string, image: any) => {
    const res = await fetch(`http://localhost:5500/cart/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            title: title,
            price: price,
            quantity: quantity,
            email: localStorage.getItem('login'),
            image: image
        })
    });
    const json = await res.text()
    const object = await JSON.parse(json);
    console.log(object);
}

const callApiRemove = async (title: string, price: string, quantity: string, image: any) => {
    const res = await fetch(`http://localhost:5500/cart/remove`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            title: title,
            price: price,
            quantity: quantity,
            email: localStorage.getItem('login')
        })
    });
    const json = await res.text()
    const object = await JSON.parse(json);
    console.log(object.message);
    // window.location.href = './shoppingApp.html'

}