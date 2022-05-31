import nodemailer from 'nodemailer';
var tranporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:'shoppingcart158@gmail.com',
      pass:'ShoppingCart1234@'
    }
});

export const forgotMail = ()=>{
  var mailOptions = {
    from:'shoppingcart158@gmail.com',
    to: 'forgotDataObj.to',
    subject: 'forgotDataObj.subject',
    text: 'forgotDataObj.text',
  }  
tranporter.sendMail(mailOptions, function(error:any,info:any){
        if(error){
          console.log(error)
        }
        else{
          console.log('mail sent');
        }
  })

}  
  