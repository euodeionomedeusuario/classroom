from flask import Flask
from pymongo import MongoClient

#Instaciando objeto Flask
app = Flask(__name__)
#Instaciando objeto MongoClient

client = MongoClient('mongodb://localhost:27017/')
#Criando instância do BD 'quizdb'
db = client.quizdb

#Configurações da aplicação
app.config["SECRET_KEY"] = "SECRET_KEY"

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
