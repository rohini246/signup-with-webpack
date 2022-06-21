export const checkoutOrder = () => {
    const table = document.querySelector('.myTable') as HTMLTableElement;
    const headings = table.getElementsByTagName('tr');
    console.log(headings);

    var count = 0;
    var title: string[] = [];
    for (var row of headings) {
        if (count != 0) {
            var data = row.getElementsByTagName('td')[1];
            title.push(data.innerText);
        } count++;
    } callCheckoutApi(title, table, headings);
}

const callCheckoutApi = async (title: string[], table: HTMLTableElement, headings: any) => {
    const res = await fetch(`http://localhost:5500/cart/checkout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            title: title,
            email: localStorage.getItem('login'),
            address:localStorage.getItem('address')
        })
    });
    const json = await res.text()
    const object = await JSON.parse(json);
    console.log(object.status);
    if (object.status === 200) {
        console.log(headings.length);
        var len: number = headings.length;
        while (len--) {
            console.log(len)
            if (len != 0) {
                console.log(headings[len]);
                table.deleteRow(len);
                const total = document.querySelector('.total') as HTMLInputElement;
                if (total) {
                    total.value = "0";
                }
                localStorage.removeItem('country');
                localStorage.removeItem('state');
                localStorage.removeItem('city');
            }
        }
    }
}    