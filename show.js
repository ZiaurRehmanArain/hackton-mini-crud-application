var data = document.getElementsByTagName("h1")
// console.log(name1[1].innerHTML)

var uids = localStorage.getItem("uid")
var cont = document.getElementById("row")

firebase.database().ref(`User/`).child(uids).once('value', (snp) => {
    // console.log(snp.toJSON().name)
    name1 = data[1].innerHTML += `   :${snp.toJSON().name}`
    email1 = data[2].innerHTML += `   :${snp.toJSON().email}`
})


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
       
        <h5 class="card-title">${v.name == "" ? "No title" : v.name}
          
        </h5>
     
        <p class="card-text">${v.description == "" ? "No description" : v.description}
        
        </p>
     
        <h5 class="card-title">${v.quantity == "" ? "No quantity" : v.quantity}
        
        </h5>
        <p class="card-text">${v.price == "" ? "100" : v.price}</p>
        <a href="#" id='${v.product_key}' onclick='orderset(this)' class="btn btn-primary">Order</a>
        </div>
      </div>
</div>
    `

    })

})
async function orderset(e) {
    console.log(e.id)


    var uids = localStorage.getItem('uid')
    var check = false;
    await firebase.database().ref('orders').once('value', (snp) => {
        console.log(snp.toJSON())
        if (snp.toJSON() != null) {
            var value = Object.values(snp.toJSON())
            console.log(value)
            for (var a = 0; a < value.length; a++) {
                if (value[a].product_key == e.id) {
                    if (uids == value[a].User_id) {
                        check = true
                        break
                    } else {
                        check = false
                    }

                }
            }
        }
    })
    if (check) {
        alert('already order is exist')
    } else {

        var db = firebase.database()

        var orderkey = db.ref('orders/').push().getKey();
        console.log(orderkey)
        await db.ref('product/').child(e.id).once('value', async (snp) => {
            console.log(snp.toJSON())
            var data = snp.toJSON()
            console.log(data)
            await db.ref('orders/').child(orderkey).set({

                User_id: uids,
                description: data.description,
                name: data.name,
                picUrl: data.picUrl,
                price: data.price,
                product_key: data.product_key,
                orderkey: orderkey,
                status: 'order'


            })
            console.log('ok')
            await db.ref('User/').child(`${uids}`).child('Myorders').child(orderkey).set({
                User_id: uids,
                description: data.description,
                name: data.name,
                picUrl: data.picUrl,
                price: data.price,
                status: 'order'
            })

        })
    }
}

