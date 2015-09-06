var markdownpdf = require("markdown-pdf");
var fs = require("fs");

var FILE_ENCODING = 'utf-8';
var EOF = '\n';

function concat(files, dest) {
    console.log("concatenating " + files.length + " files");

    var out = files.map(function (path) {
        console.log(" + " + path);
        return fs.readFileSync(path, FILE_ENCODING);
    });
    
    fs.writeFileSync(dest, out.join(EOF), FILE_ENCODING);
    console.log(dest + ' created');
}

function documentGenerator(opts) {
	opts = opts || {};
	
    opts.srcPath = opts.srcPath || "src/";
    opts.outFile = opts.outFile || "out/doc.pdf";
    
    try {
        // get files found in source directory
        var files = fs.readdirSync(opts.srcPath);
        
        // add srcPath to file names to generate full file path
        for (var i = 0; i < files.length; i++) {
            files[i] = opts.srcPath + files[i];
        }
        
        // concatenate files
        var fullMarkdown = opts.outFile + ".md";
        concat(files, fullMarkdown);

        markdownpdf()
        .from(fullMarkdown)
        .to(opts.outFile);

        console.log("pdf generated");
    } catch (e) {
        var i = 0;
    }
}

module.exports = documentGenerator;