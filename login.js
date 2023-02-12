var email=document.getElementById('email')
var password=document.getElementById('Password')
var role=document.getElementById('Role')

var logs=document.getElementById('login')



logs.addEventListener("click",async function(){
    event.preventDefault()
   await firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then(async (user) => {
    
      console.log("start")
    localStorage.setItem("uid",user.user.uid)
    var uids=localStorage.getItem("uid")
console.log(uids)
//  console.log("login")
 if(role.value=="user"){
  await firebase.database().ref("User/").child(uids).once("value",(snp)=>{
    window.location.href='show.html'
        console.log(snp.toJSON().name)
    
    })
    
 }else if(role.value=='admin'){
   await firebase.database().ref("Admin/").child(uids)
    .once("value",(snp)=>{
    
        console.log(snp.toJSON().name)
        
    window.location.href='admin.html'
    // document.ready(window.setTimeout(location.href = "admin.html",5));

    
    })
    
 }else{
    alert('sorry')
 }
 alert('login sucees fully')



  })
  .catch((error) => {
    console.log(error.message)

  });
})