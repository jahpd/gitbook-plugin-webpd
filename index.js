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
	'  window.pd_environment.'+options.name+' = function(fn){',
	'    var url = \'\';',
	'    if(window.location.origin == \"https:\/\/jahpd.gitbooks.io\"){',
	'       url = window.location.origin+\'/gitbook/plugins/content/'+options.file+'\'',
	'    }',
	'    else {',
	'       url = window.location.origin+\'/gitbook/plugins/gitbook-plugin-webpd_'+options.folder+'/'+options.file+'\';',
	'    }',
	'    $.get(url, function(data){',
	'      fn(\''+options.name+'\', data);',
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
    var _id = 'pd_container'+options.name
    var div = '<div class=\'pd_container\' id=\''+_id+'\' >\n'+
	'  <code>['+options.folder+"/"+options.name+'.pd \<</code>\n'+
	'  <div id=\''+options.name+'\'></div>\n'+
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
		//console.log(this.book)
		//book.variables.lasturl = current.staticBase
		var p = current.staticBase + "/plugins/gitbook-plugin-webpd/jquery-latest.min.js";
		var d = current.staticBase + "/plugins/gitbook-plugin-webpd/pd-environment.js";
		p = makeScriptSrcElement(p)
		d = makeScriptSrcElement(d)
		return p + d
	    }	
	}
    },
    blocks: {
        patch: {
	    process: function(current) {
		// current.body contains a subplugin
		// <subplugin>/<patch>.pd
		var file = current.body.split("/")[1]
		var folder = current.body.split("/")[0]
		var name = "_"+file.split(".pd")[0]
		
		options = {
		    name:    name,
		    file:    file,
		    folder:  folder
		}
		var lines = makeLines(options);
		options.lines = makeScriptInlineElement(lines);
		return makeContainer(options);
		
	    }
        }
    }
};
