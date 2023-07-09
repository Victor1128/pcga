# %%
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer, util
import json


# %%
class Model:
    def __init__(self):
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        self.data, self.train_words, self.emb_train = self.load_data()


    def load_data(self):
        with open('data/train_for_transformer.json') as f:
            data = json.load(f)
        train_words = list(data.keys())
        emb_train = self.model.encode(train_words, batch_size=64, show_progress_bar=True, convert_to_tensor=True)
        return data, train_words, emb_train


    def classify(self, product_names):  # returns a tuple with the predicted category alongside the similarity score(could be considered accuracy)
        emb1 = self.model.encode(product_names)
        similarity = [util.cos_sim(emb, self.emb_train) for emb in emb1]
        return [(self.data[self.train_words[np.argmax(similarity[i])]], max(similarity[i][0]).item()) for i in
                range(len(similarity))]


    def save_json(self, sim_words, products):
        subcategories = {}
        subcategories['other'] = []
        for i in range(len(sim_words)):
            if sim_words[i][1] <= 0.5:
                continue
            if sim_words[i][1] >= 0.7:
                if sim_words[i][0] not in subcategories.keys():
                    subcategories[sim_words[i][0]] = [{'title': products[i]}]
                else:
                    subcategories[sim_words[i][0]].append({'title': products[i]})
            else:
                subcategories['other'].append({'title': products[i]})
            print(i, sim_words[i][0], sim_words[i][1])

        with open('data/categories_correspondance.josn') as f:
            categories_correspondance = json.load(f)

        # %%
        categories_dict = {}
        categories_dict['other'] = []
        for key in subcategories.keys():
            if key == 'other':
                categories_dict[key].append({'title': key, 'products': subcategories[key]})
            else:
                if categories_correspondance[key] not in categories_dict.keys():
                    categories_dict[categories_correspondance[key]] = [{'title': key, 'products': subcategories[key]}]
                else:
                    categories_dict[categories_correspondance[key]].append({'title': key, 'products': subcategories[key]})

        final_json = {'categories': []}
        for key in categories_dict.keys():
            final_json['categories'].append({'title': key, 'subcategories': categories_dict[key]})

        return final_json

    def predict(self, products):
        sim_words = self.classify(products)
        return self.save_json(sim_words, products)
