Ext.define("core.xm_oba.controller.Controller", {
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
			
			
		});
	},	
	views : ['core.xm_oba.view.Main',
		'core.xm_oba.view.ResultView'
	         ,'core.xm_oba.view.ChartView'],
		
	stores : ['core.xm_oba.store.Store'
	          ],
	
	models : ['core.xm_oba.model.Model'
	          ]
});