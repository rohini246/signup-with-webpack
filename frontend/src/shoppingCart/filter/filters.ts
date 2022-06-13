import { product } from "../products/products";
export const showProductFilter = (productFilter:Element)=>{
  if(document.getElementById('show_product_filter')!.style.display==='block'){
    document.getElementById('show_product_filter')!.style.display==='none'
  }
  document.getElementById('show_product_filter')!.style.display='block';
  var checkboxeOnColor: any = document.getElementsByName('filter');
  var checkboxeOnSize:any = document.getElementsByName('size_filter');
  for (var checkbox of checkboxeOnColor) {
      if (checkbox.checked===true){
          console.log(checkbox.value)
          localStorage.setItem('color',checkbox.value);
      }
  }
  for (var checkbox of checkboxeOnSize) {
    if(checkbox.checked===true){
      console.log(checkbox.value)
      localStorage.setItem('size',checkbox.value);
    }
}
product();
}

