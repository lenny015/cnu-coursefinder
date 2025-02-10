
# CNU CourseFinder

A web app that scrapes course information from [CNU's Schedule of Classes](https://navigator.cnu.edu/StudentScheduleofClasses/), and stores data into a PostgreSQL database. Uses a React frontend and FastAPI backend.


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

Rename `.envsample` to `.env`, enter PostgreSQL database information
```
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database_name>
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
