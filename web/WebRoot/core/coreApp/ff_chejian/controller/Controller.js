

Ext.define("core.ff_chejian.controller.Controller", {
	extend : "Ext.app.Controller",
	mixins:{
		MessageUtil : 'core.util.MessageUtil'
	},
	
	init : function() {
		var self = this;
		coreApp = self;				
		this.control({
			'ff_chejian button[ref=submit]':{
			   click:function(e,Opts){
		   	        var ser=e.ownerCt.ownerCt;
		            moname=ser.getForm().findField('moname').getValue();
		            //alert(moname);
		            
					var store = Ext.data.StoreManager.map['core.ff_chejian.store.Store'];
					store.removeAll();
					store.getProxy().extraParams={moname:moname};
					store.load();
			   }
			}
		});
	},	
	views : ['core.ff_chejian.view.Main',
		'core.ff_chejian.view.SearchView',
		'core.ff_chejian.view.ResultView'],
		
	stores : ['core.ff_chejian.store.Store'],
	
	models : ['core.ff_chejian.model.Model']
});