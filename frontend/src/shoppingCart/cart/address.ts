const countryName = document.querySelector('#select_country') as HTMLSelectElement;
export const getCountry = async (address: HTMLDivElement) => {
    const country = document.querySelector('#select_country') as HTMLSelectElement;
    const countryName = country.value;
    localStorage.setItem('country', countryName);
    const res = await fetch(`http://localhost:5500/address`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ country: localStorage.getItem('country') })
    });
    const json = await res.text()
    const object = await JSON.parse(json);
    if (object.status == 402) {
        alert('Please enter states');
    }
    else {
        dropDownForStates(object.states, address);

    }
}

const dropDownForStates = (states: string[], address: HTMLDivElement) => {
    const statesDiv = document.querySelector('#state') as HTMLDivElement;
    statesDiv.innerHTML='';
    const labelForState = document.createElement('label');
    labelForState.innerHTML = `States`;
    statesDiv.appendChild(labelForState);
    
    const select = document.createElement('select');
    let option = document.createElement('option');
    // const select = document.querySelector('#select_state') as HTMLSelectElement;
    option.innerHTML = `select state`;
    select.appendChild(option);
    for (let state of states) {
        let option = document.createElement('option');
        option.innerHTML = `${state.toUpperCase()}`;
        select.appendChild(option);
    }
    statesDiv.appendChild(select);

    statesDiv.addEventListener('change', (e) => {
        e.preventDefault();
        getState(statesDiv, select)
    })
}

const getState = async(statesDiv: HTMLDivElement, select: HTMLSelectElement) => {
    let state = select.value;
    localStorage.setItem('state', state);
    const res = await fetch(`http://localhost:5500/address/city`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ state: localStorage.getItem('state') })
    });
    const json = await res.text()
    const object = await JSON.parse(json);
    // if (object.status == 402) {
    //     alert('Please enter states');
    // }
    // else {
        console.log(object.cities);
        return dropDownForCity(object.cities);
    // }

}

const dropDownForCity=(cities:string[])=>{
    const citiesDiv = document.querySelector('#city') as HTMLDivElement;
    citiesDiv.innerHTML='';
    const labelForState = document.createElement('label');
    labelForState.innerHTML = `City`;
    citiesDiv.appendChild(labelForState);

    const select = document.createElement('select');
    let option = document.createElement('option');
    option.innerHTML = `select city`;
    select.appendChild(option);

    for (let state of cities) {
        let option = document.createElement('option');
        option.innerHTML = `${state.toUpperCase()}`;
        select.appendChild(option);
    }
    citiesDiv.appendChild(select);

    citiesDiv.addEventListener('change', (e) => {
        e.preventDefault();
        getCity(citiesDiv, select)
    })

}

const getCity = async(citiesDiv:HTMLDivElement,select:HTMLSelectElement)=>{
   let cityName = select.value
    localStorage.setItem('city', cityName);
    const res = await fetch(`http://localhost:5500/address/zip`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ city: localStorage.getItem('city') })
    });
    const json = await res.text()
    const object = await JSON.parse(json);
    if (object.status == 402) {
        alert('Please enter states');
    }
    else {
        console.log(object.zip);
        return showZip(object.zip);
    }

}

const showZip = (zip:number)=>{
    const zipDiv = document.querySelector('#zip') as HTMLDivElement;
    zipDiv.innerHTML='';
    const labelForZip = document.createElement('label');
    labelForZip.innerHTML = `Zip`;
    zipDiv.appendChild(labelForZip);

    const div = document.createElement('div');
    div.innerHTML = `${zip}`;
    zipDiv.appendChild(div);
}

export const getAddresses = async(address:HTMLDivElement)=>{
    
    const addresses = await callApiToGetAddress();
    

    const select = document.createElement('select');
    select.className = 'select-address';
    
    let option = document.createElement('option');
    option.innerHTML = `Select Address`;
    select.appendChild(option);
    for (let address of addresses.address) {
        if(address!=='NULL'){

            let option = document.createElement('option');
            option.innerHTML = `${address.toUpperCase()}`;
            select.appendChild(option);
        }

    }
    address.appendChild(select);

    address.addEventListener('change',(e)=>{
        e.preventDefault();
        addAdressToDb(select);
    })
}
export const addAdressToDb = (select:HTMLSelectElement)=>{
    let address = select.value;
    localStorage.setItem('address',address);

}

const callApiToGetAddress = async()=>{
    const res = await fetch(`http://localhost:5500/cart/address`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({email:localStorage.getItem('login') })
    });
    const json = await res.text()
    const object = await JSON.parse(json);
    return object;
}