var markdownpdf = require("markdown-pdf");

function documentGenerator(opts) {
	opts = opts || {};
	
    opts.srcPath = opts.srcPath || "src";
    opts.outFile = opts.outFile || "out/doc.pdf";
    
    try {
        markdownpdf()
        .from(opts.srcPath)
        .to(opts.outFile);
    } catch (e) {
        var i = 0;
    }
}

module.exports = documentGenerator;