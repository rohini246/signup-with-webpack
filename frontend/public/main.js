/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const login_1 = __webpack_require__(1);
const signup_1 = __webpack_require__(3);
const forgot_1 = __webpack_require__(4);
const resetPass_1 = __webpack_require__(5);
const products_1 = __webpack_require__(6);
const loginBtn = document.querySelector('#login');
const logoutBtn = document.querySelector('#logout');
if (loginBtn && localStorage.getItem('login') && logoutBtn) {
    if (loginBtn.style.display === "none") {
        loginBtn.style.display = "block";
    }
    else {
        logoutBtn.style.display = 'block';
        loginBtn.style.display = "none";
    }
}
if (logoutBtn) {
    logoutBtn.onclick = (e) => {
        e.preventDefault();
        localStorage.removeItem('login');
        if (logoutBtn.style.display === "none") {
            logoutBtn.style.display = "block";
        }
        else {
            logoutBtn.style.display = "none";
        }
        loginBtn.style.display = 'block';
    };
}
const l = document.getElementById('loginPage');
if (l && localStorage.getItem('login')) {
    window.location.href = 'shoppingApp.html';
}
const signupFormEle = document.querySelector('#signupSubmit');
if (signupFormEle !== null) {
    signupFormEle.addEventListener('click', (e) => {
        e.preventDefault();
        (0, signup_1.signupForm)(signupFormEle);
    });
}
const form = document.getElementById('resetPage');
if (form !== null) {
    form.onload = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const query = window.location.search;
        const url = new URLSearchParams(query);
        const token = yield url.get('token');
        const res = yield fetch(`http://localhost:5500/forgot/token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ token: token })
        });
        const json = yield res.text();
        const object = yield JSON.parse(json);
        console.log(object);
        if (object.status === 400 || object.status === 404) {
            window.location.href = './expiredPage.html';
        }
        else {
            const mailArea = document.getElementById('forgot-email');
            mailArea.value = object.email;
        }
    });
}
const loginFormEle = document.querySelector('#loginSubmit');
if (loginFormEle !== null) {
    loginFormEle.addEventListener('click', (e) => {
        e.preventDefault();
        (0, login_1.loginForm)(loginFormEle);
    });
}
const resetFormEle = document.querySelector('#resetSubmit');
if (resetFormEle !== null) {
    resetFormEle.addEventListener('click', (e) => {
        e.preventDefault();
        (0, resetPass_1.resetForm)(resetFormEle);
    });
}
const forgotFormEle = document.querySelector('#forgotSubmit');
if (forgotFormEle !== null) {
    forgotFormEle.addEventListener('click', (e) => {
        e.preventDefault();
        (0, forgot_1.forgotForm)(forgotFormEle);
    });
}
const redirectLogin = document.querySelector('.redirect_login');
if (redirectLogin !== null) {
    redirectLogin.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = './login.html';
    });
}
const redirectSignup = document.querySelector('.redirect_signup');
if (redirectSignup !== null) {
    redirectSignup.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = './signup.html';
    });
}
const redirectForgot = document.querySelector('#redirect_forgot');
if (redirectForgot !== null) {
    redirectForgot.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = './forgot.html';
    });
}
const shoppingApp = document.querySelector('.shoppingApp');
if (shoppingApp) {
    logoutBtn.style.display = 'none';
    if (localStorage.getItem('login')) {
        logoutBtn.style.display = 'block';
    }
    (0, products_1.product)();
}


/***/ }),
/* 1 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loginForm = void 0;
const validation_1 = __webpack_require__(2);
const loginForm = (button) => {
    const emailElm = document.querySelector('#login-email');
    const passwordElm = document.querySelector('#login-password');
    const errorElm = document.querySelector('.login-error');
    errorElm.innerHTML = '';
    if (!emailElm.value || !passwordElm.value) {
        errorElm.innerHTML = "Please enter all fields.";
    }
    else {
        checkValidEmail(emailElm.value, passwordElm.value, errorElm);
    }
};
exports.loginForm = loginForm;
const checkValidEmail = (email, password, errorElm) => {
    if ((0, validation_1.isValidEmail)(email)) {
        callLoginApi(email, password, errorElm);
    }
    else {
        errorElm.innerHTML = 'Please enter valid email.';
    }
};
const callLoginApi = (email, password, errorElm) => __awaiter(void 0, void 0, void 0, function* () {
    const successElm = document.querySelector('.successfull-login');
    const res = yield fetch('http://localhost:5500/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });
    const json = yield res.text();
    const obj = yield JSON.parse(json);
    console.log(obj.status);
    if (obj.message === 'Login Successfully.') {
        window.location.href = `./shoppingApp.html`;
        localStorage.setItem('login', obj.email);
        successElm.innerHTML = obj.message;
    }
    else {
        errorElm.innerHTML = obj.message;
    }
});


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isValidPassword = exports.isValidEmail = void 0;
const isValidEmail = (email) => {
    return (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) ? false : true;
};
exports.isValidEmail = isValidEmail;
const isValidPassword = (password) => {
    return (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/)) ? true : false;
};
exports.isValidPassword = isValidPassword;


/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.signupForm = void 0;
const validation_1 = __webpack_require__(2);
const signupForm = (button) => {
    const name = document.querySelector('#signup-name');
    const email = document.querySelector('#signup-email');
    const address = document.querySelector('#signup-address');
    const password = document.querySelector('#signup-password');
    const confirmPassword = document.querySelector('#signup-confirm_password');
    const error = document.querySelector(".signup-error");
    error.innerHTML = "";
    const user = {
        name: name.value,
        email: email.value,
        address: address.value,
        password: password.value
    };
    if (checkFields(user.name, user.email, user.password, confirmPassword.value, user.address)) {
        emailValidation(user.name, user.email, user.address, user.password, confirmPassword.value, error);
    }
    else {
        error.innerHTML = 'Please enter all fields.';
    }
};
exports.signupForm = signupForm;
const checkFields = (name, email, password, confirmPassword, address) => {
    return (name && email && password && address) ? true : false;
};
const emailValidation = (name, email, address, password, confirmPassword, error) => {
    if ((0, validation_1.isValidEmail)(email)) {
        passwordValidation(name, email, address, password, confirmPassword, error);
    }
    else {
        error.innerHTML = 'Please provide a valid email address.';
    }
};
const passwordValidation = (name, email, address, password, confirmPassword, error) => {
    if (!(0, validation_1.isValidPassword)(password)) {
        error.innerHTML = 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters';
    }
    else if (password !== confirmPassword) {
        error.innerHTML = "Confirm password didn't match";
    }
    else {
        callApi(name, email, address, password, confirmPassword, error);
    }
};
const callApi = (name, email, address, password, confirmPassword, error) => __awaiter(void 0, void 0, void 0, function* () {
    const success = document.querySelector(".successfull-signup");
    const url = "http://localhost:5500/signup";
    const res = yield fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            name,
            email,
            address,
            password
        })
    });
    const json = yield res.text();
    const obj = yield JSON.parse(json);
    if (obj.message === "Successfully Registered.") {
        success.innerHTML = obj.message;
        window.location.href = './login.html';
    }
    else {
        error.innerHTML = obj.message;
    }
});


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.forgotForm = void 0;
const validation_1 = __webpack_require__(2);
const forgotForm = (button) => {
    const emailElem = document.querySelector('#forgot-email');
    const errorElem = document.querySelector('.forgot-error');
    const successElem = document.querySelector('.successfull-mail-sent');
    const email = emailElem.value;
    if (!email) {
        errorElem.innerHTML = 'Please enter email';
    }
    else {
        checkValidEmailOrNot(email, errorElem, successElem);
    }
};
exports.forgotForm = forgotForm;
const checkValidEmailOrNot = (email, errorElem, successElem) => {
    if ((0, validation_1.isValidEmail)(email)) {
        callForgotApi(email, errorElem, successElem);
    }
    else {
        errorElem.innerHTML = 'Please provide a valid email address.';
    }
};
const callForgotApi = (email, errorElem, successElem) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch('http://localhost:5500/forgot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ email: email })
    });
    const json = yield res.text();
    const obj = yield JSON.parse(json);
    if (obj.message === "Mail sent successfully") {
        successElem.innerHTML = obj.message;
    }
    else {
        errorElem.innerHTML = obj.message;
    }
});


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resetForm = void 0;
const validation_1 = __webpack_require__(2);
const resetForm = (button) => {
    const email = document.querySelector('#forgot-email');
    const password = document.querySelector('#forgot-password');
    const confirmPassword = document.querySelector('#forgot-confirm_password');
    const error = document.querySelector(".reset-error");
    const success = document.querySelector(".successfull-reset");
    const user = {
        password: password.value
    };
    if (user.password && confirmPassword.value) {
        passwordValidation(email.value, user.password, confirmPassword.value, error, success);
    }
    else {
        error.innerHTML = 'Please enter all fields.';
    }
};
exports.resetForm = resetForm;
const passwordValidation = (email, password, confirmPassword, error, success) => {
    if (!(0, validation_1.isValidPassword)(password)) {
        error.innerHTML = 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters';
    }
    else if (password !== confirmPassword) {
        error.innerHTML = "Confirm password didn't match";
    }
    else {
        callResetPassApi(email, password, confirmPassword, error, success);
    }
};
const callResetPassApi = (email, password, confirmPassword, error, success) => __awaiter(void 0, void 0, void 0, function* () {
    const query = window.location.search;
    const url = new URLSearchParams(query);
    const token = url.get('token');
    const api = "http://localhost:5500/resetPass";
    const res = yield fetch(api, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email,
            password,
            token
        })
    });
    const json = yield res.text();
    const obj = yield JSON.parse(json);
    if (obj.message === "Password Reset Successfully") {
        success.innerHTML = obj.message;
        window.location.href = './login.html';
    }
    else if (obj.status === 404) {
        window.location.href = './expiredPage.html';
    }
    else {
        error.innerHTML = obj.message;
    }
});


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.product = void 0;
const showProductsDetails_1 = __webpack_require__(7);
const addToCart_1 = __webpack_require__(8);
const out = document.querySelector('.products');
const product = () => {
    const params = getParams();
    productService(params, localStorage.getItem('color'), localStorage.getItem('size'));
};
exports.product = product;
const getParams = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const param = urlParams.get('filter');
    console.log(param);
    return param;
};
const productService = (params, color, size) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productFetchApi(params, color, size);
    let output = "";
    for (let item of product) {
        output += `
        <div class="product" name="product">
           <img src="${item.image}"  alt="${item.description}">
           <p class="title">${item.title}</p>
           <p class="price">
              <span>price ${item.price}</span>
           </p><br><br>
           <button style="color:palevioletred" name="addCart">Add to cart</button>
           <div style="color:palevioletred" name="view" class="view">Details</div>
        </div>`;
    }
    out.innerHTML = output;
    (0, addToCart_1.addToCart)(out);
    (0, showProductsDetails_1.showProductsDetails)(out, product);
});
const productFetchApi = (params, color, size) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:5500/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ color: color, size: size, filter: params })
    });
    console.log(typeof response);
    const json = yield response.text();
    console.log(typeof json);
    const obj = yield JSON.parse(json);
    return obj;
});


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.showProductsDetails = void 0;
const showProductsDetails = (out, product) => {
    var _a, _b, _c, _d, _e, _f;
    console.log(product[0], "product");
    const viewProductDetailsBtn = out.getElementsByTagName('div');
    for (var btn of viewProductDetailsBtn) {
        const title = (_c = ((_b = (_a = btn.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('.title')) === null || _b === void 0 ? void 0 : _b.textContent)) === null || _c === void 0 ? void 0 : _c.toLowerCase();
        const price = (_f = ((_e = (_d = btn.parentElement) === null || _d === void 0 ? void 0 : _d.querySelector('.price')) === null || _e === void 0 ? void 0 : _e.textContent)) === null || _f === void 0 ? void 0 : _f.toLowerCase();
        btnOfviewProductDetailsBtns(btn, title, price, product);
    }
};
exports.showProductsDetails = showProductsDetails;
const btnOfviewProductDetailsBtns = (btn, title, price, product) => {
    console.log(title, price);
    btn.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        for (let data of product) {
            if ((data.title).toLowerCase() === title && (data.price).toLowerCase() === price) {
                console.log("match");
            }
        }
        if (localStorage.getItem('title')) {
            window.location.href = './productDetails.html';
            return;
        }
        localStorage.setItem('title', title);
        localStorage.setItem('price', price);
        console.log(title, price, "title");
    }));
};


/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addToCart = void 0;
const addToCart = (out) => {
    var _a, _b, _c, _d;
    addItemsToCartAddedBeforeLogin();
    const addToCartBtn = out.getElementsByTagName('button');
    for (var btn of addToCartBtn) {
        const title = (_b = (_a = btn.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('.title')) === null || _b === void 0 ? void 0 : _b.textContent;
        const price = (_d = (_c = btn.parentElement) === null || _c === void 0 ? void 0 : _c.querySelector('.price')) === null || _d === void 0 ? void 0 : _d.textContent;
        btnOfAddToCartBtns(btn, title, price);
    }
};
exports.addToCart = addToCart;
const addItemsToCartAddedBeforeLogin = () => __awaiter(void 0, void 0, void 0, function* () {
    if (localStorage.getItem('title') && localStorage.getItem('price') && localStorage.getItem('login')) {
        const res = yield fetch(`http://localhost:5500/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ title: localStorage.getItem('title'), price: localStorage.getItem('price'), email: localStorage.getItem('login') })
        });
        const json = yield res.text();
        const object = yield JSON.parse(json);
        if (object.status === 200) {
            localStorage.removeItem('title');
            localStorage.removeItem('price');
        }
    }
});
const btnOfAddToCartBtns = (btn, title, price) => {
    btn.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (localStorage.getItem('login') === null) {
            if (title != null && price != null) {
                localStorage.setItem("title", title);
                localStorage.setItem("price", price);
            }
            window.location.href = './login.html';
        }
        callAddToCartApi(localStorage.getItem('login'), title, price);
    }));
};
const callAddToCartApi = (email, title, price) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`http://localhost:5500/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ title: title === null || title === void 0 ? void 0 : title.trim(), price: price, email: localStorage.getItem('login') })
    });
    const json = yield res.text();
    const object = yield JSON.parse(json);
    if (object.status === 402) {
        window.location.href = './login.html';
    }
});


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const cart_1 = __webpack_require__(10);
const serachBar_1 = __webpack_require__(11);
const checkoutOrder_1 = __webpack_require__(12);
const placedOrders_1 = __webpack_require__(13);
const filters_1 = __webpack_require__(14);
const productsDetailsPage_1 = __webpack_require__(15);
const cartElm = document.querySelector('#cart');
if (cartElm) {
    (0, cart_1.addCartItem)(cartElm);
}
const detailsElm = document.querySelector('#details');
console.log(detailsElm, "detailsPage");
if (detailsElm) {
    (0, productsDetailsPage_1.detailsPage)(detailsElm);
    //callApiToGetProductDetails(detailsElm);
    // detailsElm.addEventListener('load',(e)=>{
    //     e.preventDefault();
    //     //detailsPage(detailsElm);
    // })
}
const placedElm = document.querySelector('#placed_orders');
if (placedElm) {
    (0, placedOrders_1.placedOrders)(placedElm);
}
const searchBar = document.querySelector('.search_bar');
if (searchBar !== null) {
    searchBar.addEventListener('keyup', (e) => {
        e.preventDefault();
        (0, serachBar_1.search)(searchBar, e);
    });
}
const productFilter = document.querySelector('#product_filter');
if (productFilter) {
    productFilter.addEventListener('click', (e) => {
        e.preventDefault();
        (0, filters_1.showProductFilter)(productFilter);
    });
}
const checkout = document.querySelector('.checkout');
if (checkout) {
    checkout.addEventListener('click', (e) => {
        e.preventDefault();
        (0, checkoutOrder_1.checkoutOrder)();
        alert("confirm order");
    });
}
// const showProducts = document.querySelector('#product_main') as HTMLBodyElement;
// if(showProducts){
//     console.log('product page');
//     showProducts.addEventListener('mouseup',(e)=>{
//         e.preventDefault();
//         showProductsDetails(showProducts);
//     })
// }


/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addCartItem = void 0;
const totalElm = document.querySelector('.total');
const heading = document.querySelector('.heading');
const table = document.querySelector('.myTable');
const checkout = document.querySelector('.checkout');
const addCartItem = (body) => __awaiter(void 0, void 0, void 0, function* () {
    if (localStorage.getItem('login') === null) {
        body.replaceWith('PLEASE LOGIN');
    }
    const res = yield fetch(`http://localhost:5500/cart/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ email: localStorage.getItem('login') })
    });
    const json = yield res.text();
    const object = yield JSON.parse(json);
    console.log(object);
    if (object.price.length === 0) {
        body.replaceWith('PLEASE ADD ITEMS TO CART');
    }
    console.log(object.price, object.title);
    var count = 0;
    var total = 0;
    for (var item of object.title) {
        const cartTitleList = document.createElement('td');
        const cartPriceList = document.createElement('td');
        const cartQuantityList = document.createElement('td');
        const row = document.createElement('tr');
        const cartTitleListText = document.createElement('span');
        const cartPriceListText = document.createElement('span');
        const cartQuantityListText = document.createElement('span');
        const cartRemoveBtn = document.createElement('button');
        const cartAddBtn = document.createElement('button');
        const cartDeleteBtn = document.createElement('button');
        cartTitleListText.textContent = `${object.title[count]}`;
        cartTitleList.appendChild(cartTitleListText);
        console.log(typeof object.price[count]);
        cartPriceListText.textContent = `${object.price[count]}`;
        cartPriceList.appendChild(cartPriceListText);
        cartAddBtn.textContent = `+`;
        cartQuantityList.appendChild(cartAddBtn);
        cartQuantityListText.textContent = `${object.quantity[count]}`;
        cartQuantityList.appendChild(cartQuantityListText);
        cartDeleteBtn.textContent = `-`;
        cartQuantityList.appendChild(cartDeleteBtn);
        cartRemoveBtn.textContent = `REMOVE`;
        cartQuantityList.appendChild(cartRemoveBtn);
        row.appendChild(cartTitleList);
        row.appendChild(cartPriceList);
        row.appendChild(cartQuantityList);
        table.appendChild(row);
        callCartAddBtn(cartAddBtn, cartTitleListText, cartPriceListText, cartQuantityListText);
        callCartDeleteBTn(cartDeleteBtn, cartTitleListText, cartPriceListText, cartQuantityListText, row, table);
        cartRemoveBtn.addEventListener('click', () => {
            table.removeChild(row);
            callApiRemove(cartTitleListText, cartPriceListText, cartQuantityListText);
        });
        var matches = object.price[count].match(/(\d+)/);
        if (matches) {
            var price = '';
            price = matches[0];
            total += parseInt(object.quantity[count]) * parseInt(price);
        }
        console.log("grandTotal", total);
        totalElm.value = total.toString();
        count = count + 1;
    }
});
exports.addCartItem = addCartItem;
const callCartAddBtn = (cartAddBtn, cartTitleListText, cartPriceListText, cartQuantityListText) => {
    cartAddBtn.addEventListener('click', () => {
        var data = cartQuantityListText.textContent;
        if (data != null) {
            cartQuantityListText.textContent = (parseInt(data) + 1).toString();
            callUpdateCartQuantityApi(cartTitleListText, cartPriceListText, cartQuantityListText);
        }
    });
};
const callCartDeleteBTn = (cartDeleteBtn, cartTitleListText, cartPriceListText, cartQuantityListText, row, table) => {
    cartDeleteBtn.addEventListener('click', () => {
        var data = cartQuantityListText.textContent;
        if (data != null && parseInt(data) > 1) {
            cartQuantityListText.textContent = (parseInt(data) - 1).toString();
            callUpdateCartQuantityApi(cartTitleListText, cartPriceListText, cartQuantityListText);
        }
        else {
            table.removeChild(row);
            callApiRemove(cartTitleListText, cartPriceListText, cartQuantityListText);
        }
    });
};
const callApiRemove = (cartTitleListText, cartPriceListText, cartQuantityListText) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(cartTitleListText.textContent);
    const res = yield fetch(`http://localhost:5500/cart/remove`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ title: cartTitleListText.textContent,
            price: cartPriceListText.textContent,
            quantity: cartQuantityListText.textContent,
            email: localStorage.getItem('login')
        })
    });
    const json = yield res.text();
    const object = yield JSON.parse(json);
    console.log(object.message);
    window.location.href = './cart.html';
});
const callUpdateCartQuantityApi = (cartTitleListText, cartPriceListText, cartQuantityListText) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(cartTitleListText.textContent);
    const res = yield fetch(`http://localhost:5500/cart/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ title: cartTitleListText.textContent,
            price: cartPriceListText.textContent,
            quantity: cartQuantityListText.textContent,
            email: localStorage.getItem('login')
        })
    });
    const json = yield res.text();
    const object = yield JSON.parse(json);
    console.log(object.message);
    window.location.href = './cart.html';
});


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.search = void 0;
const search = (input, e) => {
    const term = e.target.value.toLowerCase();
    console.log(term);
    const products = document.querySelectorAll('.product');
    //console.log("search",products);
    var count = 0;
    for (var item of products) {
        console.log(item);
        var title = item.getElementsByClassName('title')[0].innerHTML;
        if (title.toLowerCase().indexOf(term) != -1) {
            item.style.display = 'block';
            console.log('show');
        }
        else {
            item.style.display = 'none';
        }
    }
};
exports.search = search;


/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkoutOrder = void 0;
const checkoutOrder = () => {
    const table = document.querySelector('.myTable');
    const headings = table.getElementsByTagName('tr');
    var count = 0;
    var title = [];
    for (var row of headings) {
        if (count != 0) {
            var data = row.getElementsByTagName('td')[0];
            title.push(data.innerText);
        }
        count++;
    }
    callCheckoutApi(title, table, headings);
};
exports.checkoutOrder = checkoutOrder;
const callCheckoutApi = (title, table, headings) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`http://localhost:5500/cart/checkout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ title: title,
            email: localStorage.getItem('login')
        })
    });
    const json = yield res.text();
    const object = yield JSON.parse(json);
    console.log(object.status);
    if (object.status === 200) {
        console.log(headings.length);
        var len = headings.length;
        while (len--) {
            console.log(len);
            if (len != 0) {
                console.log(headings[len]);
                table.deleteRow(len);
                const total = document.querySelector('.total');
                if (total) {
                    total.value = "0";
                }
            }
        }
    }
});


