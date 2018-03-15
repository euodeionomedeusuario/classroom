from flask import session, jsonify, render_template, request

from bson.objectid import ObjectId
from classroom import app
from classroom import db


#respondendo o quiz
@app.route("/quiz/tests/<test_id>/answers/", methods=["POST"])
def send_answer(test_id):
    answers = request.form.getlist("answers[]")
    values = request.form.getlist("values[]")

    test = db.tests.find_one(
           {
                "_id" : ObjectId(test_id)
           })

    user = db.users.find_one(
           {
                "_id" : ObjectId(session["_id"])
           })

    num_questions = len(test["questions"])
    num_correct_questions = 0

    #analisando se a questão está certa
    for answer, value in zip(answers, values):
        for question in test["questions"]:
            if value == str(question["_id"]):
                question["answer"] = answer

                if question["type"] == "trueOrFalse" or question["type"] == "multipleChoice":
                    if question["correctAnswer"] == question["answer"]:
                        num_correct_questions += 1

    grade = num_correct_questions / num_questions * 10

    #salvando resposta no BD
    db.answers.insert({
        "user": user,
        "test": test,
        "grade": grade,
        "attempt": 0
    })

    return "OK"


#Retornando um teste pelo ID
@app.route("/quiz/<class_id>/tests/<test_id>/", methods=["GET"])
def get_test_by_id(class_id, test_id):
    try:
        turma = db.classes.find_one( {"_id": ObjectId(class_id)} )
        test = db.tests.find_one( {"_id": ObjectId(test_id)} )

    except:
        return render_template("errors/404.html"), 404

    #user = db.users.find_one({"_id": ObjectId(session["_id"])})

    #classe = db.classes.find_one( {"_id": ObjectId(turma["_id"]), "participants": {"$in": user}} )

    #if classe == None:
    #    return render_template("errors/403.html"), 403

    answer = db.answers.find_one({"user._id": ObjectId(session["_id"]), "test._id": test["_id"]})

    #num_attempts = test["numAttempts"]

    #if answer:
    #    num_attempts -= answer["attempt"]

    #    if num_attempts == 0:
    #        return render_template("errors/403.html"), 403

    test["_id"] = str(test["_id"])
    test["creator"]["_id"] = str(test["creator"]["_id"])

    questions = []
    for item in test["questions"]:
        if item["_id"]:
            item["_id"] = str(item["_id"])
            item["topic"]["_id"] = str(item["topic"]["_id"])
            item["topic"]["course"]["_id"] = str(item["topic"]["course"]["_id"])
        questions.append(item)

    test["questions"] = questions

    return render_template("tests/answer.html", test=test, num_attempts=1)



@app.route("/classroom/tests/", methods=["GET"])
def get_all_tests():
    result = db.tests.find({"creator._id": ObjectId(session["_id"])})

    tests = []

    for t in result:
        tests.append({"_id": str(t["_id"]), "name": t["name"]})

    return jsonify(tests)
