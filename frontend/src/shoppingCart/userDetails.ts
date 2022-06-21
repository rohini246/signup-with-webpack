export const userDetailsPage = async()=>{
    const name = document.querySelector('#name') as HTMLSpanElement;
    const email = document.querySelector('#email') as HTMLSpanElement;
    const address = document.querySelector('#address') as HTMLSpanElement;
    
    if(localStorage.getItem('login')){
        const userDetails = await callApiToGetUserDetails();
        name.innerHTML = userDetails.userDetails.name;
        email.innerHTML = userDetails.userDetails.email;
        address.innerHTML = userDetails.userDetails.address;
    }
    else{
        window.location.href = './login.html'
    }
}

const callApiToGetUserDetails = async()=>{
    const res = await fetch('http://localhost:5500/login/details', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({
    email:localStorage.getItem('login')
  })
  })
  const json = await res.text();
  const obj = await JSON.parse(json); 
  console.log(obj)
  return obj;
}