import { loginForm} from "./services/login";
import { signupForm } from "./services/signup";
import { forgotForm } from "./services/forgot";
import { resetForm } from "./services/resetPass";
import {product} from './services/shoppingCart/products';
import {addCartItem} from './services/cart';
import {search} from './services/serachBar';
import { checkoutOrder } from "./services/checkoutOrder";
import { placedOrders } from "./services/placedOrders";
import { showProductFilter } from "./services/shoppingCart/filters";
import { callApiToGetProductDetails, detailsPage } from "./services/productsDetailsPage";
// import { showProductsDetails } from "./services/showProductsDetails";

const loginBtn = document.querySelector('#login') as HTMLAnchorElement;
const logoutBtn = document.querySelector('#logout') as HTMLButtonElement;
if(loginBtn && localStorage.getItem('login') && logoutBtn){
    if (loginBtn.style.display === "none") {
        loginBtn.style.display = "block";
    } else {
        logoutBtn.style.display = 'block';
        loginBtn.style.display = "none";
    }   
}
if(logoutBtn){
    logoutBtn.onclick = (e)=>{
        e.preventDefault();
        localStorage.removeItem('login');
        if (logoutBtn.style.display === "none") {
            logoutBtn.style.display = "block";
          } else {
            logoutBtn.style.display = "none";
        }loginBtn.style.display = 'block';
    }
}

const l = document.getElementById('loginPage');
if(l && localStorage.getItem('login')){
    window.location.href = 'shoppingApp.html';
}

const signupFormEle = document.querySelector('#signupSubmit') as HTMLButtonElement;
if(signupFormEle !== null){
    signupFormEle.addEventListener('click',(e:Event)=>{
        e.preventDefault();
        signupForm(signupFormEle);
    })
}
const form = document.getElementById('resetPage');
if(form !== null){
    form!.onload = async (e) => {
        e.preventDefault();   
        const query = window.location.search;
        const url = new URLSearchParams(query);
        const token =await  url.get('token')!;
        const res =await fetch(`http://localhost:5500/forgot/token}`,{
        method: 'POST',
        headers: {
           'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({token:token})
    })
    const json = await res.text()
    const object = await JSON.parse(json);
    console.log(object);
    if(object.status===400 || object.status=== 404){
        window.location.href='./expiredPage.html';
    }else{
        const mailArea =  document.getElementById('forgot-email') as HTMLInputElement;
        mailArea.value = object.email; 
    }          
    }
}

const loginFormEle = document.querySelector('#loginSubmit') as HTMLButtonElement;
if(loginFormEle !== null){
 loginFormEle.addEventListener('click',(e)=>{  
     e.preventDefault();
     loginForm(loginFormEle);
 })
} 

const resetFormEle = document.querySelector('#resetSubmit') as HTMLButtonElement;
if(resetFormEle !== null){
    resetFormEle.addEventListener('click',(e:Event)=>{
        e.preventDefault();
        resetForm(resetFormEle);
    })
}

const forgotFormEle = document.querySelector('#forgotSubmit') as HTMLButtonElement;
if(forgotFormEle !== null){
    forgotFormEle.addEventListener('click',(e:Event)=>{
        e.preventDefault();
        forgotForm(forgotFormEle);
    })
}

const redirectLogin = document.querySelector('.redirect_login') as HTMLDivElement;
if(redirectLogin!==null){
    redirectLogin.addEventListener('click',(e)=>{
        e.preventDefault();
        window.location.href='./login.html';
    });
}

const redirectSignup = document.querySelector('.redirect_signup') as HTMLDivElement;
if(redirectSignup!==null){
    redirectSignup.addEventListener('click',(e)=>{
        e.preventDefault();
        window.location.href='./signup.html';
    });
}

const redirectForgot = document.querySelector('#redirect_forgot') as HTMLDivElement;
if(redirectForgot!==null){
    redirectForgot.addEventListener('click',(e)=>{
        e.preventDefault();
        window.location.href='./forgot.html';
    });
}

const shoppingApp = document.querySelector('.shoppingApp') as HTMLBodyElement;
if(shoppingApp){
    logoutBtn.style.display = 'none';
    if(localStorage.getItem('login')){
        logoutBtn.style.display='block';
    }
        product(); 
}

const cartElm = document.querySelector('#cart') as HTMLBodyElement;
if(cartElm){
    addCartItem(cartElm);
}

const detailsElm = document.querySelector('#details') as HTMLBodyElement;
console.log(detailsElm,"detailsPage");
if(detailsElm){
    detailsPage(detailsElm);
    //callApiToGetProductDetails(detailsElm);
    // detailsElm.addEventListener('load',(e)=>{
    //     e.preventDefault();
    //     //detailsPage(detailsElm);
    // })
}

const placedElm = document.querySelector('#placed_orders') as HTMLBodyElement;
if(placedElm){
    placedOrders(placedElm);
}

const searchBar = document.querySelector('.search_bar') as HTMLInputElement;
if(searchBar!==null){
    searchBar.addEventListener('keyup',(e:Event)=>{
        e.preventDefault();
        search(searchBar,e);
    })
}

const productFilter= document.querySelector('#product_filter') as HTMLDivElement;
if(productFilter){
    productFilter.addEventListener('click',(e)=>{
        e.preventDefault();
        showProductFilter(productFilter);
    })
}

const checkout = document.querySelector('.checkout') as HTMLDivElement;
if(checkout){
    checkout.addEventListener('click',(e)=>{
        e.preventDefault();
        checkoutOrder();
        alert("confirm order")
    })
}

// const showProducts = document.querySelector('#product_main') as HTMLBodyElement;
// if(showProducts){
//     console.log('product page');
//     showProducts.addEventListener('mouseup',(e)=>{
//         e.preventDefault();
//         showProductsDetails(showProducts);
//     })
// }
