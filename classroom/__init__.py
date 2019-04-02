#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os

from flask import Flask, render_template
from flask import render_template, jsonify, request
from bson.objectid import ObjectId
from pymongo import MongoClient
from flask_mail import Mail

#Instaciando objeto Flask
app = Flask(__name__)

app.config.update(
        DEBUG=True,
        #EMAIL SETTINGS
        MAIL_SERVER='smtp.gmail.com',
        MAIL_PORT=465,
        MAIL_USE_SSL=True,
        MAIL_USERNAME = 'lawsclassroom@gmail.com',
        MAIL_PASSWORD = '@lawsclassroom'
        )

mail=Mail(app)

#Instaciando objeto MongoClient
client = MongoClient('mongodb://localhost:27017/')
#Criando instância do BD 'quizdb'
db = client.quizdb

#Configurações da aplicação
app.config["SECRET_KEY"] = "SECRET_KEY"

@app.route("/app/questions/<code>/")
def app_get_question(code):
    result = db.questions.find_one( {"_id": ObjectId(code)} )

    if result["type"] == "multipleChoice":
        question = {
            "_id": str(result["_id"]),
            "title": result["title"],
            "type": result["type"],
            "correctAnswer": result["correctAnswer"],
            "choices": result["choices"]
        }
    else:
        question = {
            "_id": str(result["_id"]),
            "title": result["title"],
            "type": result["type"],
            "correctAnswer": result["correctAnswer"]
        }

    return render_template("questions.html", question=question)

#Importando rotas da aplicação
from classroom.controllers import routes
from classroom.controllers import UserController
from classroom.controllers import ClassController
from classroom.controllers import TaskController
from classroom.controllers import TestController
from classroom.controllers import AnswerController
from classroom.controllers import CourseController
from classroom.controllers import QuestionController
from classroom.controllers import TopicController
from classroom.controllers import WarningController
