

Ext.define("core.smt_xbckc.controller.Controller", {
	extend : "Ext.app.Controller",
	mixins:{
		suppleUtil:'core.util.SuppleUtil',
		MaskMsgUtil:'core.util.model.MaskMsgUtil',
		MessageUitl:'core.util.MessageUtil'
	},
	
	init : function() {
		var self = this;
		coreApp = self;	
		this.control({
			'smt_xbckc_search button[ref=submit]':{
			   click:function(e,Opts){
		   	        var ser=e.ownerCt.ownerCt;
		            var sumqty=ser.getForm().findField('sumqty').getValue();
		            var mzqty=ser.getForm().findField('mzqty').getValue();
		            //alert(moname);
		            
//					var store = Ext.data.StoreManager.map['core.smt_xbckc.store.Store'];
//					store.getProxy().extraParams={sumqty:sumqty,mzqty:mzqty};
//					store.load({params:{start : 0, limit : 25 } });
		            
		            var store = Ext.data.StoreManager.map['core.smt_xbckc.store.Store'];
					var result=self.ajax({url:'/web/kanban/smt_xbckc_kanban!getResult.action',params:{sumqty:sumqty,mzqty:mzqty}});	
					if(result.success){
						store.proxy.data=result.data;
						store.load();
					}else{
						store.removeAll();
						self.msgbox(result.returnMsg);
					}
					
			   }
			}
			
		});
	},	
	views : ['core.smt_xbckc.view.Main',
		'core.smt_xbckc.view.SearchView',
		'core.smt_xbckc.view.ResultView'],
		
	stores : ['core.smt_xbckc.store.Store'],
	
	models : ['core.smt_xbckc.model.Model']
});