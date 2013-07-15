#!/usr/bin/env python

import json

DIR = "tmp"

# Takes as input a single markdown document containing one or more
# recipes, separated by headings, and writes each recipe in
# a separate markdown file.

class RecipeFinder:
    def __init__(self):
        self.count = 0

    def strip_whitespace(self,lines):
        # remove all-whitespace lines at the beginning

        while len(lines) > 0:
            if lines[0].strip() != "":
                break
            else:
                lines = lines[1:] # remove line

        # remove all-whitespace lines at the end

        while len(lines) > 0:
            if lines[-1].strip() != "":
                break
            else:
                lines = lines[:-1] # remove line

        return lines

    def process_recipe(self,lines):
        if len(lines) <= 2:
            return

        title = lines[0].strip()
        body = self.strip_whitespace(lines[1:])
        body = "".join(body)

        RECIPES.append({"title":title, "body":body})

        self.count += 1

    def find_recipes(self,lines):
        n = 0
        recipe = []

        for l in lines:
            if l.startswith("----") or l.startswith("****"):
                if n >= 1:
                    self.process_recipe(recipe[:-1])
                    recipe = [recipe[-1]]
                n += 1
            else:
                recipe.append(l)

        self.process_recipe(recipe[:-1])

lines = open("data/recipes.txt","r").readlines()

RECIPES = []
finder = RecipeFinder()
finder.find_recipes(lines)

print json.dumps(RECIPES)
