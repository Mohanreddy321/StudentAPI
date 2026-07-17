const token = localStorage.getItem("access");
if (!token) {
    window.location.href = "/auth/login-page/";
}

const API_URL = "http://127.0.0.1:8000/api/students/";

function getCookie(name) {
    let cookieValue = null;

    if (document.cookie && document.cookie !== "") {

        const cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {

            const cookie = cookies[i].trim();

            if (cookie.startsWith(name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }

    return cookieValue;
}

let editId = null;

// Load students when page loads
window.onload = function () {
    loadStudents();
};

// =================== LOAD STUDENTS ===================

function loadStudents() {

    fetch(API_URL, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(response => {

        if (!response.ok) {
            throw new Error("Unable to Load Students");
        }

        return response.json();

    })
    .then(data => {

        let table = document.getElementById("studentTable");
        table.innerHTML = "";

        const count = document.getElementById("studentCount");
        if (count) {
            count.innerText = "Total Students : " + data.length;
        }

        data.forEach(student => {

            table.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.course}</td>
                <td>${student.email}</td>
                <td>

                    <button class="edit-btn"
                    onclick="editStudent(${student.id}, '${student.name}', ${student.age}, '${student.course}', '${student.email}')">
                    Edit
                    </button>

                    <button class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                    </button>

                </td>
            </tr>
            `;
        });

    })
    .catch(error => {

        console.log(error);
        alert(error.message);

    });

}

// =================== ADD / UPDATE ===================

function addStudent() {

    let student = {

        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        course: document.getElementById("course").value,
        email: document.getElementById("email").value

    };

    // ADD
    if (editId == null) {

        fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",
                "Authorization": "Bearer " + token

            },

            body: JSON.stringify(student)

        })

        .then(response => {

            if (!response.ok) {
                throw new Error("Unable to Add Student");
            }

            return response.json();

        })

        .then(() => {

            alert("Student Added Successfully");

            clearForm();

            loadStudents();

        })

        .catch(error => {

            console.log(error);
            alert(error.message);

        });

    }

    // UPDATE
    else {

        fetch(API_URL + editId + "/", {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
                "X-CSRFToken": getCookie("csrftoken")

            },

            body: JSON.stringify(student)

        })

        .then(response => {

            if (!response.ok) {
                throw new Error("Unable to Update Student");
            }

            return response.json();

        })

        .then(() => {

            alert("Student Updated Successfully");

            clearForm();

            loadStudents();

        })

        .catch(error => {

            console.log(error);
            alert(error.message);

        });

    }

}

// =================== DELETE ===================

function deleteStudent(id) {

    if (!confirm("Are you sure you want to delete this student?")) {
        return;
    }

    fetch(API_URL + id + "/", {

        method: "DELETE",

        headers: {

            "Authorization": "Bearer " + token

        }

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Unable to Delete Student");
        }

        alert("Student Deleted Successfully");

        loadStudents();

    })

    .catch(error => {

        console.log(error);
        alert(error.message);

    });

}

// =================== EDIT ===================

function editStudent(id, name, age, course, email) {

    editId = id;

    document.getElementById("name").value = name;
    document.getElementById("age").value = age;
    document.getElementById("course").value = course;
    document.getElementById("email").value = email;

    document.getElementById("addBtn").innerText = "Update Student";

}

// =================== CLEAR ===================

function clearForm() {

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("course").value = "";
    document.getElementById("email").value = "";

    editId = null;

    document.getElementById("addBtn").innerText = "Add Student";

}

// =================== LOGOUT ===================

function logoutUser() {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    window.location.href = "/auth/login-page/";

}