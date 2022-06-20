export const addToCart = (out: HTMLParagraphElement) => {
    addItemsToCartAddedBeforeLogin();
    const addToCartBtn = out.getElementsByTagName('button');
    for (var btn of addToCartBtn) {
        const title = btn.parentElement?.querySelector('.title')?.textContent;
        const price = btn.parentElement?.querySelector('.price')?.textContent;
        const image = btn.parentElement?.querySelector('.image');
        const addBtn = btn.parentElement?.querySelector('.add-btn') as HTMLDivElement;
        const quantityText = btn.parentElement?.querySelector('.quantity') as HTMLDivElement;
        const subBtn = btn.parentElement?.querySelector('.subtract-btn') as HTMLDivElement;

        addBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("clicked btn")
            var data = quantityText.innerHTML;
            if (data != null) {
                quantityText.innerHTML = (parseInt(data) + 1).toString();
                callUpdateCartQuantityApi(title!, price!, quantityText, image?.getAttribute('src'), addBtn, subBtn);
            }
        });
        subBtn.addEventListener('click', (e) => {
            e.preventDefault();
            var data = quantityText.innerHTML;
            if (data != null && parseInt(data) > 1) {
                quantityText.innerHTML = (parseInt(data) - 1).toString();
                callUpdateCartQuantityApi(title!, price!, quantityText, image?.getAttribute('src'), addBtn, subBtn);
            }
            else {
                // btn.classList.add('abcd');
                // if(btn.style.display==='none'){

                // }
                console.log(btn);
                addBtn.style.display = 'none';
                quantityText.style.display = 'none';
                subBtn.style.display = 'none';
                btn.style.display = 'block';
                callApiRemove(title!, price!, quantityText, image);
            }
        })

        btnOfAddToCartBtns(btn, title!, price!, image?.getAttribute('src'), addBtn, quantityText, subBtn);
    }
}

const addItemsToCartAddedBeforeLogin = async () => {
    if (localStorage.getItem('title') && localStorage.getItem('price') && localStorage.getItem('login')) {
        const res = await fetch(`http://localhost:5500/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ title: localStorage.getItem('title'), price: localStorage.getItem('price'), email: localStorage.getItem('login'), image: localStorage.getItem('image') })
        });
        const json = await res.text()
        const object = await JSON.parse(json);
        if (object.status === 200) {
            localStorage.removeItem('title');
            localStorage.removeItem('price');
        }
    }
}

const btnOfAddToCartBtns = (btn: HTMLButtonElement, title: string, price: string, image: any, addBtn: HTMLDivElement, quantityText: HTMLDivElement, subBtn: HTMLDivElement) => {
    btn.addEventListener('click', async (e) => {
        e.preventDefault();

        if (localStorage.getItem('login') === null) {
            if (title != null && price != null && image != null) {
                localStorage.setItem("title", title);
                localStorage.setItem("price", price);
                localStorage.setItem("image", image)
            }
            window.location.href = './login.html';
        }
        else {
            btn.style.display = 'none';
            addBtn.style.display = 'block';
            addBtn.style.cursor='pointer';
            quantityText.style.display = 'block';
            subBtn.style.display = 'block';
            subBtn.style.cursor = 'pointer';
            const object = await callAddToCartApi(localStorage.getItem('login')!, title!, price!, image, addBtn, quantityText, subBtn);
            if (object.status === 300) {

                quantityText.innerHTML = `${object.quantity}`;
            }
            else {
                quantityText.innerHTML = `${1}`
            }
        }
    })
}

const callAddToCartApi = async (email: string, title: string, price: string, image: any, addBtn: HTMLDivElement, quantityText: HTMLDivElement, subBtn: HTMLDivElement) => {
    const res = await fetch(`http://localhost:5500/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ title: title?.trim(), price: price, email: localStorage.getItem('login'), image: image })
    });
    const json = await res.text()
    const object = await JSON.parse(json);
    if (object.status === 402) {
        window.location.href = './login.html';
    }
    return object;

}

const callUpdateCartQuantityApi = async (title: string, price: string, quantityText: HTMLDivElement, image: any, addBtn: HTMLDivElement, subBtn: HTMLDivElement) => {
    const res = await fetch(`http://localhost:5500/cart/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            title: title,
            price: price,
            quantity: quantityText.innerHTML,
            email: localStorage.getItem('login'),
            image: image
        })
    });

}

const callApiRemove = async (title: string, price: string, quantityText: HTMLDivElement, image: any) => {
    const res = await fetch(`http://localhost:5500/cart/remove`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            title: title,
            price: price,
            quantity: quantityText.innerHTML,
            email: localStorage.getItem('login')
        })
    });
    const json = await res.text()
    const object = await JSON.parse(json);
    console.log(object.message);
    window.location.href = './'

}
