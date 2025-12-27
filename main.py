from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

class Task(BaseModel):
    id: int
    title: str
    completed: bool = False

tasks: List[Task] = []
counter = 1

@app.get("/tasks")
def get_tasks():
    return tasks

@app.post("/tasks")
def add_task(title: str):
    global counter
    task = Task(id=counter, title=title)
    tasks.append(task)
    counter += 1
    return task

@app.put("/tasks/{task_id}")
def toggle_task(task_id: int):
    for task in tasks:
        if task.id == task_id:
            task.completed = not task.completed
            return task
    return {"error": "Task not found"}

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    global tasks
    tasks = [t for t in tasks if t.id != task_id]
    return {"status": "deleted"}