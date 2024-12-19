
# CNU CourseFinder

This application scrapes course information from [CNU's Schedule of Classes](https://navigator.cnu.edu/StudentScheduleofClasses/) into a FastAPI backend, displaying and filtering through CNU courses dynamically.



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
