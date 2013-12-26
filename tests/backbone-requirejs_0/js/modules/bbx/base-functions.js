define([
    'jquery', 
    'backbone',
    'modules/repository/model', 
    'modules/mucua/model', 
    'modules/common/HeaderView',
    'modules/common/FooterView',
], function($, Backbone, RepositoryModel, MucuaModel, HeaderView, FooterView){
    return {
	initialize: function() {
	    console.log('inicializa functions bbx');
	},
	
	// get repository / mucua
	_getBaseData: function(repository = '', mucua = '') {
	    
	    console.log('_getBaseData(' + repository + ',' + mucua + ')');
	    
	    if (repository != '' && mucua != '') {
		// get both by url
		$("body").data("data").repository = repository;
		$("body").data("data").mucua = mucua;
		$("body").data("data").trigger("changedData");
	    } else {
		if (repository != '' & mucua == '') {
		    // repository by url, mucua by API
		    $("body").data("data").repository = repository;
		    var defaultMucua = new MucuaModel([], {url: '/api/mucua/'});
		    defaultMucua.fetch({
			success: function() {
			    $("body").data("data").mucua = defaultMucua.attributes[0].description;
			    $("body").data("data").trigger("changedData");
			}
		    }); 
		} else if (repository == '' & mucua != '') {
		    // repository by API, mucua by url
		    $("body").data("data").mucua = mucua;
		    var defaultRepository = new RepositoryModel([], {url: '/api/repository/'});
		    defaultRepository.fetch({
			success: function() {
			    $("body").data("data").repository = defaultRepository.attributes[0].name;
			    $("body").data("data").trigger("changedData");
			}
		    });
		} else {
		    // get both from API
		    var defaultRepository = new RepositoryModel([], {url: '/api/repository/'});
		    defaultRepository.fetch({
			success: function() {
			    $("body").data("data").repository = defaultRepository.attributes[0].name;
			    var defaultMucua = new MucuaModel([], {url: '/api/mucua/'});
			    defaultMucua.fetch({
				success: function() {
				    $("body").data("data").mucua = defaultMucua.attributes[0].description;
				    $("body").data("data").trigger("changedData");
				}
			    });
			}
		    });
		}
	    }
	},

	_renderCommon: function(repository = '', mucua = '') {
	    // carrega partes comuns; carrega dados basicos para todos
	    console.log("renderCommon");
	    
	    this._getBaseData(repository, mucua);
	    $("body").data("data").on("all", function(event) {console.log(event)});
	    
	    $("body").data("data").on("changedData", function() {
		var headerView = new HeaderView();
		headerView.render($("body").data("data"));
		var footerView = new FooterView();
		footerView.render($("body").data("data"));
	    });    
	    $("body").data("data").renderCommon = true;
	}	
    }
});