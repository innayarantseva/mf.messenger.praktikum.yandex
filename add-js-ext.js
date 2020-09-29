/**
 * Взято из обсуждения бага https://github.com/microsoft/TypeScript/issues/16577
 * Дополняет пути к зависимостям в es6 модулях расширением '.js'
 */

/* Спасибо однокурснику за предоставленное решение! */

const fs = require('fs');
const path = require('path');

function fromDir(startPath, filter, callback) {

    if (!fs.existsSync(startPath)) {
        console.log('no dir ', startPath);
        return;
    }

    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter, callback); //recurse
        } else if (filter.test(filename)) callback(filename);
    }
}

function addDotJsToLocalImports(filename) {
    var buf = fs.readFileSync(filename);
    let replaced = buf.toString().replace(/(import .* from\s+['"])(?!.*\.js['"])(\..*?)(?=['"])/g, '$1$2.js');
    if (replaced !== buf.toString()) {
        fs.writeFileSync(filename, replaced);
        console.log('fixed imports at ' + filename);
    }
}

//------------------------
//---BUILD TASK START
//------------------------

fromDir(process.argv[2], /\.js$/, addDotJsToLocalImports);