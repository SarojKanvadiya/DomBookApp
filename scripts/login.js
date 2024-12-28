let form = document.getElementById("form");
form.addEventListener("submit", function(){
    event.preventDefault()
    let email = form.email.value;
    let password = form.password.value;
    let loginObj ={email, password}

    if(email=="admin@empher.com" && password=="empher@123"){
        alert("Logged in as Admin.")
        window.location.href ="admin.html";
    }else if(email=="user@empher.com"){

        if(password =="user@123"){1
            window.location.href ="books.html";
            localStorage.setItem("loginData", JSON.stringify(loginObj))
        }
        else{
            alert("please write a correct password");
        }
    }else{
        alert("your are not allowed to login")
    }
})

// && password == "user@123")