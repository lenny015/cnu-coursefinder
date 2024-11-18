const API_URL = "http://127.0.0.1:8000";

window.onload = function() {
    // Clear the search bar
    document.querySelector('#courseName').value = '';
    
    // Clear the file input
    document.querySelector('#classes').value = '';
};

async function uploadCSV() {
    const fileInput = document.querySelector('#classes');
    const uploadStatus = document.querySelector('#uploadStatus');

    if (fileInput.isDefaultNamespace.length === 0) {
        uploadStatus.innerText = "Please select a file to upload";
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(`${API_URL}/upload`, {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        if (response.ok) {
            uploadStatus.classList.remove('alert', 'alert-warning', 'alert-danger')
            uploadStatus.classList.add('alert', 'alert-success')
            uploadStatus.innerHTML = `<p>Upload successful: ${result.Courses_Loaded} courses loaded.</p>`;
        } else {
            uploadStatus.classList.remove('alert', 'alert-success', 'alert-danger');
            uploadStatus.classList.add('alert', 'alert-warning')
            uploadStatus.innerHTML = `<p>Error: Upload failed</p>`;
        }
    } catch (error) {
        uploadStatus.classList.remove('alert', 'alert-success', 'alert-warning');
        uploadStatus.classList.add('alert', 'alert-danger')
        uploadStatus.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

async function searchCourse() {
    const courseName = document.querySelector('#courseName').value;
    const courseList = document.querySelector('#coursesListed');
    courseList.innerHTML = "";

    try {
        const response = await fetch(`${API_URL}/course/?course_name=${encodeURIComponent(courseName)}`);
        const courses = await response.json();

        if (response.ok && courses.length > 0) {
            courses.forEach(course => {
                const row = coursesListed.insertRow();
                row.insertCell(0).innerText = course.crn;
                row.insertCell(1).innerText = course.course;
                row.insertCell(2).innerText = course.title;
                row.insertCell(3).innerText = course.hours;
                row.insertCell(4).innerText = course.area;
                row.insertCell(5).innerText = course.type_lecture;
                row.insertCell(6).innerText = course.days;
                row.insertCell(7).innerText = course.time;
                row.insertCell(8).innerText = course.location;
                row.insertCell(9).innerText = course.instructor;
                row.insertCell(10).innerText = course.seats;

                const statusCell = row.insertCell(11);
                statusCell.innerText = course.status;
                if (course.status.toLowerCase() === "open") {
                    statusCell.style.backgroundColor = "green";
                    statusCell.style.fontWeight = "bold";
                    statusCell.style.color = "white";
                } else if (course.status.toLowerCase() === "closed") {
                    statusCell.style.backgroundColor = "red";
                    statusCell.style.fontWeight = "bold";
                    statusCell.style.color = "white";
                } 
            });
        } else {
            row.insertCell(0).innerText = courses.detail || "No courses found with that name.";
            row.colSpan = 12;
        }
    } catch (error) {
        const row = courseTableBody.insertRow();
        row.insertCell(0).innerText = `Error: ${error.message}`;
        row.colSpan = 12;
    }


}