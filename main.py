from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, this is FastAPI AI Audit API"}

@app.get("/test")
def test():
    return {"message": "API is working!"}

