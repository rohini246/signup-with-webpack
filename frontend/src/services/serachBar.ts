export const search = (input:HTMLInputElement,e:any)=>{
    const term = e.target.value.toLowerCase();
    console.log(term);
    const products = document.querySelectorAll('.product');
    //console.log("search",products);
    var count=0;
    for(var item of products){
       console.log(item);
       var title =  item.getElementsByClassName('title')[0].innerHTML;
       if(title.toLowerCase().indexOf(term)!=-1){
           (<HTMLElement>item).style.display = 'block';
           console.log('show');
       }
       else{
        (<HTMLElement>item).style.display = 'none';
       }
    }
}