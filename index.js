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
	log("-------------- script generated");
	return tag;
    }
    catch(e){
	console.log(e);
    }
};

var makeLines = function(path, name){
    log("Server loaded: "+path)
    log("-------------- "+name)
    var array = [
	'',
	'  window.pd_environment._'+name+' = function(fn){',
	'    var url = \''+ path +'\'',
	'    $.get(url, function(data){',
	'      fn(\''+name+'\', data);',
	'    });',
	'  };'
    ];
    log("-------------- script "+name+" generated");
    return array;
}

var log = function(msg){
    console.log("<webpd says>: "+msg);
}

var makeContainer = function(name, lines){
    var string = makeScriptInlineElement(lines);
    var _id = 'pd_container_'+name
    var div = '<div class=\'pd_container\' id=\''+_id+'\' >\n'+
	'  <code>'+name+'.pd</code>\n'+
	'  <div id=\''+name+'\'></div>\n'+
	'  '+string +
	'</div>'
    log('\n'+div);
    log("-------------- "+_id+" "+ "generated");
    return div;
}

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
	    'head:end': function(){
		return makeScriptSrcElement("gitbook/plugins/gitbook-plugin-webpd/jquery-latest.min.js") + 
		    makeScriptSrcElement("gitbook/plugins/gitbook-plugin-webpd/pd-environment.js")
	    }
	}
    },
    blocks: {
        patch: {
	    process: function(current) {
		console.log(current);
		var name =  current.body.split(".pd")[0].toLowerCase()

		// pd/ folder is where you MUST put pd patchs
		// generally located in project's root
		var p = 'gitbook/plugins/gitbook-plugin-webpd_porres_examples/'+current.body;
		var lines = makeLines(p, name);
		return makeContainer(name, lines);
		
	    }
        }
    }
};

