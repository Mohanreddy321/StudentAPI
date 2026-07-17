const API_URL = "http://127.0.0.1:8000/auth/login/";

function loginUser() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch(API_URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            username:username,
            password:password
        })
    })

    .then(response=>response.json())

    .then(data=>{

        if(data.access){

            localStorage.setItem("access",data.access);
            localStorage.setItem("refresh",data.refresh);

            window.location.href="/";

        }
        else{

            document.getElementById("message").innerHTML="Invalid Username or Password";
        }

    })

}