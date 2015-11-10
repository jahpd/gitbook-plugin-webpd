var WEBPD_MASTER = "https://raw.githubusercontent.com/sebpiq/WebPd/master/dist/webpd-latest.min.js"

module.exports = {
    blocks: {
        webpd: {
            process: function(path) {
		return '<script type=\"text/javascript\" charset=\"utf-8\">\n\tvar patch=$.get(\''
		    + path 
		    + '\', function(patchStr) { patch = Pd.loadPatch(patchStr); Pd.start()})</script>'
            }
        },
	import_webpd: {
	    process:  function (link) {
		return "<script src=\"+"WEBPD_MASTER+"+\"></script>"
            }
	}	    
    }
};
