from fastapi import FastAPI, File, UploadFile, HTTPException, Query
from pydantic import BaseModel
import csv
from typing import Dict
from middleware.middleware import add_middleware

app = FastAPI()

add_middleware(app)

class Course(BaseModel):
    crn: int
    course: str
    title: str
    hours: str
    area: str
    type_lecture: str
    days: str
    time: str
    location: str
    instructor: str
    seats: int
    status: str

classes: Dict[int, Course] = {}

@app.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    content = await file.read()
    decoded = content.decode("utf-8").splitlines()

    reader = csv.reader(decoded, delimiter=",")
    next(reader)

    index = 0
    for i in reader:
        course = Course(
            crn = int(i[0]),
            course = i[1],
            title = i[3],
            hours = i[4],
            area = i[5],
            type_lecture = i[6],
            days = i[7],
            time = i[8],
            location = i[9],
            instructor = i[10],
            seats = int(i[11]),
            status = i[12]
            )

        classes[index] = course
        index += 1

    return {"Message": "CSV data imported", "Courses_Loaded": len(classes)}


@app.get("/course/")
def get_course_by_name(course_name: str = Query()):
    found_courses = []
    for i in classes.values():
        if i.course == course_name:
            found_courses.append(i)
    if len(found_courses) == 0:
        raise HTTPException(status_code=404, detail="Course was not found")
    return found_courses
    

@app.get("/all_courses/")
def get_all_courses():
    return list(classes.values())