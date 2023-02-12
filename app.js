// console.log(firebase.auth())
var name1=document.getElementById('name')
var email=document.getElementById('email')
var password=document.getElementById('Password')
var role=document.getElementById('Role')
var btn=document.getElementById('submit')
var logs=document.getElementById('login')
var flogs=document.getElementById('flogin')


btn.addEventListener("click",async function(){
    event.preventDefault()
    // console.log(name1.value)
    // console.log(email.value)
    // console.log(password.value)
    console.log(role.value)
   await firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
  .then(async (user) => {
   console.log("ok")

if(role.value=='user'){
    obj={
    email:email.value,
    name:name1.value,
    password:password.value,
    role:role.value,
    user_id:user.user.uid,
    }
    await firebase.database().ref("User/").child(`${user.user.uid}`).set(obj)
   console.log("user")

}else if(role.value=='admin'){
    obj={
        email:email.value,
        name:name1.value,
        password:password.value,
        role:role.value,
    user_id:user.user.uid,

        }
    
   await firebase.database().ref("Admin/").child(`${user.user.uid}`).set(obj)
   console.log("admin")

}else{
    alert ("sorry enter right value")
}

console.log("clear")
alert("suceess fully register")
window.location.href='login.html'
  })
  .catch((error) => {
   console.log(error.message)
    // ..
  });


})

logs.addEventListener("click",function(){
    // window.location.href('login.html')
    event.preventDefault()
    console.log('ok')
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
  .signInWithPopup(provider).then((user)=>{
    console.log(user.user.displayName)
  }).catch((e)=>{
    console.log(e.message)
  })

})

flogs.addEventListener("click",function(){
    // window.location.href('login.html')
    event.preventDefault()
    console.log('ok')
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth()
  .signInWithPopup(provider).then((user)=>{
    console.log(user)
  }).catch((e)=>{
    console.log(e.message)
  })

})



// log.addEventListener("click",function(){
//     event.preventDefault()
//     firebase.auth().signInWithEmailAndPassword(email.value, password.value)
//   .then((user) => {
//     localStorage.setItem("uid",user.user.uid)
//  console.log("login")
//   })
//   .catch((error) => {
//     console.log(error.message)

//   });
// })





