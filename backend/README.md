## Getting Started

This API will automatically scrape course schedules on startup. No additional setup is required. The API supports all of the semesters on the Schedule of Classes site and allows manual CSV uploads.

## API Endpoints

| Method | URL | Description | Parameters |
|--------|-------|------------|------------|
|`POST`|`/upload/`| Uploads course data using a CSV file |File (.csv format)|
|`GET`|`/course/`| Gets a course by name and semester ID |`course_name`, `semester`|
|`GET`|`/all courses/`| Get all courses for a specific semester |`semester`|
|`GET`|`/semesters/`| Gets all semesters, including their semester ID and name |None|


## Data Models

### Course

|Field|Type|Description|
|----|----|----|
| crn | int | Course Reference Number | 
| course | str | Course Code |
| title | str | Course Title |
| hours | str | Credit Hours |
| area | str | Area of Interest | 
| type_lecture | str | Lecturing Style |
| days | str | Meeting Days |
| time | str | Meeting Time |
| location | str | Class Location |
| instructor | str | Instructor Name |
| seats | int | Available Seats |
| status | str | Course Status |

## Endpoint Use Cases

### Uploading ScheduleofClasses.csv
```http 
POST /upload
content-type: multipart/form-data
```

**Response:**
```json
{
    "Message": "CSV data imported",
    "Courses_Loaded": <number_of_courses>
}
```

### Get Course by Name
```http
GET /course/?coursename={course_name}&semester={semester_id}
```

**Response:**
```json
[
    {
        "crn": 9214,
        "course": "CPSC 250",
        "title": "Progrmng for Data Manipulation",
        "hours": "3",
        "area": "",
        "type_lecture": "Lec",
        "days": "TR",
        "time": "1800-1915",
        "location": "LUTR 236",
        "instructor": "Conner, David",
        "seats": 10,
        "status": "Open"
    }

    // ... other course results with same structure
]
```

### Get Semesters
```http
GET /semesters/
```

**Response:**
```json
{
  "202300": "Fall Semester 2022",
  "202310": "Spring Semester 2023",
  "202320": "May Term 2023",
  "202331": "Summer Term I 2023",
  "202332": "Summer Term II 2023",
  "202400": "Fall Semester 2023",
  "202410": "Spring Semester 2024",
  "202420": "May Term 2024",
  "202431": "Summer Term 1 2024",
  "202432": "Summer Term II 2024",
  "202500": "Fall Semester 2024",
  "202510": "Spring Semester 2025",
  "202520": "May Term 2025",
  "202531": "Summer Term I 2025",
  "202532": "Summer Term II 2025"
}
```

