/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
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
exports.loginForm = exports.test = void 0;
console.log('in here');
const emailElm = document.querySelector('#email');
const passwordElm = document.querySelector('#password');
exports.test = 'bcjhbdscjsfd';
const loginForm = () => {
    const userLogin = ({
        email: emailElm.value,
        password: passwordElm.value
    });
    if (!userLogin.email || !userLogin.password) {
        alert("Please enter all fields.");
    }
    else {
        callLoginApi(userLogin);
    }
};
exports.loginForm = loginForm;
const callLoginApi = (userLogin) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(userLogin)
    });
    const data = yield res.json();
    alert(data);
    if (data === "Login Successfully.") {
        window.location.href = './homePage.html';
    }
});


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const login_1 = __webpack_require__(1);
document.addEventListener("DOMContentLoaded", function () {
    const login = document.getElementById('#loginSubmit');
    const signup = document.querySelector('.signupSubmit');
    const forgot = document.querySelector('.forgotSubmit');
    console.log('in here');
    console.log(login, login_1.test);
});
// console.log(document);
// console.log(document.getElementById("loginSubmit"));
// login.addEventListener('click',(e:Event)=>{
//     e.preventDefault();
//     loginForm();
// });
// signup.addEventListener('click',(e:Event)=>{
//     e.preventDefault();
//     signupForm();
// });
// forgot.addEventListener('click',(e:Event)=>{
//     e.preventDefault();
//     forgotForm();
// })

})();

/******/ })()
;