from flask import render_template, redirect, request, jsonify
from bson.objectid import ObjectId

from classroom import app
from classroom import db

#vendo os detalhes da reposta
@app.route("/classroom/classes/<class_id>/warnings/", methods=["POST"])
def create_warning(class_id):
    title = request.form.get("title")
    description = request.form.get("description")
    created_at = request.form.get("created_at")

    classe = db.classes.find_one({"_id": ObjectId(class_id)})

    db.warnings.insert({
        "title": title,
        "description": description,
        "class": classe,
        "created_at": created_at,
    })

    return "OK"
