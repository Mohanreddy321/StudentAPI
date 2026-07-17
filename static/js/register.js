const API_URL = "http://127.0.0.1:8000/auth/register/";

function registerUser() {

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const message = document.getElementById("message");

    message.style.color = "red";
    message.innerHTML = "";

    // Validation
    if (username === "" || email === "" || password === "" || confirmPassword === "") {

        message.innerHTML = "Please fill all fields.";
        return;

    }

    if (password !== confirmPassword) {

        message.innerHTML = "Passwords do not match.";
        return;

    }

    fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            username: username,
            email: email,
            password: password

        })

    })

    .then(response => {

        if (!response.ok) {

            return response.json().then(data => {

                throw data;

            });

        }

        return response.json();

    })

    .then(() => {

        message.style.color = "green";
        message.innerHTML = "Registration Successful! Redirecting to Login...";

        setTimeout(function () {

            window.location.href = "/auth/login-page/";

        }, 2000);

    })

    .catch(error => {

        console.log(error);

        if (error.username) {

            message.innerHTML = error.username[0];

        }
        else if (error.email) {

            message.innerHTML = error.email[0];

        }
        else if (error.password) {

            message.innerHTML = error.password[0];

        }
        else if (error.detail) {

            message.innerHTML = error.detail;

        }
        else {

            message.innerHTML = "Registration Failed.";

        }

    });

}