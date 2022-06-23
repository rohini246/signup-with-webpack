import { addCartItem } from './shoppingCart/cart/cart';
import { search } from './shoppingCart/searchBar/serachBar';
import { checkoutOrder } from "./shoppingCart/checkout/checkoutOrder";
import { placedOrders } from "./shoppingCart/placedOrders/placedOrders";
import { showProductFilter } from "./shoppingCart/filter/filters";
import { detailsPage } from "./shoppingCart/productDetails/productsDetailsPage";
import { getCountry ,getAddresses} from './shoppingCart/cart/address';
import { userDetailsPage } from './shoppingCart/userDetails';
import { editDetailsPage } from './shoppingCart/editDetails';

const address = document.querySelector('#get-address') as HTMLDivElement;
if(address){
    getAddresses(address);
}


const country = document.querySelector('#country') as HTMLDivElement;
if (country) {
    country.addEventListener('change', (e) => {
        e.preventDefault();
        getCountry(country);
    })
}
const userDetails = document.querySelector('#user-details') as HTMLBodyElement;
if(userDetails){
    userDetailsPage();
}
const user = document.querySelector('#user') as HTMLAnchorElement;
if(!localStorage.getItem('login')){
    user.style.display='none';
}


const cartElm = document.querySelector('#cart') as HTMLBodyElement;
if (cartElm) {
    addCartItem(cartElm);
}

const detailsElm = document.querySelector('#details') as HTMLBodyElement;
console.log(detailsElm, "detailsPage");
if (detailsElm) {
    detailsPage(detailsElm);
}

const placedElm = document.querySelector('#placed_orders') as HTMLBodyElement;
if (placedElm) {
    placedOrders(placedElm);
}

const searchBar = document.querySelector('.search_bar') as HTMLInputElement;
if (searchBar !== null) {
    searchBar.addEventListener('keyup', (e: Event) => {
        e.preventDefault();
        search(searchBar, e);
    })
}

const productFilter = document.querySelector('#product_filter') as HTMLDivElement;
if (productFilter) {
  showProductFilter();
   
}
const checkout = document.querySelector('.checkout') as HTMLDivElement;
if (checkout) {
    checkout.addEventListener('click', (e) => {
        e.preventDefault();
        if(localStorage.getItem('address')==='Select Address' || !localStorage.getItem('address')){
            alert('please select address or add new address')
        } 
        else {
            checkoutOrder();
            alert("confirm order")
            localStorage.removeItem('address');
            window.location.href='./emptyCart.html'
        }
    })
}


const searchBtn = document.querySelector('#search') as HTMLButtonElement;
if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(searchBar.value);
        if (!searchBar.value) {
            alert('please enter something.');
        }
    })
}


const editDetails = document.querySelector('#edit-details-page') as HTMLBodyElement;
if(editDetails){
    editDetailsPage();
}
