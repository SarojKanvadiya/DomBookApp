import { baseUrl } from "./baseUrl.js";

let user = JSON.parse(localStorage.getItem("loginData"));
// console.log(user)
let userArr =[user]

let user1 = userArr.filter((el) => el.email == "user@empher.com")
if (user1.lenght == 0) {
    alert("user Not Logged In");
    window.location.href = "index.html";
}






async function getData() {
    try {
        let res = await fetch(`${baseUrl}/books`)
        let data = await res.json();
        let availableBooks = data.filter((el)=>el.isAvailable == true)
        return availableBooks;
        // console.log(availableBooks);
    }
    catch (err) {

        alert("something went wrond gettin books")
        console.log(err)
    }

}

let availbtn = document.getElementById("availblebooks");
availbtn.addEventListener("click", async function () {
    displayAvailableBooks(arr)

    
})

window.onload = async () => {
    let arr1 = await getData()
    displayAvailableBooks(arr1)
}

function displayAvailableBooks(arr) {
    let cont = document.getElementById("cont");
    cont.innerHTML = "";
    arr.map((el) => {
        let card = document.createElement("div")
        card.className = " card";

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

        let borroebook = document.createElement("button")
        borroebook.textContent ="Borrow Book"

        card.append(title, author, category, status, days,borroebook )

        cont.append(card)

    })


}


// async function loadData() {
//     let arr1 = await getData()
//     displayBooks(arr1)
// }

