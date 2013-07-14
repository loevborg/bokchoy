#!/bin/bash

set -e

if [ ! -e data/recipes.txt ]; then
    echo Run in project run.
    exit 1
fi

if [ ! -d tmp ]; then
    mkdir tmp
else
    rm -f "tmp/recipe*.mkd"
fi

echo 'DROP TABLE IF EXISTS recipes; CREATE TABLE recipes (id integer primary key, title text, filename text, body text);' | sqlite3 data/recipes.db

python tools/explode.py
nodejs tools/populate_db.js
