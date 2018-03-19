from flask import session, jsonify, render_template, request

from bson.objectid import ObjectId
from classroom import app
from classroom import db


#enviando uma nova answer
@app.route("/quiz/tests/<test_id>/answers/", methods=["POST"])
def send_answer(test_id):
    #verificando se existir uma resposta anterior
    last_answer = db.answers.find_one({
        "test._id": ObjectId(test_id),
        "user._id": ObjectId(session["_id"])
    })

    if last_answer:
        num_attempts = int(last_answer["numAttempts"]) + 1

        #apagando resposta anterior
        db.answers.remove({"_id": last_answer["_id"]})
    else:
        num_attempts = 1

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

    questions = []

    #analisando se a questão está certa
    for answer, value in zip(answers, values):
        for id in test["questions"]:
            question = db.questions.find_one({"_id": ObjectId(id)})

            if value == str(question["_id"]):
                question["answer"] = answer
                questions.append(question)

                if question["type"] == "trueOrFalse" or question["type"] == "multipleChoice":
                    if question["correctAnswer"] == question["answer"]:
                        num_correct_questions += 1

    grade = num_correct_questions / num_questions * 10

    #salvando resposta no BD
    db.answers.insert({
        "user": user,
        "test": test,
        "grade": grade,
        "numAttempts": num_attempts,
        "answers": questions
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

    user = db.users.find_one({"_id": ObjectId(session["_id"])})

    classe = db.classes.find_one( {"_id": ObjectId(turma["_id"]), "participants": {"$in": [ObjectId(user["_id"])]}} )

    if classe == None:
        return render_template("errors/403.html"), 403

    answer = db.answers.find_one({"user._id": ObjectId(session["_id"]), "test._id": test["_id"]})

    num_attempts = int(test["numAttempts"])

    if answer:
        num_attempts -= int(answer["numAttempts"])

        if num_attempts == 0:
            return render_template("errors/403.html"), 403

    test["_id"] = str(test["_id"])
    test["creator"]["_id"] = str(test["creator"]["_id"])

    questions = []
    for id in test["questions"]:
        item = db.questions.find_one({"_id": ObjectId(id)})

        if item["_id"]:
            item["_id"] = str(item["_id"])
            item["topic"]["_id"] = str(item["topic"]["_id"])
            item["topic"]["course"]["_id"] = str(item["topic"]["course"]["_id"])
        questions.append(item)

    test["questions"] = questions

    return render_template("tests/answer.html", test=test, num_attempts=num_attempts)


#retornando testes criados
@app.route("/classroom/tests/", methods=["GET"])
def get_all_tests():
    result = db.tests.find({"creator._id": ObjectId(session["_id"])})

    tests = []

    for t in result:
        tests.append({"_id": str(t["_id"]), "name": t["name"]})

    return jsonify(tests)
