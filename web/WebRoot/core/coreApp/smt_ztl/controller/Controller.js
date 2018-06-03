Ext.define("core.smt_ztl.controller.Controller", {
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
			'smt_ztl_search button[ref=submit]':{
				   click:function(e,Opts){
			   	      var   ser=e.ownerCt.ownerCt;
			   	      var  main=ser.ownerCt;
			          var   chaxunrq= Ext.Date.format(new Date(ser.getForm().findField('chaxunrq').getValue()),'Y-m-d'); 
			          var   chaxunrq2= Ext.Date.format(new Date(ser.getForm().findField('chaxunrq2').getValue()),'Y-m-d'); 
			          var  time1=ser.getForm().findField('time1').getValue();
			          var  time2=ser.getForm().findField('time2').getValue();
			          var   line=ser.getForm().findField('line').getValue();
			            
						var store = Ext.data.StoreManager.map['core.smt_ztl.store.Store'];
						store.removeAll();
						store.getProxy().extraParams={chaxunrq:chaxunrq,chaxunrq2:chaxunrq2,time1:time1,time2:time2,line:line};
						store.load();
						
						
						var store2 = Ext.data.StoreManager.map['core.smt_ztl.store.sl.Store'];
						store2.removeAll();
						store2.getProxy().extraParams={chaxunrq:chaxunrq,chaxunrq2:chaxunrq2,time1:time1,time2:time2,line:line};
						store2.load();
				   }
				}
			
		});
	},	
	views : ['core.smt_ztl.view.Main'
		,'core.smt_ztl.view.ResultView'
	         ,'core.smt_ztl.view.ChartView'
	         ,'core.smt_ztl.view.SearchView'
	         ],
		
	stores : ['core.smt_ztl.store.Store'
	          ,'core.smt_ztl.store.sl.Store'
	          ],
	
	models : ['core.smt_ztl.model.Model'
	          ,'core.smt_ztl.model.sl.Model'
	          ]
});