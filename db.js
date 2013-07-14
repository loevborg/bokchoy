var sqlite3 = require("sqlite3");
exports.db = new sqlite3.Database('data/recipes.db');
