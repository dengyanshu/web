

Ext.define("core.ff_moname.controller.Controller", {
	extend : "Ext.app.Controller",
	mixins:{
		MessageUtil : 'core.util.MessageUtil'
	},
	
	init : function() {
		var self = this;
		coreApp = self;				
		this.control(
//			{
//			'ff_moname button[ref=submit]':{
//			   click:function(e,Opts){
//		   	        var ser=e.ownerCt.ownerCt;
//		            moname=ser.getForm().findField('moname').getValue();
//		            //alert(moname);
//		            
//					var store = Ext.data.StoreManager.map['core.ff_moname.store.Store'];
//					store.removeAll();
//					store.getProxy().extraParams={moname:moname};
//					store.load();
//			   }
//			}
//		}
		);
	},	
	views : ['core.ff_moname.view.Main',
		'core.ff_moname.view.SearchView',
		'core.ff_moname.view.ResultView'],
		
	stores : ['core.ff_moname.store.Store'],
	
	models : ['core.ff_moname.model.Model']
});