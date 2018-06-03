 /***************************************************************************
  								<收料查询操作界面> 
 ***************************************************************************/
 
  Ext.define("core.mes.view.main.content.reportforms.cn.Operate",{
  	extend:"core.mes.base.BaseForm",
 	alias:'widget.cn.operate',
	items:[
		{
			xtype:'searchgrid',
			//emptyText:'请输入料号',
			name:'cn_pn',
			fieldLabel: '料号',
			allowBlank:false,
			onTrigger2Click:function(){
		      var me=this; 
		      me.ownerCt.items.items[1].setValue("");
		      var w=Ext.getCmp('mes_cn_operate_pn_win');         //通过ID获取显示所有信息窗口
		      if(!w){										    //判断如果所有信息窗口不存在则建立一个窗口
				var win = Ext.create('Ext.window.Window', {  	//建立一个窗口用来显示搜索的表格
					title: 'PN搜索界面',
					id:'mes_cn_operate_pn_win',
					height: 400,
					width: 600,
					closable:true,
					closeAction:'hide',
					layout:'border',
					renderTo:Ext.getBody(),
					items:[
						{
						  	xtype:'livesearchgridpanel',
						  	region:'center',
							store:'core.mes.store.reportforms.cn.StorePn',
						    columns: [
								{ header: '料号', dataIndex: 'ProductName' },
								{ header: '机型', dataIndex: 'ProductFamilyName',flex: 1 }
							],
							listeners:{
							//添加一个事件把表格获取到的值赋给name然后再关闭窗口
								itemclick:function(record,item,index,e,eOpts ){
									 var name=record.getSelectionModel().selected.items[0].raw['ProductName'];
									  me.setValue(name);
									  win.close();
								}	
							}							    
						}
					]
				}).show();
				var store=win.items.items[0].store;
				store.load();
			}else{											//判断如果所有信息窗口存在则用show方法将其显示
				w.show();
				var store=w.items.items[0].store;
				store.load();
		    }	
		    },			
			width:255
		},				
		{			
			xtype:'searchgrid',
			fieldLabel: '工单',
			//emptyText:'请输入工单',
			name:'cn_mo',
			onTrigger2Click:function(){
			  var me=this;
		      var value=this.ownerCt.getForm().findField('cn_pn').rawValue;
		      if(value==""){
		      		Ext.Msg.alert("系统提示","没有检测到料号，请输入料号!");
		      }else{
			      var me=this; 
			      var w=Ext.getCmp('mes_cn_operate_mo_win');         //通过ID获取显示所有信息窗口
			      if(!w){										    //判断如果所有信息窗口不存在则建立一个窗口
					var win = Ext.create('Ext.window.Window', {  	//建立一个窗口用来显示搜索的表格
						title: 'PN搜索界面',
						id:'mes_cn_operate_mo_win',
						height: 400,
						width: 600,
						closable:true,
						closeAction:'hide',
						modal:true,
						layout:'border',
						renderTo:Ext.getBody(),
						items:[
							{
							  	xtype:'livesearchgridpanel',
							  	region:'center',
								store:'core.mes.store.reportforms.cn.StoreMo',
							    columns: [
									{ header: '工单', dataIndex: 'MOName' },
									{ header: '产品描述', dataIndex: 'ProductDescription',flex: 1 }
								],
								listeners:{
								//添加一个事件把表格获取到的值赋给name然后再关闭窗口
									itemclick:function(record,item,index,e,eOpts ){
										 var name=record.getSelectionModel().selected.items[0].raw['MOName'];
										  me.setValue(name);
										  win.close();
									}	
								}							    
							}
						]
					}).show();
					
					var store=win.items.items[0].store;				//当点击获取工单查找按钮后，用AJAX获取后台数据
					Ext.Ajax.request({
					    url: '/web/mes/overall/cn_mo.action',
					    params: {pn:value},
					   success:function(response, opts){
					    	obj= Ext.decode(response.responseText);		//把后台传来的JSON数据解码成前台数据
							store.proxy.data=obj;	
					        store.load();
					    }
					});
				}else{											//判断如果所有信息窗口存在则用show方法将其显示
					w.show();
					var store=w.items.items[0].store;				//当点击获取工单查找按钮后，用AJAX获取后台数据
					Ext.Ajax.request({
					    url: '/web/mes/overall/cn_mo.action',
					    params: {pn:value},
					   success:function(response, opts){
					    	obj= Ext.decode(response.responseText);		//把后台传来的JSON数据解码成前台数据
							store.proxy.data=obj;	
					        store.load();
					    }
					});
			    }
		      }
		    },			
			width:255
		},	
		{
			xtype:'datetimefield',
			fieldLabel: '起始时间',
			//emptyText:'点击选择时间',
			format:'Y-m-d H:i:s',
			name:'cn_begin',
			allowBlank:false,
	        maxValue: new Date()
		},
		{
			xtype:'datetimefield',
			fieldLabel: '截止时间',
			//emptyText:'点击选择时间',
			format:'Y-m-d H:i:s',
			value: new Date(),
			allowBlank:false,
			name:'cn_end'
		}
	]
 });