from flask import session, render_template, redirect

from classroom import app
from classroom import db

#Início
@app.route("/classroom/", methods=["GET"])
def index():
    if "email" in session:
        classes = db.classes.find( {"creator.email": session["email"]} )
        my_classes = db.classes.find( {"participants": {"$in": [session["email"]]}} )


        return render_template("index.html", classes=classes, my_classes=my_classes, user=session["_id"])

    return redirect("/classroom/login/")
