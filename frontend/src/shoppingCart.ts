
import {addCartItem} from './shoppingCart/cart/cart';
import {search} from './shoppingCart/searchBar/serachBar';
import { checkoutOrder } from "./shoppingCart/checkout/checkoutOrder";
import { placedOrders } from "./shoppingCart/placedOrders/placedOrders";
import { showProductFilter } from "./shoppingCart/filter/filters";
import {  detailsPage } from "./shoppingCart/productDetails/productsDetailsPage";




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
