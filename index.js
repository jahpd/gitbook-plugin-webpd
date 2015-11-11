
module.exports = {
    /* Configure PD assets*/
    book: {
	assets: './assets',
	js: [
	    'webpd-latest.min.js',
	    'pd-fileutils-latest.js'
	],
	/* Load patchs */
	html: {
	    'head:end': function(){
		return '<script src=\"gitbook/plugins/gitbook-plugin-webpd/jquery-latest.min.js\">\n</script>\n<script src=\"gitbook/plugins/gitbook-plugin-webpd/pd-environment.js\"></script>';
	    },
	    'body:end': function(){
		return '<script type=\"text/javascript\"> for(var patch in pd_environment) { window.pd_environment[patch]() }</script>';
	    }
	}
    },
    blocks: {
        patch: {
            process: function(path) {
		console.log(path);
		var p = path.body.split(" ") ? path.body.split(" ")[1] : path.body;
		var split_path = path.body.split("/");
		var filename = split_path[split_path.length-1];
		var name = filename.split(".pd")[0];
		console.log("Patch loaded: "+name);
		console.log(p)
		return '<div>\n<script type=\"text/javascript\">\n\twindow.pd_environment.'+name+' = function(){\n\t\t$.get(\"'+p+'\", function(patchStr) {\n\t\t\tpatch = pdfu.parse(patchStr);\n\t\t\tvar rendered = pdfu.renderSvg(patch, {svgFile: false});\n\t\t\t$(\'#'+name+'\').html(rendered);\n\t\t});\n\t}\n</script>\n<span>'+filename+'</span>\n<div id=\''+name+'\'></div></div>'
            }
        }
    }
};

