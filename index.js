path = require("path")

/**
 * This is from https://github.com/chudaol/gitbook-plugin-addcssjs/blob/master/index.js
 */

/* This is a customization from above */
var createPath = function (fileName) {
    return BASE_PATH + fileName.replace("../", "");
};

var makeScriptSrcElement = function (src) {
    return "<script type=\"text/javascript\" src=\"" + src + "\"></script>"
};

/* This is a customization from above */
var makeScriptInlineElement = function (lines) {
    log("-------------- join lines...");
    try{
	lines = lines.join("\n");
	var tag =  "<script type=\"text/javascript\" charset=\"utf8\">"+lines+"\n  </script>\n";
	return tag;
    }
    catch(e){
	console.log(e);
    }
};

var makeLines = function(options){
    log("Server loaded: "+options.path);
    var array = [
	'',
	'  window.pd_environment.'+options.varname+' = function(fn){',
	'    var url = window.location.origin +\'/\'+\''+ options.path +'\'',
	'    $.get(url, function(data){',
	'      fn(\''+options.varname+'\', data);',
	'    });',
	'  };'
    ];
    log("-------------- script "+options.name+" generated");
    return array;
}

var log = function(msg){
    console.log("<webpd says>: "+msg);
}

var makeContainer = function(options){
    var _id = 'pd_container'+options.varname
    var div = '<div class=\'pd_container\' id=\''+_id+'\' >\n'+
	'  <code>['+options.name+'.pd \<</code>\n'+
	'  <div id=\''+options.varname+'\'></div>\n'+
	'  '+options.lines +
	'</div>'
    log("-------------- "+_id+" "+ "generated");
    return div;
}

var last = null;

module.exports = {
    /* Configure PD assets*/
    book: {
	assets: './assets',
	js: [
	    'webpd-latest.min.js',
	    'pd-fileutils-latest.js',
	    'pd-load-patch.js'
	],
	/* Load patchs */
	html: {
	    'head:end': function(current){
		var p = current.staticBase+"/plugins/gitbook-plugin-webpd/jquery-latest.min.js";
		var d = current.staticBase+"/plugins/gitbook-plugin-webpd/pd-environment.js";		
		return makeScriptSrcElement(p) + makeScriptSrcElement(d)
	    }	
	}
    },
    blocks: {
        patch: {
	    process: function(current) {
		console.log(current);
		var name =  current.body.split(".pd")[0]
		var varname = "_"+current.body.split("/")[1]
		varname = varname.split(".pd")[0]

		console.log(name)
		// current.body is a subplugin
		options = {
		    varname: varname,
		    name:    name, 
		    path:    "gitbook/plugins/gitbook-plugin-webpd_"+current.body
		}
		var lines = makeLines(options);
		options.lines = makeScriptInlineElement(lines);
		return makeContainer(options);
		
	    }
        }
    }
};
