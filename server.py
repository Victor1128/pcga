import json

import flask as fl
import openai
from model import Model
from flask import request
from time import sleep

app = fl.Flask("platformGenerator")

"""
// {
// url: ...,
// name: ...,
// field: ...,
// categories: [
//   {
//     name: ...,
//     subcategories:
//     [name: ...,
//       products: [
//         {
//           title: ...,
//           image: ...
//         }
//       ]
//     ]
//   }
// ]
"""


def generateImage(description):
    # generate photo from text
    response = openai.Image.create(
        prompt=description,
        n=1,
        size="256x256"
    )
    return response['data'][0]['url']


def getName(website):
    return general[website]['company_name']


def getField(website):
    return "field"


def getModelAnswer(website):
    products = general[website]['products']
    return model.predict(products)


def getCategories(website):
    answer = getModelAnswer(website)
    # generate image for each product
    for category in answer:
        for subcategory in category['subcategories']:
            for product in subcategory['products']:
                product['image'] = generateImage(product['title'])


# get method with one parameter
@app.route("/post/", methods=['POST'])
def post():
    website = request.args.get("url")
    answer = {
        "url": "https://www." + website,
        "name": getName(website),
        "field": getField(website),
        "categories": getCategories(website)
    }
    return answer


# start the server
openai.api_key = "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"
# read the data
with open('./data/products2.json') as f:
    products = json.load(f)
print('products loaded')
with open('./data/general2.json') as f:
    general = json.load(f)
print('general loaded')
sleep(2)
model = Model()
print('model loaded')

app.run(host="127.0.0.1", port=5000)
