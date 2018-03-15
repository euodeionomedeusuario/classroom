from flask import request, render_template, redirect, session
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash

from classroom import app
from classroom import db


#Redirecionando usuário para a página de login
@app.route("/classroom/login/", methods=["GET"])
def redirect_login():
    return render_template("login/login.html")


#Verificando a autenticação do usuário
@app.route("/classroom/login/", methods=["POST"])
def login():
    email = request.form.get("email")
    password = request.form.get("password")

    user = db.users.find_one( {"email": email} )

    if user:
        if check_password_hash(user["password"], password):
            session["email"] = user["email"]
            session["_id"] = str(user["_id"])
            return redirect("/classroom/")

    error = "E-mail ou senha estão incorretos!"
    return render_template("login/login.html", error=error)


#Redirecionando usuário para a página de signup
@app.route("/classroom/signup/", methods=["GET"])
def redirect_signup():
    return render_template("signup/signup.html")


#Cadastrando um novo usuário
@app.route("/classroom/signup/", methods=["POST"])
def signup():
    name = request.form.get("name")
    email = request.form.get("email")
    password = generate_password_hash(request.form.get("password"))

    db.users.insert_one(
    {
        "name": name,
        "email": email,
        "password": password
    })

    return redirect("/classroom/")

#Logout do sistema
@app.route("/classroom/logout/", methods=["GET"])
def logout():
    session.pop("email", None)
    return redirect("/classroom/login/")
