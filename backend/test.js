var foodArray = ["orange", "orange", "salami", "salmon", "kale", "banana", "orange", "orange", "salami", "salmon", "kale", "banana"];
// for(let food of foodArray){
//     console.log(food)
// }
// foodArray.forEach((a,b)=>console.log(a,b));
// const present = foodArray.filter(food=>food==='orange');
// console.log(present);
//map
// const newArray= foodArray.map(food=>food+='hey');
// console.log(newArray);
//reduce
// const array = newArray.reduce(food=>food+=food);
// console.log(array);
//some
// const present= foodArray.some(food=>food==="banana");
// console.log(present);
// const present= foodArray.every(food=>food===null);
// console.log(present);
foodArray.forEach(function (obj, food) {
    if (obj[food]) {
        console.log(obj[food]);
    }
});
