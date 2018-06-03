var LineProcedureId;
var auto_runner=new Ext.util.TaskRunner();
Ext.define('core.resource.controller.Controller', {
     extend: 'Ext.app.Controller',
     init: function() {
         this.control({
        	 
        	 
        	 
 			'm-northpanel-north button[ref=reset]':{
 				click:function(btn){
 					console.log(btn);	
 				}
 			},
 			'm-northpanel-north button[ref=submit]':{
 				click:function(btn){
 					var self = this;
 					coreApp = self;
 					
 	var nNorth=btn.ownerCt.ownerCt;
 					
 					var combo1=Ext.getCmp('xianti').getRawValue();
// 					Ext.getCmp('xianti').readOnly=true;
 					var combo2=Ext.getCmp('zhicheng').getRawValue();
 					var combo3=Ext.getCmp('gongdan').getRawValue();
 					var kaji=Ext.getCmp('kaji').getRawValue();
 					var combo4=Ext.getCmp('kaji').getValue();
 					var combo5=Ext.getCmp('banzhi').getRawValue();
 					var combo6=Ext.getCmp('machine').getRawValue();

 					Ext.getCmp("return_msg").setValue('wang');
// 					var infoContent = Ext.getDom("return_msg").value;// 获取设置的组件的id
 					//alert(infoContent);//这样就可以测试弹出获取输入的值
 					
 					
 					nNorth.down("toolbar").items.items[1].setText(combo1);
 					nNorth.down("toolbar").items.items[5].setText(combo3);
 					nNorth.down("toolbar").items.items[9].setText(combo2);
 					nNorth.down("toolbar").items.items[13].setText(combo6);
 					nNorth.down("toolbar").items.items[17].setText('正在刷卡-'+kaji);
 					//
var returnName='正在获取卡机人员信息...\r\n';
// 					alert(return_msg);
 					

 					Ext.Ajax.request({
						url : '/web/technology/resource!getResult5.action', 
						params : 
						{shift:combo5,workcenterName:combo1,moName:combo3,WorkprocedureFlowList:combo2,
							option:combo4},
						success : function(response, opts) {
//							alert(response.responseText);
 					var obj = Ext.decode(response.responseText);
 					var data=obj.data;
 					LineProcedureId=data[0].LineProcedureId;
// 					alert(LineProcedureId);
						},
							failure : function(response, opts) {
							obj = Ext.decode(response.responseText);
							Ext.Msg.alert("系统提示",obj.returnMsg);
						}
						});
 					auto_task={
							run:function(){
								Ext.Ajax.request({
									url : '/web/technology/resource!getResult6.action', 
									params : 
									{LineProcedureId:LineProcedureId,MatchAddr:combo6,Option:combo4},
									success : function(response, opts) {
//										alert(response.responseText);
										var obj = Ext.decode(response.responseText);
					 					var data=obj.data;
					 					if(data[0].I_ReturnMessage!='最新记录已经读取')
					 						{
					 						if(data[0].I_ReturnMessage!='请单击开始刷卡后方能刷卡！'){
//					 						Ext.Msg.alert("系统提示",data[0].I_ReturnMessage);
					 							returnName+=data[0].I_ReturnMessage+"\r\n";
					 						Ext.getCmp("return_msg").setValue(returnName);
					 						}
					 					}
									}
								});
								},
								interval:2000,
							};
 					auto_runner.start(auto_task);
 					

				//开启线程 
				
 					

	
//8a8280914c0e63e0014c11378f780001_win
 					
 					
/**
 * ****************************
 */

}
 			},
 			'm-northpanel-north button[ref=stopsubmit]':{
 					click:function(btn){
// 						Ext.getCmp("xianti").setValue('');
// 						Ext.getCmp("gongdan").setValue('');
// 		    	    	Ext.getCmp("zhicheng").setValue('');
// 		    	    	Ext.getCmp("banzhi").setValue('');
// 		    	    	Ext.getCmp("kaji").setValue('');
// 		    	    	Ext.getCmp("machine").setValue('');
 		    	    	
 		    	    	
 		    	    	var nNorth=btn.ownerCt.ownerCt;
 		    	    	
 		    	    	
 		    	    	nNorth.down("toolbar").items.items[1].setText('');
 	 					nNorth.down("toolbar").items.items[5].setText('');
 	 					nNorth.down("toolbar").items.items[9].setText('');
 	 					nNorth.down("toolbar").items.items[13].setText('');
 	 					nNorth.down("toolbar").items.items[17].setText('停止刷卡');
// 						auto_runner.stop(auto_task);
 						auto_runner.stopAll();
 					}
 			},
 			
 			'window[id=8a8280914c0e63e0014c11378f780001_win]' : {
				beforehide : function(e, eOpts) {
//					alert(Ext.Date.format(new Date(new Date()),'Y-m-d H:i:s'));
					auto_runner.stopAll();
				}
			}
 			
 			
         });
     },

	
	stores:[
	        'core.resource.store.Store',
	        'core.resource.store.Store2',
	        'core.resource.store.Store3'
	],
	models:[
	        'core.resource.model.Model3',
	        'core.resource.model.Model2',
	        'core.resource.model.Model'
	],
	views:[
	       'core.resource.view.MainPanel',
	       'core.resource.view.NorthPanel',
	       'core.resource.view.North',
	       'core.resource.view.CenterPanel'
	]
});