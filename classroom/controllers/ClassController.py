from flask import request, session, render_template
from bson.objectid import ObjectId

from classroom import app
from classroom import db


@app.route("/classroom/user/<user_id>/classes/<class_id>/", methods=["GET"])
def get_index_student(class_id, user_id):
    classe = db.classes.find_one({"_id": ObjectId(class_id)})
    tasks = db.tasks.find( {"class._id": classe["_id"]} )
    user = db.users.find_one({"_id": ObjectId(session["_id"])})

    return render_template("classes/student.html", c=classe, tasks=tasks, user=user)

#Criando uma nova turma
@app.route("/classroom/classes/", methods=["POST"])
def create_class():
    name = request.form.get("name")
    description = request.form.get("description")
    creator = db.users.find_one( {"email": session["email"]} )
    participants = []

    db.classes.insert( {
        "name": name,
        "description": description,
        "creator": creator,
        "participants": participants
    } )

    return "OK"

@app.route("/classroom/classes/<class_id>/", methods=["GET"])
def get_class(class_id):
    c = db.classes.find_one( {"_id": ObjectId(class_id)} )
    tasks = db.tasks.find( {"class._id": c["_id"]} )

    return render_template("classes/index.html", c=c, tasks=tasks)


@app.route("/classroom/classes/<class_id>/", methods=["DELETE"])
def delete_class(class_id):
    db.classes.remove({"_id": ObjectId(class_id)})

    return "OK"

@app.route("/classroom/classes/<class_id>/", methods=["PUT"])
def update_class(class_id):
    name = request.form.get("name")
    description = request.form.get("description")

    db.classes.update({"_id": ObjectId(class_id)}, {"$set": {"name": name, "description": description}})

    return "OK"

@app.route("/classroom/classes/<class_id>/participants/", methods=["PUT"])
def add_participant(class_id):
    email = request.form.get("email")

    db.classes.update({"_id": ObjectId(class_id)}, {"$addToSet": {"participants": email}})

    return "OK"
