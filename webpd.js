module.exports = {
    blocks: {
        webpd: {
            process: function(blk) {
		return '<script>\n\tvar patch=$.get(\''
		    + path 
		    + '\', function(patchStr) {\n\t\tpatch = Pd.loadPatch(patchStr)\n\t\tPd.start()})</script>'
            }
        }
    }
};
