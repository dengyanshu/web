var xmztl_line_runner=new Ext.util.TaskRunner();
var xmztl_list_task=null;
var xmztl_list_p;

Ext.define("core.xm_ztl.controller.Controller", {
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
			'xm_ztl_search button[ref=submit]':{
			   click:function(e,Opts){
		   	        var ser=e.ownerCt.ownerCt;
		            var line=ser.getForm().findField('line').getValue();
		            xmztl_list_task={
							run:function(){
								    var store = Ext.data.StoreManager.map['core.xm_ztl.store.Store'];
									var result=self.ajax({url:'/web/kanban/ff_sl_list!getResult16.action',params:{line:line}});	
									if(result.success){
										store.proxy.data=result.data;
										store.load();
									}else{
										store.removeAll();
										self.msgbox(result.returnMsg);
									}
							},
							interval:60*1000*5
						};
		            xmztl_line_runner.start(xmztl_list_task);
			   }
			},
		
		    
			'window[id=8a82809160765f3d0160770779850002_win]':{
				beforehide:function(e,Opts){
					xmztl_line_runner.stopAll();
				}
			},
			
		});
	},	
	views : ['core.xm_ztl.view.Main',
		'core.xm_ztl.view.SearchView',
		'core.xm_ztl.view.ResultView'],
		
	stores : ['core.xm_ztl.store.Store',
	          'core.xm_ztl.store.sl.Store'
	          ],
	
	models : ['core.xm_ztl.model.Model',
	          'core.xm_ztl.model.sl.Model'
	          ]
});