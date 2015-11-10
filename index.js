module.exports = {
    blocks: {
        webpd: {
            process: function(blk) {
		return '<script type=\"text/javascript\" charset=\"utf-8\">\n\tvar patch=$.get(\''
		    + path 
		    + '\', function(patchStr) { patch = Pd.loadPatch(patchStr); Pd.start()})</script>'
            }
        }
    }
};
