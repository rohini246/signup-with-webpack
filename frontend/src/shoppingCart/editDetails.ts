export const editDetailsPage = () => {
    const name = document.querySelector('#edit-name') as HTMLInputElement;
    const email = document.querySelector('#edit-email') as HTMLInputElement;
    const address = document.querySelector('#edit-address') as HTMLInputElement;
    const error = document.querySelector('#edit-error') as HTMLSpanElement;
    const saveBtn = document.querySelector('#save') as HTMLButtonElement;
    console.log(localStorage.getItem('login')!)
    if (localStorage.getItem('login')) {
        email.value = localStorage.getItem('login')!
    }
    saveBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        if(!name.value && !address.value && localStorage.getItem('country')){
            error.textContent = 'Please enter fields to update.'
        }
        else{
            callApiToUpdateUserField(name.value!,address.value!);
        }
    })

}
const callApiToUpdateUserField = async(name?:string,address?:string)=>{
    const fullAddress = address + ", " + localStorage.getItem('city') + ", " + localStorage.getItem('state') + ", " + localStorage.getItem('country');
    const res = await fetch('http://localhost:5500/signup/updateDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          email:localStorage.getItem('login'),
          name:name,
          address:fullAddress,
        })
        })
        const json = await res.text();
        const obj = await JSON.parse(json); 
        if(obj.status===201){
            alert(obj.message);
            window.location.href='./'
        }
       
}