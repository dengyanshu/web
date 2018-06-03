var Workcenterid=null;
var WorkCenterName=null;


var xm_sc_runner=new Ext.util.TaskRunner();
var xm_sc_list_task=null;
var xm_sc_p;




Ext.define("core.xm_sc_kanban.controller.Controller",{
	extend:"Ext.app.Controller",
	
	mixins:{
		suppleUtil:'core.util.SuppleUtil',
		MaskMsgUtil:'core.util.model.MaskMsgUtil',
		MessageUitl:'core.util.MessageUtil'
	},

	init:function(){
		var self=this;
		coreApp=self;
		this.control(
			{
				
				
			
				'panel[xtype=xm_sc_kb_lines] dataview ':{
					itemclick:function(view, record, item, index, e, eOpts ){
						Workcenterid=record.data.Workcenterid;
						WorkCenterName=record.data.WorkcenterName;
						var  type=e.target.defaultValue;
						if(type==undefined){
							alert("必须选择类型");
							return;
						}
						WorkCenterName=WorkCenterName+'|'+type;
						
						var layout=view.up('xm_sc_kb_main').getLayout();	
						layout.setActiveItem(1);
						
						
						
						var  formpanle=Ext.getCmp("xm_sc_form");
						var form=formpanle.getForm();
						
						xm_sc_list_task={
								run:function(){
									//中
									var store1 = Ext.data.StoreManager.map['core.xm_sc_kanban.store.sl.Store1'];
									var result1=self.ajax({url:'/web/kanban/ff_sl_list!getResult25.action',params:{line:WorkCenterName}});	
									if(result1.success){
										store1.loadData(result1.data);
									}else{
										store1.removeAll();
										self.msgbox(result1.returnMsg);
									}
									
									//上
									var store3 = Ext.data.StoreManager.map['core.xm_sc_kanban.store.sl.Store3'];
									var result3=self.ajax({url:'/web/kanban/ff_sl_list!getResult26.action',params:{line:WorkCenterName}});	
									if(result3.success){
										store3.loadData(result3.data);
									}else{
										store3.removeAll();
										self.msgbox(result3.returnMsg);
									}
									
									
								
									
									//上
									var store2 = Ext.data.StoreManager.map['core.xm_sc_kanban.store.sl.Store2'];
									var result2=self.ajax({url:'/web/kanban/ff_sl_list!getResult27.action',params:{line:WorkCenterName}});	
									if(result2.success){
										store2.loadData(result2.data);
									}else{
										store2.removeAll();
										self.msgbox(result2.returnMsg);
									}
									
									
									
									
									Ext.Ajax.request({
					     				 url : '/web/kanban/ff_sl_list!getResult26.action', 
					     				 params:{line:WorkCenterName},
					     				 success : function(response, opts) {
			                 				//alert(response.responseText);
			                				var obj = Ext.decode(response.responseText);
			               					var datas=obj.data;
			               					var  data=datas[0];
			               					form.setValues(data);
					     				 }
								    });
								 },
								interval:60000*1
						};
						
						xm_sc_runner.start(xm_sc_list_task);
					}
					
				},
				
			    'panel[xtype=xm_sc_kb_item] button[name=return]':{
			    	click:function(view){
			    		var layout=view.up('xm_sc_kb_main').getLayout();	
			    		var store = Ext.data.StoreManager.map['core.xm_sc_kanban.store.Store'];
						store.removeAll();
						store.load();
						layout.setActiveItem(0);
						xm_sc_list_task=null;
			    	}
			    },
			    
			    
			   //8a82809161f8bc1b0161f8c060870001_win
				'window[id=8a82809161f8bc1b0161f8c060870001_win]':{
					beforehide:function(e,Opts){
						xm_sc_runner.stopAll();
					}
				},
		    }
		);
	},
	views:[
		'core.xm_sc_kanban.view.Main',
		'core.xm_sc_kanban.view.Lines'
		,'core.xm_sc_kanban.view.Item'
	],
	stores:[
		'core.xm_sc_kanban.store.Store'
		,'core.xm_sc_kanban.store.sl.Store1'
		,'core.xm_sc_kanban.store.sl.Store2'
		,'core.xm_sc_kanban.store.sl.Store3'
	],
	models:[
		 'core.xm_sc_kanban.model.Model'
		 ,'core.xm_sc_kanban.model.sl.Model1'
		 ,'core.xm_sc_kanban.model.sl.Model2'
		 ,'core.xm_sc_kanban.model.sl.Model3'
	]
	
});