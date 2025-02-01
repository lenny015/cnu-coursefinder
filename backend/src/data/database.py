import os
import asyncpg
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

async def db_init():
    return await asyncpg.connect(DATABASE_URL)

async def create_table(conn, semester_id):
    await conn.execute(f'''
        CREATE TABLE IF NOT EXISTS courses_{semester_id} (
            crn INTEGER PRIMARY KEY,
            course TEXT,
            title TEXT,
            hours TEXT,
            area TEXT,
            type_lecture TEXT,
            days TEXT,
            time TEXT,
            location TEXT,
            instructor TEXT,
            seats INTEGER,
            status TEXT
        )
    ''')
    
async def insert_courses(conn, semester_id, courses):
    values = []
    
    for course in courses:
        values.append((
            course.crn,
            course.course,
            course.title,
            course.hours,
            course.area,
            course.type_lecture,
            course.days,
            course.time,
            course.location,
            course.instructor,
            course.seats,
            course.status
        ))
        
    await conn.executemany(f"""
        INSERT INTO courses_{semester_id} (
            crn, course, title, hours, area, type_lecture,
            days, time, location, instructor, seats, status
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 
        ) on CONFLICT (crn)
        DO UPDATE SET
            course = EXCLUDED.course,
            title = EXCLUDED.title,
            hours = EXCLUDED.hours,
            area = EXCLUDED.area,
            type_lecture = EXCLUDED.type_lecture,
            days = EXCLUDED.days,
            time = EXCLUDED.time,
            location = EXCLUDED.location,
            instructor = EXCLUDED.instructor,
            seats = EXCLUDED.seats,
            status = EXCLUDED.status
                           """, values)