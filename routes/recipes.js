fs = require("fs");
db = require("../db").db;
pagedown = require("pagedown");
var converter = new pagedown.Converter();

function pad(n, width, z) {
    n = n.toString();
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

/*
 * GET recipes
 */

exports.view = function(req, res){
    id = req.params.id;

    if ( !id.match(/^\d+$/) ) {
        res.writeHead(404);
        res.end("Invalid argument");
        return;
    }


  db.get("select id from recipes where id<? order by id desc limit 1", id, function(err,row){
    if (row !== undefined) {
      prev = row.id;
    }
    else {
      prev = undefined;
    }

    db.get("select id from recipes where id>? order by id asc limit 1", id, function(err,row){
      if (row !== undefined) {
        next = row.id;
      }
      else {
        next = undefined;
      }

    db.get("select title, filename, body from recipes where id=?", id, function(err,row){
                      body = converter.makeHtml(row.body);

                      res.render('recipe', {recipe: { title: row.title,
                          body: body,
                          prev: prev, next: next }});
                      });
                      });
  });
};

exports.list = function(req, res){
  db.all("select title, id from recipes order by id", function(err,rows){
    res.render('list', { recipes: rows });
  });
};
