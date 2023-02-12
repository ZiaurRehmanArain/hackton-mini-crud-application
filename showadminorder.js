console.log(firebase.database())
var cont = document.getElementById("row")
var uids=localStorage.getItem('uid')
console.log(uids)
var table=document.getElementById('tables')
// firebase.database().ref('orders/').once("value", (snapshot) => {
//     console.log(snapshot.toJSON())
//     var data = Object.values(snapshot.toJSON())//object to array 
//     console.log(data)

//     data.map((v, i) => {
//         console.log(v)
//         cont.innerHTML += `
//     <div class="col col-lg-3 col-md-4 col-sm-6 col-12 mt-2 mx-4" style="height:400px">
//     <div class="card" >
//         <img src=${v.picUrl} class="card-img-top" alt="..." style="width:100%;height:200px">
//         <div class="card-body">
       
//         <h5 class="card-title">${v.name == "" ? "No title" : v.name}
          
//         </h5>
     
//         <p class="card-text">${v.status}
        
//         </p>
     
        
//         </h5>
//         <p class="card-text">${v.price == "" ? "100" : v.price}</p>
//         <a href="#" class="btn btn-primary">Order</a>
//         </div>
//       </div>
// </div>
//     `

//     })

// })

firebase.database().ref('orders').once('value',(snp)=>{
    console.log(snp.toJSON())
var data=Object.values(snp.toJSON())
data.map((v,i)=>{
    table.innerHTML+=`
    <tr style='border:2px black solid'>
  <td>${v.name}</td>
  <td>${v.price}</td>
  <td>${v.description}</td>
  <td><img width='100px' src='${v.picUrl}'></td>
  <td id=${v.User_id}>${v.status}
  <select id='${v.orderkey}' onChange='chg(this)'>
  <option  value="" selected disabled>select order</option>
  <option value="order">order</option>
  <option value="accept">accept</option>
  <option value="pending">pending</option>
  <option value="delivered">delivered</option>
</select>
  
  
  </td>
</tr>

    
    `

})

})


async function chg(e){
console.log(e.id)
console.log(e.value)
console.log(e.parentNode.id)

await firebase.database().ref('orders/').child(e.id).update({
    status:e.value
})
await firebase.database().ref("User/").child(e.parentNode.id).child("Myorders").child(e.id).update({
    status:e.value
})


window.location.reload()
}