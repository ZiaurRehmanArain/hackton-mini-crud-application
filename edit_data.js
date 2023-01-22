var product_key = localStorage.getItem("product_Key")
var name1=document.getElementById("name")
// console.log("name"+name1.value)
var desc=document.getElementById("Description")
var quanty=document.getElementById("Quantity")
var price=document.getElementById("price")
var submit=document.getElementById("submit")
// console.log(contact_key)
// var uids = localStorage.getItem("uid")
// var name1= document.getElementById("name")

var btn= document.getElementsByClassName("btn-primary")

firebase.database().ref("product/").child(product_key)
.once("value",(snp)=>{

    console.log(snp.toJSON().name)

    name1.value=snp.toJSON().name
    desc.value= snp.toJSON().description
    quanty.value=snp.toJSON().quantity
    price.value=snp.toJSON().price
    

})

submit.addEventListener("click",async function(){
    event.preventDefault()
    var obj = {
        "name" : name1.value,
        "description":desc.value,
        "Qunatity":quanty.value,
        "price":price.value,
        "product_key": product_key 

    }
   
  await  firebase.database().ref("product/").child(product_key).update(obj)
  console.log('ok')

    window.location.href="admin.html"

})