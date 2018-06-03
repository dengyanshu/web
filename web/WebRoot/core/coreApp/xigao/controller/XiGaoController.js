/***************************************************************************
  								<主控制类> 
 ***************************************************************************/
 
Ext.define("core.xigao.controller.XiGaoController",{
	extend:'Ext.app.Controller',
	require:('baseUx.BoxReorderer'),
	
	/*引入视图类*/
	views:[
		'core.xigao.view.MainFrame',										 //主程序视图
		'core.xigao.view.main.Content',									 //内容区域视图
		'core.xigao.view.main.Navigation',								 //导航栏视图
		'core.xigao.base.XiGaoBaseTree',								 		 //加载基础的树
		'core.xigao.view.main.navigation.ReportForms',			 		 //报表查询树
		'core.xigao.view.main.navigation.tree.ReportForms',
		'core.xigao.view.main.content.xgcbxsm.Operate',
		'core.xigao.view.main.content.xghsyffsm.Operate',
		'core.xigao.view.main.content.xgrksm.Operate',
		'core.xigao.view.main.content.xgsxsm.Operate',
		'core.xigao.view.main.content.xgcbxsm.Return',
		'core.xigao.view.main.content.xghsyffsm.Return',
		'core.xigao.view.main.content.xgrksm.Return',
		'core.xigao.view.main.content.xgsxsm.Return',
		'core.xigao.view.main.content.xgkccx.Operate',
		'core.xigao.view.main.content.xgkccx.Result',
		'core.xigao.view.main.content.xgsyjlcx.Operate',
		'core.xigao.view.main.content.xgsyjlcx.Result'
	],
	
	/*引入数据集类*/
	stores:[
		'core.xigao.store.tree.ReportForms',
		'core.xigao.store.viewList.WorkcenterOfSMT_ViewList',
		'core.xigao.store.viewList.MOName_SMT_ViewList_Store',
		'core.xigao.store.xgkccx.Store',
		'core.xigao.store.xgsyjlcx.Store'
	],
	
	/*引入模型类*/
	models:[
	'core.xigao.model.viewList.WorkcenterOfSMT_ViewList',
	'core.xigao.model.viewList.MOName_SMT_ViewList_Model',
	'core.xigao.model.xgkccx.Model',
	'core.xigao.model.xgsyjlcx.Model'
	],
	
	init:function(){
		this.self=this;
		//coreApp=self;
		
		/*定义控制的方法*/
		this.control({
			/************************************************************************************
											控制事件开始
			 ************************************************************************************/
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 （点击树中的项目时触发以下事件）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/

			'xigao_reportforms':{
				itemclick:function(tree,record,item,index,e,eOpts ){
					var Navigation=tree.up("panel[xtype=xigao_navigation]");
					//得到主内容框架
					var tabpanel=Navigation.ownerCt.down("panel[xtype=xigao_content]");					
					var name=record.raw.name;
					var text=record.get("text");
					var id=record.get("id");
					var ids=id.split("-");
					if(ids[1]=="01"){
					var tab=tabpanel.getComponent(id);	
						if(!tab){
							var t=tabpanel.add({
								title:text,   			//新建的tab标题
								id:id,					//新建的id标题
								closable:true,			//有关闭按钮
								layout:'border',		//border布局
								closeAction:'hide', 	 //关闭后隐藏
								items:[					
									{xtype:name+'_operate'},	//查询操作界面类
									{xtype:name+'_return'}		//查询结果界面类
								]
								});
								tabpanel.setActiveTab(t);		//激活当前tab
						}else{
							tabpanel.setActiveTab(tab);			//激活当前tab
						}
					}else if(ids[1]=="02"){
						var tab=tabpanel.getComponent(id);	
						if(!tab){
							var t=tabpanel.add({
								title:text,   			
								id:id,					
								closable:true,			
								layout:'border',		
								closeAction:'hide', 	
								items:[					
									{xtype:name+'.operate'},	
									{xtype:name+'.result'}		
								]
								});
								tabpanel.setActiveTab(t);		
						}else{
							tabpanel.setActiveTab(tab);			
						}
					}

				}
			},

			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
							 （锡膏出冰箱扫描）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			//按回车键事件
			'panel[xtype=xgcbxsm_operate] textfield[name=sn]':{
				specialkey:function(field,e){
					if(e.getKey()==e.ENTER){
						var operate=field.up('form');
						var baseForm=operate.getForm();
						var sn=baseForm.findField('sn').getValue();
						if(sn!=""){
							//后台操作
							Ext.Ajax.request({
								url:'/web/mes/overall/txn_tinol_on_line_show.action',
								params:{sn:sn},
								method:'post',
								timeout:3000,
								success:function(response,opts){
									var text=Ext.decode(response.responseText);
									var data=text.data[0];
									baseForm.findField('number_code').setValue(data.TinolCode);
									baseForm.findField('name').setValue(data.TinolName);
									baseForm.findField('type').setValue(data.TinolType);
									baseForm.findField('in_time').setValue(data.FactoryTime);
								}
							});
							
							var south=operate.ownerCt.down('xgcbxsm_return');
							var return_msg=south.getForm().findField('return_msg');
							var oldValue=return_msg.getValue();
							var date=Ext.Date.format(new Date(), 'H:i:s');
							Ext.Ajax.request({
								url:'/web/mes/xigao/xgcbxsm.action',
								params:{sn:sn,key:'TinolHW'},
								method:'post',
								timeout:3000,
								success:function(response,opts){
									var text=Ext.decode(response.responseText);
									return_msg.setValue(oldValue+date+": "+text.returnMes+"\r\n");
									south.getEl().down('textarea').dom.scrollTop = 999999;
								}
							});	
							
						}else{
							Ext.Msg.alert("系统提示","SN不能为空!");
						}
					}
					
					
					
				}
			},
			//button按钮1
			'panel[xtype=xgcbxsm_operate] button[action=scan1]':{
				click:function(e,eOpts){
					var operate=e.ownerCt.ownerCt;
					var baseForm=operate.getForm();
					var sn=baseForm.findField('sn').getValue();
					if(sn!=""){
						var south=operate.ownerCt.down('xgcbxsm_return');
						var return_msg=south.getForm().findField('return_msg');
						var oldValue=return_msg.getValue();
						var date=Ext.Date.format(new Date(), 'H:i:s');
						Ext.Ajax.request({
							url:'/web/mes/xigao/xgcbxsm.action',
							params:{sn:sn,key:'TinolHW'},
							method:'post',
							timeout:3000,
							success:function(response,opts){
								var text=Ext.decode(response.responseText);
								return_msg.setValue(oldValue+date+": "+text.returnMes+"\r\n");
								south.getEl().down('textarea').dom.scrollTop = 999999;
							}
						});	
					
					}else{
						Ext.Msg.alert("系统提示","SN不能为空!");
					}
							
				}
			},
			
			//button按钮2
			'panel[xtype=xgcbxsm_operate] button[action=scan2]':{
				click:function(e,eOpts){
					var operate=e.ownerCt.ownerCt;
					var baseForm=operate.getForm();
					var sn=baseForm.findField('sn').getValue();
					if(sn!=""){
						var south=operate.ownerCt.down('xgcbxsm_return');
						var return_msg=south.getForm().findField('return_msg');
						var oldValue=return_msg.getValue();
						var date=Ext.Date.format(new Date(), 'H:i:s');
						Ext.Ajax.request({
							url:'/web/mes/xigao/xgcbxsm.action',
							params:{sn:sn,key:'TinolOUT'},
							method:'post',
							timeout:3000,
							success:function(response,opts){
								var text=Ext.decode(response.responseText);
								return_msg.setValue(oldValue+date+": "+text.returnMes+"\r\n");
								south.getEl().down('textarea').dom.scrollTop = 999999;
							}
						});	
					
					}else{
						Ext.Msg.alert("系统提示","SN不能为空!");
					}
							
				}
			},

			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
							 （锡膏回收与发放扫描）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/			

			'panel[xtype=xghsyffsm_operate] textfield[name=sn]':{
				specialkey:function(field,e){
					if(e.getKey()==e.ENTER){
						var operate=field.up('form');
						var baseForm=operate.getForm();
						var sn=baseForm.findField('sn').getValue();
						if(sn!=""){
							//后台操作
							Ext.Ajax.request({
								url:'/web/mes/overall/txn_tinol_on_line_show_1.action',
								params:{sn:sn},
								method:'post',
								timeout:3000,
								success:function(response,opts){
									var text=Ext.decode(response.responseText);
									var data=text.data[0];
									baseForm.findField('number_code').setValue(data.TinolCode);
									baseForm.findField('name').setValue(data.TinolName);
									baseForm.findField('type').setValue(data.TinolType);
									baseForm.findField('in_time').setValue(data.TinolDate);
									baseForm.findField('effective_date').setValue(data.EffectDate);
									baseForm.findField('in_date').setValue(data.FactoryTime);
									baseForm.findField('line').setValue(data.SMTLineNO);
								}
							});
							var south=operate.ownerCt.down('xghsyffsm_return');
							var return_msg=south.getForm().findField('return_msg');
							var oldValue=return_msg.getValue();
							var date=Ext.Date.format(new Date(), 'H:i:s');
							Ext.Ajax.request({
								url:'/web/mes/xigao/xghsyffsm.action',
								params:{sn:sn,key:'input'},
								method:'post',
								timeout:3000,
								success:function(response,opts){
									var text=Ext.decode(response.responseText);
									return_msg.setValue(oldValue+date+": "+text.returnMes+"\r\n");
									south.getEl().down('textarea').dom.scrollTop = 999999;
								}
							});	
							
						}else{
							Ext.Msg.alert("系统提示","SN不能为空!");
						}
					}
				}
			},
			'panel[xtype=xghsyffsm_operate] button[action=scan1]':{
				click:function(e,eOpts){
					var operate=e.ownerCt.ownerCt;
					var baseForm=operate.getForm();
					var sn=baseForm.findField('sn').getValue();
					if(sn!=""){
						var south=operate.ownerCt.down('xghsyffsm_return');
						var return_msg=south.getForm().findField('return_msg');
						var oldValue=return_msg.getValue();
						var date=Ext.Date.format(new Date(), 'H:i:s');
						Ext.Ajax.request({
							url:'/web/mes/xigao/xghsyffsm.action',
							params:{sn:sn,key:'input'},
							method:'post',
							timeout:3000,
							success:function(response,opts){
								var text=Ext.decode(response.responseText);
								return_msg.setValue(oldValue+date+": "+text.returnMes+"\r\n");
								south.getEl().down('textarea').dom.scrollTop = 999999;
							}
						});	
					
					}else{
						Ext.Msg.alert("系统提示","SN不能为空!");
					}						
				}
			},
			'panel[xtype=xghsyffsm_operate] button[action=scan2]':{
				click:function(e,eOpts){				
					var operate=e.ownerCt.ownerCt;
					var baseForm=operate.getForm();
					var sn=baseForm.findField('sn').getValue();
					if(sn!=""){
						var south=operate.ownerCt.down('xghsyffsm_return');
						var return_msg=south.getForm().findField('return_msg');
						var oldValue=return_msg.getValue();
						var date=Ext.Date.format(new Date(), 'H:i:s');
						Ext.Ajax.request({
							url:'/web/mes/xigao/xghsyffsm.action',
							params:{sn:sn,key:'output'},
							method:'post',
							timeout:3000,
							success:function(response,opts){
								var text=Ext.decode(response.responseText);
								return_msg.setValue(oldValue+date+": "+text.returnMes+"\r\n");
								south.getEl().down('textarea').dom.scrollTop = 999999;
							}
						});	
					
					}else{
						Ext.Msg.alert("系统提示","SN不能为空!");
					}						
				}
			},
			
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
							 （锡膏入库扫描）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/				
	
			'panel[xtype=xgrksm_operate] textfield[name=sn]':{
				specialkey:function(field,e){
					if(e.getKey()==e.ENTER){
						var operate=field.up('form');
						var baseForm=operate.getForm();
						var sn=baseForm.findField('sn').getValue();
						if(sn!=""){
							//后台操作
							Ext.Ajax.request({
								url:'/web/mes/overall/txn_tinol_on_line_show.action',
								params:{sn:sn},
								method:'post',
								timeout:3000,
								success:function(response,opts){
									var text=Ext.decode(response.responseText);
									var data=text.data[0];
									baseForm.findField('number_code').setValue(data.TinolCode);
									baseForm.findField('name').setValue(data.TinolName);
									baseForm.findField('type').setValue(data.TinolType);
									baseForm.findField('in_time').setValue(data.TinolDate);
									baseForm.findField('effective_date').setValue(data.EffectDate);
									baseForm.findField('in_date').setValue(data.FactoryTime);
								}
							});
							var south=operate.ownerCt.down('xgrksm_return');
							var return_msg=south.getForm().findField('return_msg');
							var oldValue=return_msg.getValue();
							var date=Ext.Date.format(new Date(), 'H:i:s');
							Ext.Ajax.request({
								url:'/web/mes/xigao/xgrksm.action',
								params:{sn:sn},
								method:'post',
								timeout:3000,
								success:function(response,opts){
									var text=Ext.decode(response.responseText);
									return_msg.setValue(oldValue+date+": "+text.returnMes+"\r\n");
									south.getEl().down('textarea').dom.scrollTop = 999999;
								}
							});		
							
						}else{
							Ext.Msg.alert("系统提示","SN不能为空!");
						}
					}
				}
			},
			'panel[xtype=xgrksm_operate] button[action=scan1]':{
				click:function(e,eOpts){
					var operate=e.ownerCt.ownerCt;
					var baseForm=operate.getForm();
					var sn=baseForm.findField('sn').getValue();
					if(sn!=""){
						var south=operate.ownerCt.down('xgrksm_return');
						var return_msg=south.getForm().findField('return_msg');
						var oldValue=return_msg.getValue();
						var date=Ext.Date.format(new Date(), 'H:i:s');
						Ext.Ajax.request({
							url:'/web/mes/xigao/xgrksm.action',
							params:{sn:sn},
							method:'post',
							timeout:3000,
							success:function(response,opts){
								var text=Ext.decode(response.responseText);
								return_msg.setValue(oldValue+date+": "+text.returnMes+"\r\n");
								south.getEl().down('textarea').dom.scrollTop = 999999;
							}
						});	
					
					}else{
						Ext.Msg.alert("系统提示","SN不能为空!");
					}						
				}
			},
			
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
							 （锡膏上线扫描）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/				

			'panel[xtype=xgsxsm_operate] textfield[name=sn]':{
				specialkey:function(field,e){
					if(e.getKey()==e.ENTER){
						var operate=field.up('form');
						var baseForm=operate.getForm();
						var sn=baseForm.findField('sn').getValue();
						if(sn!=""){
							//后台操作
							Ext.Ajax.request({
								url:'/web/mes/overall/txn_tinol_on_line_show.action',
								params:{sn:sn},
								method:'post',
								timeout:3000,
								success:function(response,opts){
									var text=Ext.decode(response.responseText);
									var data=text.data[0];
									baseForm.findField('number_code').setValue(data.TinolCode);
									baseForm.findField('name').setValue(data.TinolName);
									baseForm.findField('type').setValue(data.TinolType);
									baseForm.findField('in_time').setValue(data.TinolDate);
									baseForm.findField('effective_date').setValue(data.EffectDate);
									baseForm.findField('in_date').setValue(data.FactoryTime);
								}
							});
						}else{
							Ext.Msg.alert("系统提示","SN不能为空!");
						}
					}
				}
			},
			
			'panel[xtype=xgsxsm_operate] button[action=scan1]':{
				click:function(e,eOpts){
					var operate=e.ownerCt.ownerCt;
					var baseForm=operate.getForm();
					var sn=baseForm.findField('sn').getValue();
					var mo=baseForm.findField('mo').getValue();
					var smtline=baseForm.findField('smtline').getValue();
					var usernumber=baseForm.findField('usernumber').getValue();
					if(sn!=""){
						var south=operate.ownerCt.down('xgsxsm_return');
						var return_msg=south.getForm().findField('return_msg');
						var oldValue=return_msg.getValue();
						var date=Ext.Date.format(new Date(), 'H:i:s');
						Ext.Ajax.request({
							url:'/web/mes/xigao/xgsxsm.action',
							params:{sn:sn,mo:mo,smtline:smtline,usernumber:usernumber},
							method:'post',
							timeout:3000,
							success:function(response,opts){
								var text=Ext.decode(response.responseText);
								return_msg.setValue(oldValue+date+": "+text.returnMes+"\r\n");
								south.getEl().down('textarea').dom.scrollTop = 999999;
							}
						});	
					
					}else{
						Ext.Msg.alert("系统提示","SN不能为空!");
					}						
				}
			},
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
							 （锡膏使用记录查询 ）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/	
			/** 确认按钮触发以下事件 */
			'panel[xtype=xgsyjlcx.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click2(e);		
				}	
			},		
		
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=xgsyjlcx.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},		
			
			//MO回车
			'panel[xtype=xgsyjlcx.operate] textfield[name=mo]':{
				specialkey:function(field,e){
					if(e.getKey()==e.ENTER){
						Ext.create("core.util.model.XiGaoBaseFormTextFieldAction").click(field);
					}
				}
			},
			
			'panel[xtype=xgsyjlcx.operate] textfield[name=sn]':{
				specialkey:function(field,e){
					if(e.getKey()==e.ENTER){
						Ext.create("core.util.model.XiGaoBaseFormTextFieldAction").click(field);
					}
				}
			},
			
			//SN回车
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
							 （锡膏库存查询）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/				
			 /** 确认按钮触发以下事件 */
			'panel[xtype=xgkccx.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click2(e);		
				}	
			},		
		
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=xgkccx.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			}
			
			/************************************************************************************
											控制事件结束
			 ************************************************************************************/
		});
	}
	
});