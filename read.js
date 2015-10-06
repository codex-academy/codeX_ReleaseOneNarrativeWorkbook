var fs = require('fs');

fs.readFile('try_this.md', 'utf-8',  function(err, content){console.log(content); });

