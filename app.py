#!/usr/bin/env python3
"""
jokes api
"""

import json
import random
from typing import List

import requests
from faker import Faker
from flask import Flask, Response, jsonify
from flask_cors import cross_origin
import pyjokes


app = Flask(_name_)

@app.route("/api/v1/jokes/<language>/<category>/<int:number>")
def get_jokes(language, category, number):
    if number == 1:
        singleJoke = pyjokes.get_joke(language=language, category=category)
        resp = jsonify(data=singleJoke)
    else:
        jokes = []
        allJokes = pyjokes.get_jokes(language=language, category=category)
        if number < len(allJokes):

            while len(jokes) != number:
                jokes.append(random.choice(allJokes))
        else:
            #404 error
            print()
        
        resp = jsonify(data=jokes)
    

    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Content-Type"] = "application/json"


    return resp

@app.route("/api/v1/jokes/<language>/<category>/<int:number>/<int:joke_id>")
def get_jokeById(language, category, number, joke_id):
    if number == 1:

        singleJoke = pyjokes.get_jokes(language=language, category=category)
        if 0 <= joke_id < len(singleJoke):
            jokes = []
            jokes.append(singleJoke[joke_id])

        resp = jsonify(data=jokes)
        
    else:
        #throw 404 error
        print()
    

    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Content-Type"] = "application/json"


    return resp


if _name_ == "_main_":
    app.run(debug=True)
