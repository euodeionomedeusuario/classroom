#!/usr/bin/env python
# -*- coding: utf-8 -*- 

from flask import session, render_template, redirect

from bson.objectid import ObjectId

from classroom import app
from classroom import db

#Início
@app.route("/classroom/", methods=["GET"])
def index():
    if "email" in session:
        classes = db.classes.find( {"creator.email": session["email"]} )
        my_classes = db.classes.find( {"participants": {"$in": [ObjectId(session["_id"])]}} )


        return render_template("index.html", classes=classes, my_classes=my_classes, user=session["_id"])

    return redirect("/classroom/login/")

@app.route("/classroom/quiz/", methods=["GET"])
def index_quiz():
    if "email" in session:
        created_tests = db.tests.find(
                        {
                            "creator._id" : ObjectId(session["_id"])
                        })

        return render_template("quiz/index.html", created_tests=created_tests)

    return redirect("/classroom/login/")
