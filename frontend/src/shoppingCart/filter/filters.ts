import { product } from "../products/products";
export const showProductFilter = () => {
  const checkboxeOnColor: any = document.getElementsByName('filter');
  const checkboxeOnSize: any = document.getElementsByName('size_filter');

  const arrOfCheckboxeOnColor = Array.prototype.slice.call(checkboxeOnColor);
  const arrOfCheckboxeOnSize = Array.prototype.slice.call(checkboxeOnSize);
 
  const filterBtn = document.querySelector('#filter_btn') as HTMLDivElement;
  filterBtn.addEventListener('click', (e) => { 
    let valuesArrOfColor: string = '';
    let valuesArrOfSize: string = '';
    const arrOfSize = arrOfCheckboxeOnSize.filter(data => data.checked);
    const arr = arrOfCheckboxeOnColor.filter(data => data.checked);
    for (let value of arr) {
      valuesArrOfColor += value.value + " ";
    }
    
    for (let value of arrOfSize) {
      valuesArrOfSize += value.value + " ";
    }
    localStorage.setItem('color', valuesArrOfColor);
    localStorage.setItem('size',valuesArrOfSize);
    product();
  })
  
}
