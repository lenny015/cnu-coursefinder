
# CNU CourseFinder

This app fetches course data from a backend that scrapes [CNU's Schedule of Classes](https://navigator.cnu.edu/StudentScheduleofClasses/) to display and filter through CNU courses dynamically.



## Setup (virtual environment recommended)

Install backend dependencies:

```bash
  cd backend
  pip install -r requirements.txt
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

Backend

```bash
cd backend
uvicorn src.main:app --reload
```