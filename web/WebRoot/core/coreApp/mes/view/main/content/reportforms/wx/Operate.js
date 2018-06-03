 /***************************************************************************
  								<收料查询操作界面> 
 ***************************************************************************/
 
  Ext.define("core.mes.view.main.content.reportforms.wx.Operate",{
  	extend:"core.mes.base.BaseForm",
 	alias:'widget.wx.operate',
	items:[
		{
			xtype:'combo',
			fieldLabel: '查询类别',
			allowBlank:false,
			name:'wx_type',
			store:Ext.create("Ext.data.Store",{
				fields:['name1','name2'],
				data:[
					//{name1:'d',name2:'DIP功能维修查询'},
					{name1:'d',name2:'在线维修查询'},
					{name1:'p',name2:'手机维修查询'}
				]
			}),
			queryMode: 'local',
			//emptyText:'请选择查询类别',
			displayField: 'name2',
		    valueField: 'name1',
			allowBlank:false
		},	
		{
			xtype:'searchgrid',
			fieldLabel: '工单',
			//emptyText:'请输入工单',
			name:'wx_mo',
			//value:'MO010112080256',
			allowBlank:false,
			onTrigger2Click:function(){
		      var me=this;
		      var value=this.ownerCt.getForm().findField('wx_type').value;
		      var w=Ext.getCmp('mes_wx_operate_mo_win');         //通过ID获取显示所有信息窗口
		      if(!w){										    //判断如果所有信息窗口不存在则建立一个窗口
				var win = Ext.create('Ext.window.Window', {  	//建立一个窗口用来显示搜索的表格
					title: 'MO搜索界面',
					id:'mes_wx_operate_mo_win',
					height: 400,
					width: 600,
					closable:true,
					modal:true,
					closeAction:'hide',
					layout:'border',
					items:[
						{
						  	xtype:'livesearchgridpanel',
						  	region:'center',	
							store:'core.mes.store.reportforms.wx.StoreMo',
						    columns: [
								{ header: '工单号',  dataIndex: 'MOName' },
								{ header: '数量',  dataIndex: 'MakeUpCount' },
								{ header: '产品名称',  dataIndex: 'productName' },
								{ header: '产品规格', dataIndex: 'ProductDescription',flex: 1 }
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
				store.removeAll(true);
					Ext.Ajax.request({
						url:'/web/mes/overall/moname_viewlist_android.action',
					    params: {key:value},
					   success:function(response, opts){
					       obj= Ext.decode(response.responseText);		//把后台传来的JSON数据解码成前台数据
						   store.proxy.data=obj;	
					       store.load();
					    }
					});					
			}else{											//判断如果所有信息窗口存在则用show方法将其显示
				w.show();
				var store=w.items.items[0].store;				//当点击获取工单查找按钮后，用AJAX获取后台数据
				store.removeAll(true);
				Ext.Ajax.request({
					url:'/web/mes/overall/moname_viewlist_android.action',
					params: {key:value},
					success:function(response, opts){
					      obj= Ext.decode(response.responseText);		//把后台传来的JSON数据解码成前台数据
						  store.proxy.data=obj;	
					      store.load();
					}
				});
		    }	
		    },			
			width:255
		},			
		{
			xtype:'datetimefield',
			fieldLabel: '起始时间',
			//emptyText:'点击选择时间',
			format:'Y-m-d H:i:s',
			name:'wx_begin',
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
			name:'wx_end'
		}
	]
 });