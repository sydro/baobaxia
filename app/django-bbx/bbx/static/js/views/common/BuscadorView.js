define([
    'jquery', 
    'lodash',
    'backbone',
    'modules/media/functions',
    'text!/templates/' + BBX.userLang + '/common/Buscador.html',
    'textext',  
    'textext_tags',
], function($, _, Backbone, MediaFunctions, BuscadorTpl, Textext, TextextTags){
    var BuscadorView = Backbone.View.extend({
	render: function(data) {
	    console.log('buscador');
	    var config = BBX.config,
		tags = MediaFunctions.__getTagsFromUrl();

	    _.each(tags, function(tag) {
		$("body").addClass(tag);	  
	    });
	    
	    if ($('#buscador').html() == "" ||
		(typeof $('#buscador').html() === "undefined")) {
		$('#header-bottom').prepend(_.template(BuscadorTpl, data));
		$('head').append('<link rel="stylesheet" href="/css/textext.plugin.tags.css" type="text/css" />');
	    }
	}
    });
    return BuscadorView;
});
