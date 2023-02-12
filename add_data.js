var name1=document.getElementById("name")
var desc=document.getElementById("Description")
var quanty=document.getElementById("Quantity")
var fil=document.getElementById("files")
var upload=document.getElementById("upload")
var progress1=document.getElementById("progress1")
var submit=document.getElementById("submit")
var price=document.getElementById("price")
var pic_url=""

fil.addEventListener("click",function(){
    fil.onchange = e =>{
        files = e.target.files;
        reader = new FileReader();

        reader.onload = function(){           
        }
        reader.readAsDataURL(files[0])
        console.log(files[0])

       
    }
    
})


upload.addEventListener("click",function (){
    event.preventDefault()
    console.log(files[0])
    var strg = firebase.storage().ref()

    var uploadTask = strg.child(`images/${files[0].name}`)
    .put(files[0])

    uploadTask.on('state_changed', 
      (snapshot) => {
      
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progress1.style.display="inline"
        progress1.innerText=`Progress : ${progress}`
        // console.log('Upload is ' + progress + '% done');

        if(progress==0){
            progress1.innerText="Start upload"
        //   alert("Upload Process Star\n Plz Wait For Upload Image In Data Base")
        }
        if(progress<25){
            progress1.innerText=`Progress : ${progress.toFixed(2)}% `
        }
        if(progress<50){
            progress1.innerText=`Progress : ${progress.toFixed(2)}%`
        }
        if(progress<75){
            progress1.innerText=`Progress : ${progress.toFixed(2)}%`
        }

        if(progress==100){
            progress1.innerText="complete"
        }
        
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            pic_url =   downloadURL;
          console.log('File available at', downloadURL);
        });
      }
    );

    })
    submit.addEventListener("click",async function(){
        event.preventDefault()
        var key = firebase.database().ref("product/").push().getKey()
    
        var obj = {
            name:name1.value,
            description:desc.value,
            price:price.value,
            quantity:quanty.value,
            picUrl :pic_url,
            product_key : key
    
        }
    console.log("ok")
      await   firebase.database().ref("product/").child(key).set(obj)
      console.log('end')
      // window.location.href='admin.html'
      window.location.href='admin.html'
    })
    