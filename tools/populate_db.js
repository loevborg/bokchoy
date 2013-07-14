#!/usr/bin/env node

"use strict"

var fs = require('fs');
var glob = require('glob');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test.db');
var pagedown = require("pagedown");
var converter = new pagedown.Converter();

function parseRecipe(data) {
  data = data.toString("utf8");
  var m = data.match(/^([\s\S]+?)-{3,}([\s\S]*)/m);
  if (!m) {
    res.writeHead(404);
    res.end("Malformed recipe.");
    return;
  }
  var recipe = {};
  recipe["title"] = m[1];
  recipe["body"] = m[2];

  return recipe;
}

function last(array) {
  return array[array.length-1];
}

db.serialize(function() {
 db.run("DELETE FROM recipes");

  glob("data/recipes/*.mkd", function(err,files) {
    files.forEach(function(filename){
      fs.readFile(filename, function(err,data){
        var recipe=parseRecipe(data);
        recipe["filename"] = last(filename.split('/'));;
        db.run("INSERT INTO recipes (title,filename,body) VALUES (?,?,?)",
               recipe["title"], recipe["filename"],
               recipe["body"]); 
      });
    });
  });
});

//db.close();
