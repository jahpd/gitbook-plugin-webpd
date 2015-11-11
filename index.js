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
		return '<script src=\"gitbook/plugins/gitbook-plugin-webpd/jquery-latest.min.js\"></script>\n\t<script src=\"gitbook/plugins/gitbook-plugin-webpd/pd-environment.js\"></script>';
	    },
	    'body:end': function(){
		return '<script type=\"text/javascript\">\n'+
		    '$(\'.pd_container\').click(function(){\n'+
		    '\tcontainer = $(this).attr(\'id\');\n'+
		    '\tpatch = container.split(\'pd_container_\')[1];\n'+
		    '\tconsole.log(\'loading \'+patch+\'...\');\n'+
		    '\tpd_environment[patch]();\n'+
		    '});\n'+
		    '</script>';
	    }
	}
    },
    blocks: {
        patch: {
            process: function(path) {
		console.log(path);
		var split_path = path.body.split("/");
		var filename = split_path[split_path.length-1];
		var name = filename.split(".pd")[0].toLowerCase()
		console.log("Patch loaded: "+name);
		console.log(path.body)
		return '<div class=\'pd_container\' id=\'pd_container_'+name+'\' >\n<script type=\"text/javascript\">\n\twindow.pd_environment.'+name+' = function(){\n\t\t$.get(\"'+path.body+'\", function(patchStr) {\n\t\t\tvar '+name+'_patch = pdfu.parse(patchStr);\n\t\t\tvar '+name+'_rendered = pdfu.renderSvg('+name+'_patch, {svgFile: false});\n\t\t\t$(\'#'+name+'\').html('+name+'_rendered);\n\t\t});\n\t}\n</script>\n<span>'+filename+' (click me)</span>\n<div id=\''+name+'\'></div></div>'
            }
        }
    }
};

