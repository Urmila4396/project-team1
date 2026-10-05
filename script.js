let students = [];

let attendance = {};


// GET HTML ELEMENTS

const nameInput = document.getElementById("studentName");

const rollInput = document.getElementById("rollNumber");

const addButton =
    document.getElementById("addStudentButton");

const studentTable =
    document.getElementById("studentTable");

const reportTable =
    document.getElementById("reportTable");

const dateInput =
    document.getElementById("attendanceDate");


// SET TODAY'S DATE

let today = new Date();

let date = today.toISOString().split("T")[0];

dateInput.value = date;


// ADD STUDENT BUTTON

addButton.addEventListener("click", function () {

    let name = nameInput.value.trim();

    let roll = rollInput.value.trim();


    if (name === "" || roll === "") {

        alert("Please enter student name and roll number!");

        return;
    }


    // CREATE STUDENT

    let student = {

        id: Date.now(),

        name: name,

        roll: roll

    };


    students.push(student);


    // CLEAR INPUTS

    nameInput.value = "";

    rollInput.value = "";


    // DISPLAY DATA

    displayStudents();

    displayReport();

    updateDashboard();


    alert("Student Added Successfully!");

});


// DISPLAY STUDENTS

function displayStudents() {

    studentTable.innerHTML = "";


    students.forEach(function (student) {

        let row = document.createElement("tr");


        row.innerHTML = `

            <td>${student.roll}</td>

            <td>${student.name}</td>

            <td id="status-${student.id}">
                Not Marked
            </td>

            <td>

                <button
                    class="present"
                    onclick="markAttendance(${student.id}, 'Present')">

                    Present

                </button>


                <button
                    class="absent"
                    onclick="markAttendance(${student.id}, 'Absent')">

                    Absent

                </button>

            </td>

        `;


        studentTable.appendChild(row);

    });

}


// MARK ATTENDANCE

function markAttendance(id, status) {

    let selectedDate = dateInput.value;


    if (selectedDate === "") {

        alert("Please select a date!");

        return;
    }


    if (!attendance[selectedDate]) {

        attendance[selectedDate] = {};

    }


    attendance[selectedDate][id] = status;


    let statusCell =
        document.getElementById("status-" + id);


    statusCell.innerText = status;


    if (status === "Present") {

        statusCell.style.color = "green";

        statusCell.style.fontWeight = "bold";

    } else {

        statusCell.style.color = "red";

        statusCell.style.fontWeight = "bold";

    }


    updateDashboard();

    displayReport();

}


// UPDATE DASHBOARD

function updateDashboard() {

    let selectedDate = dateInput.value;


    let present = 0;

    let absent = 0;


    if (attendance[selectedDate]) {

        students.forEach(function (student) {

            if (
                attendance[selectedDate][student.id]
                === "Present"
            ) {

                present++;

            }


            if (
                attendance[selectedDate][student.id]
                === "Absent"
            ) {

                absent++;

            }

        });

    }


    let percentage = 0;


    if (students.length > 0) {

        percentage =
            (present / students.length) * 100;

    }


    document.getElementById("totalStudents")
        .innerText = students.length;


    document.getElementById("presentCount")
        .innerText = present;


    document.getElementById("absentCount")
        .innerText = absent;


    document.getElementById("attendanceRate")
        .innerText = percentage.toFixed(1) + "%";

}


// ATTENDANCE REPORT

function displayReport() {

    reportTable.innerHTML = "";


    students.forEach(function (student) {

        let present = 0;

        let absent = 0;


        for (let date in attendance) {

            if (
                attendance[date][student.id]
                === "Present"
            ) {

                present++;

            }


            if (
                attendance[date][student.id]
                === "Absent"
            ) {

                absent++;

            }

        }


        let total = present + absent;


        let percentage = 0;


        if (total > 0) {

            percentage =
                (present / total) * 100;

        }


        let row = document.createElement("tr");


        row.innerHTML = `

            <td>${student.roll}</td>

            <td>${student.name}</td>

            <td>${present}</td>

            <td>${absent}</td>

            <td>${percentage.toFixed(1)}%</td>

        `;


        reportTable.appendChild(row);

    });

}


// DATE CHANGE

dateInput.addEventListener("change", function () {

    displayStudents();

    updateDashboard();

});


// TEST MESSAGE

console.log(
    "Smart Attendance System JavaScript is working!"
);