/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.placedOrders = void 0;
const placedOrders = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`http://localhost:5500/cart/placedOrders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ email: localStorage.getItem('login') })
    });
    const json = yield res.text();
    const object = yield JSON.parse(json);
    console.log(object.date.length);
    if (localStorage.getItem('login') === null || object.date[0] === 'null') {
        body.replaceWith('PLEASE ORDER SOMETHING');
    }
    var count = 0;
    var c = 1;
    var total = 0;
    var checkDate = object.date[0];
    console.log(checkDate);
    const table = document.querySelector('.myTable');
    for (var item of object.date) {
        const cartTitleList = document.createElement('td');
        const cartPriceList = document.createElement('td');
        const cartQuantityList = document.createElement('td');
        const cartDateList = document.createElement('td');
        const row = document.createElement('tr');
        const div = document.createElement('div');
        const cartTitleListText = document.createElement('span');
        const cartPriceListText = document.createElement('span');
        const cartQuantityListText = document.createElement('span');
        const cartDateListText = document.createElement('span');
        cartTitleListText.textContent = `${object.title[count]}`;
        cartTitleList.appendChild(cartTitleListText);
        cartPriceListText.textContent = `${object.price[count]}`;
        cartPriceList.appendChild(cartPriceListText);
        cartDateListText.textContent = `${object.date[count].slice(0, 16)}`;
        cartDateList.appendChild(cartDateListText);
        cartQuantityListText.textContent = `${object.quantity[count]}`;
        cartQuantityList.appendChild(cartQuantityListText);
        row.appendChild(cartTitleList);
        row.appendChild(cartPriceList);
        row.appendChild(cartQuantityList);
        row.appendChild(cartDateList);
        if (checkDate === object.date[count]) {
            div.innerHTML = '';
            var matches = object.price[count].match(/(\d+)/);
            if (matches) {
                var price = '';
                price = matches[0];
                total += parseInt(object.quantity[count]) * parseInt(price);
            }
        }
        else {
            setDivContent(div, `Date: ${object.date[count - 1].slice(0, 16)}\n and Paid Bill = $${total}`);
            checkDate = object.date[count];
            var matches = object.price[count].match(/(\d+)/);
            if (matches) {
                var price = '';
                price = matches[0];
                total = parseInt(object.quantity[count]) * parseInt(price);
            }
        }
        table.appendChild(div);
        table.appendChild(row);
        count++;
    }
    if (object.date[object.date.length - 1] !== undefined) {
        const latestDeliveredDate = document.createElement('div');
        table.appendChild(setDivContent(latestDeliveredDate, `Date: ${object.date[object.date.length - 1].slice(0, 16)} and Paid Bill = $${total}`));
    }
});
exports.placedOrders = placedOrders;
const setDivContent = (div, text) => {
    div.innerHTML = text;
    div.style.color = 'green';
    div.style.backgroundColor = 'paleturquoise';
    return div;
};


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.showProductFilter = void 0;
const products_1 = __webpack_require__(6);
const showProductFilter = (productFilter) => {
    if (document.getElementById('show_product_filter').style.display === 'block') {
        document.getElementById('show_product_filter').style.display === 'none';
    }
    document.getElementById('show_product_filter').style.display = 'block';
    var checkboxeOnColor = document.getElementsByName('filter');
    var checkboxeOnSize = document.getElementsByName('size_filter');
    for (var checkbox of checkboxeOnColor) {
        if (checkbox.checked === true) {
            console.log(checkbox.value);
            localStorage.setItem('color', checkbox.value);
        }
    }
    for (var checkbox of checkboxeOnSize) {
        if (checkbox.checked === true) {
            console.log(checkbox.value);
            localStorage.setItem('size', checkbox.value);
        }
    }
    (0, products_1.product)();
};
exports.showProductFilter = showProductFilter;


/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.detailsPage = exports.callApiToGetProductDetails = void 0;
const callApiToGetProductDetails = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:5500/products/details`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ title: localStorage.getItem('title'), price: localStorage.getItem('price') })
    });
    const json = yield response.text();
    const obj = yield JSON.parse(json);
    console.log(obj.description);
    console.log(obj.message);
    return obj;
});
exports.callApiToGetProductDetails = callApiToGetProductDetails;
const detailsPage = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, exports.callApiToGetProductDetails)();
    if (data.description != null) {
        localStorage.removeItem('title');
        localStorage.removeItem('price');
    }
    const details = body.querySelector('.product_details');
    let output = "";
    output += `<div class="product" name="product">
    <img src="${data.image}" width='50%' height="20%" alt="${data.description}">
    <p class="title">${data.title}</p>
    <p class="description">${data.description}</p>
    <p class="price">
       <span>price ${data.price}</span>
    </p><br><br>
 </div>`;
    details.innerHTML = output;
});
exports.detailsPage = detailsPage;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__(0);
/******/ 	var __webpack_exports__ = __webpack_require__(9);
/******/ 	
/******/ })()
;