from fastapi import FastAPI, File, UploadFile, HTTPException, Query
from pydantic import BaseModel
import csv
from typing import Dict
from middleware.middleware import add_middleware
from src.data.scraper import scrape_schedules, get_semester_ids
from src.data.database import (db_init,
                               create_table, 
                               insert_courses,
                               create_semesters_table,
                               insert_semester,
                               select_all_courses)

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

classes: Dict[str, Dict[str, Course]] = {}
semesters = dict()

@app.on_event("startup")
async def startup():
    conn = await db_init()
    
    global classes
    global semesters
    classes.clear()
    
    print("\033[95m\033[1mBeginning class data fetching...\033[0m")
    result = scrape_schedules()
    semesters = get_semester_ids()
    
    for semester_id in semesters.keys():
        await create_table(conn, semester_id)
        
    await create_semesters_table(conn)
    
    for semester_id, semester_name in semesters.items():
        await insert_semester(conn, semester_id, semester_name)
    
    for semester, courses in result.items():
        semester_courses = dict()
        curr_semester = []
        for i in courses:
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
            
            semester_courses[str(course.crn)] = course
            curr_semester.append(course)
        classes[semester] = semester_courses
        await insert_courses(conn, semester, curr_semester)
        
    await conn.close()
    print("\033[95m\033[1mData fetching complete\033[0m")

@app.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    global classes
    classes.clear()
    
    content = await file.read()
    decoded = content.decode("utf-8").splitlines()

    reader = csv.reader(decoded, delimiter=",")
    next(reader)
    
    classes['upload'] = []

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

        classes['upload'].append(course)

    print(classes['upload'])
    return {"Message": "CSV data imported", "Courses_Loaded": len(classes)}


@app.get("/course/")
def get_course_by_name(course_name: str = Query(), semester: str = Query()):
    if semester not in classes:
        raise HTTPException(status_code=404, detail="Semester was not found")
    
    found_courses = []
    for i in classes[semester].values():
        if i.course == course_name:
            found_courses.append(i)
    if not found_courses:
        raise HTTPException(status_code=404, detail="Course was not found")
    return found_courses
    

@app.get("/all_courses/")
async def get_all_courses(semester: str = Query()):
    conn = await db_init()
    if semester and (semester not in classes):
        raise HTTPException(status_code=404, detail="Semester not found")
    
    courses = await select_all_courses(conn, semester)
    await conn.close()  
    
    return courses
    

@app.get("/semesters/")
def get_semesters():
    global semesters
    return semesters