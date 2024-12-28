import { baseUrl } from "./baseUrl.js";

let user = JSON.parse(localStorage.getItem("loginData"));
console.log(user)
let userArr =[user]
let adminuser =userArr.filter((el)=>el.email =="admin@empher.com")
if(adminuser.length==0){
       alert("Admin Not Logged In");
    window.location.href ="index.html";
}

let form = document.getElementById("form");
form.addEventListener("submit", function(){
    event.preventDefault()
    let imageUrl =form.image.value;
    let title = form.title.value;
    let author = form.author.value;
    let category = form.category.value;
    let bookObj = {title, author, category, isAvailable: true, isVerified: false,borrowedDays: null, imageUrl}
    console.log(bookObj)

    fetch(`${baseUrl}/books`,{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(bookObj)
    }).then(()=>{
        alert("Book Added Successfully.")
        form.reset()
    }).catch((err)=>{
        alert("something went wrong")
        console.log(err)
    })
})

async function getData() {
    try{
let res = await fetch(`${baseUrl}/books`)
let data = await res.json();
return data;
// console.log(data)
    }
    catch(err){
       
                    alert("something went wrond gettin books")
                    console.log(err)
    }

}

window.onload=async()=>{
   let arr1 = await getData()
   displayBooks(arr1)
}

function displayBooks(arr){
    let cont = document.getElementById("cont");
    cont.innerHTML ="";
    arr.map((el)=>{
        let card = document.createElement("div")
        card.className =" card";
    
        let title = document.createElement("h4")
        title.textContent = `Title: ${el.title}`

        let author = document.createElement("h4");
        author.textContent = `Author: ${el.author}`;
        
        let category = document.createElement("h4");
        category.textContent = `Category: ${el.category}`;

        let status = document.createElement("h4");
        status.textContent = ` Availability Status: ${el.isAvailable}`;

        let days = document.createElement("h4");
        days.textContent = `Borrowed Days: ${el.borrowedDays}`

        let verifyBtn = document.createElement("button")
        verifyBtn.textContent = "Verify Book";
        verifyBtn.addEventListener("click", function(){

            alert("Are you sure to Verify..?")
            verifyFn(el);
            if(el.isVerified==true){
                verifyBtn.disabled = true;
            }
            
            
        })

        let deleteBtn = document.createElement("button")
        deleteBtn.textContent = "Delete Book";
        deleteBtn.addEventListener("click", function(){
            alert("Are you sure to Delete..?")
            deleteFn(el)
        })


 card.append(title,author,category,status,days, verifyBtn, deleteBtn)
 
 cont.append(card)
        
    })

    
}


async function loadData() {
    let arr1 = await getData()
   displayBooks(arr1)
}

function verifyFn(el){
    let verifyObj = {...el,isVerified:!el.isVerified}

    
        fetch(`${baseUrl}/books/${el.id}`,{
            method:"PATCH",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(verifyObj)
        }).then(()=>{
            alert("book verified")
          
            loadData();
        }).catch((err)=>{
            alert("something went wrong")
            console.log(err)
        })
    

}
function deleteFn(el){
    fetch(`${baseUrl}/books/${el.id}`,{
        method:"DELETE"
    }).then(()=>{
alert("Book deleted")
loadData();

    })
}