
# CNU CourseFinder

A web app that scrapes course information from [CNU's Schedule of Classes](https://navigator.cnu.edu/StudentScheduleofClasses/) to a FastAPI backend. Uses a React.js frontend to filter courses and create schedules.


## Setup (virtual environment recommended)

Install backend dependencies:

```bash
cd backend
python -m pip install -r requirements.txt
```

Install frontend dependencies:

```bash
cd frontend
npm install
```



## Running application

Frontend:

```bash
cd frontend
npm run dev
```

Backend:

```bash
cd backend
python -m uvicorn src.main:app --reload
```
