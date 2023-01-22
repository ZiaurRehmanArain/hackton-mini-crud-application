var data=document.getElementsByTagName("h1")
// console.log(name1[1].innerHTML)
var cont=document.getElementById("row")


var uids=localStorage.getItem("uid")
var name1=localStorage.getItem("name")
var email=localStorage.getItem("email")
firebase.database().ref(`Admin/`).child(uids).once('value',(snp)=>{
    // console.log(snp.toJSON().name)
    name1=data[1].innerHTML+=`   :${snp.toJSON().name}`
    email1=data[2].innerHTML+=`   :${snp.toJSON().email}`
})
// name1=data[1].innerHTML+=`   :${name1}`
//     email1=data[2].innerHTML+=`   :${email}`


//show data


firebase.database().ref("product/").once("value", (snapshot) => {
    console.log(snapshot.toJSON())
    var data = Object.values(snapshot.toJSON())//object to array 
    console.log(data)

    data.map((v, i) => {
        console.log(v)
        cont.innerHTML += `
    <div class="col col-lg-3 col-md-4 col-sm-6 col-12 mt-2 mx-4" style="height:400px">
    <div class="card" >
        <img src=${v.picUrl} class="card-img-top" alt="..." style="width:100%;height:200px">
        <div class="card-body">
       
          <h5 class="card-title">${v.name==""  ?"No title" :v.name  }
          
          </h5>
       
          <p class="card-text">${v.description==""  ?"No description" :v.description  }
          
          </p>
       
          <h5 class="card-title">${v.quantity==""  ?"No quantity" :v.quantity  }
          
          </h5>
          <p class="card-text">${v.price==""  ?"100" :v.price  }</p>
          <button id='${v.product_key}' onclick='edit(this)'>edit</button>
          <button id='${v.product_key}' onclick='del(this)'>delete</button>
        </div>
      </div>
</div>
    `

    })

})

function del(e) {

    var uid = localStorage.getItem("uid")//get current user 
    console.log(uid)//current user uid 
    firebase.database().ref("product/").child(e.id).remove()

    window.location.reload();


}
function edit(data) {
    console.log(data.id)
    localStorage.setItem("product_Key", data.id)
    window.location.href = "edit_data.html"

}