
var smt_cn_runner=new Ext.util.TaskRunner();
var reList ={
		run: function(){
			var store = Ext.data.StoreManager.map['core.smt_cn_kanban.store.Storecn'];
			store.reload();
		},
		interval : 60000
};

Ext.define("core.smt_cn_kanban.controller.Controller", {
	extend : "Ext.app.Controller",
	mixins:{
		suppleUtil:'core.util.SuppleUtil',
		ClockAction:'core.util.model.ClockAction',
		MaskMsgUtil:'core.util.model.MaskMsgUtil'
	},
	init : function() {
		var self = this;
		coreApp = self;
		this.control({
			'panel[xtype=smt_kanban_cn]':{
				close:function(){
					smt_cn_runner.stop(reList);
					alert('here contr');
				}
			},
			'window[id=8a828091535f2bd701537e2837910005_win]':{
				beforehide:function(e,Opts){
					smt_cn_runner.stopAll();
					//alert('here contr2');
				},
				beforeshow:function(e,Opts){
					smt_cn_runner.start(reList);
				},
			}
		})
	},
	models:[
	        //'core.smt_cn_kanban.model.cll.Model', 20160507
	        'core.smt_cn_kanban.model.Modelcn',
	        //'core.smt_cn_kanban.model.ModelHeader' 20160507
	],
	stores:[
	        'core.smt_cn_kanban.store.Storecn',
	        //'core.smt_cn_kanban.store.Tree', 20160507
	        //'core.smt_cn_kanban.store.cll.Store' 20160507
	],
	views:[
	       'core.smt_cn_kanban.view.NorthPanel',
	       'core.smt_cn_kanban.view.SonthPanel',
	       'core.smt_cn_kanban.view.CenterPanel',
	       'core.smt_cn_kanban.view.MainLayout'
	]
	
	
});
  
