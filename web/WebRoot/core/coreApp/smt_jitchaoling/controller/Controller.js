

Ext.define("core.smt_jitchaoling.controller.Controller", {
	extend : "Ext.app.Controller",
	mixins:{
		MessageUtil : 'core.util.MessageUtil'
	},
	
	init : function() {
		var self = this;
		coreApp = self;				
		this.control({
			'smt_jitchaoling_search button[ref=submit]':{
			   click:function(e,Opts){
		   	        var ser=e.ownerCt.ownerCt;
		            moname=ser.getForm().findField('moname').getValue();
		            //alert(moname);
		            
					var store = Ext.data.StoreManager.map['core.smt_jitchaoling.store.Store'];
					store.removeAll();
					store.getProxy().extraParams={moname:moname};
					store.load();
			   }
			}
		});
	},	
	views : ['core.smt_jitchaoling.view.Main',
		'core.smt_jitchaoling.view.SearchView',
		'core.smt_jitchaoling.view.ResultView'],
		
	stores : ['core.smt_jitchaoling.store.Store'],
	
	models : ['core.smt_jitchaoling.model.Model']
});