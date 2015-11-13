$('.pd_container').click(function(){
    var container = $(this).attr('id');
    var patch = container.split('pd_container')[1];
    if(!window.pd_environment){
	throw new Error("PD environment is "+window.pd_environment);
    }
    window.pd_environment[patch](function(name, string){
	var patch = pdfu.parse(string);
	var rendered = pdfu.renderSvg(patch, {svgFile: false});
	$('#'+name).html(rendered)
	console.log(patch+' loaded');
    });
});
