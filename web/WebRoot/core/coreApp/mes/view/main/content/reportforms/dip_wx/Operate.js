 /***************************************************************************
  								<在线维修操作界面> 
 ***************************************************************************/
 
  Ext.define("core.mes.view.main.content.reportforms.dip_wx.Operate",{
  	extend:"core.mes.base.BaseForm",
 	alias:'widget.dip_wx.operate',
	items:[
		{
			xtype:'searchgrid',
			fieldLabel: '工单',
			//emptyText:'请输入工单',
			name:'dip_wx_mo',
			//value:'MO010112080091',
			allowBlank:false,
			onTrigger2Click:function(){
		      var me=this;
		      var w=Ext.getCmp('mes_dip_wx_operate_mo_win');         //通过ID获取显示所有信息窗口
		      if(!w){										    //判断如果所有信息窗口不存在则建立一个窗口
				var win = Ext.create('Ext.window.Window', {  	//建立一个窗口用来显示搜索的表格
					title: 'MO搜索界面',
					id:'mes_dip_wx_operate_mo_win',
					height: 400,
					width: 600,
					modal:true,
					closable:true,
					closeAction:'hide',
					layout:'border',
					items:[
						{
						  	xtype:'livesearchgridpanel',
						  	region:'center',	
							store:'core.mes.store.reportforms.dip_wx.StoreMo',
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
					Ext.Ajax.request({
					   url:'/web/mes/overall/moname_viewlist_android.action',
					   params: {key:'d'},
					   success:function(response, opts){
					   		store.proxy.data=Ext.decode(response.responseText);					//把查询结果赋值给数据集
							store.load();												//load重新加载数据集
					    }
					});
			}else{											//判断如果所有信息窗口存在则用show方法将其显示
				w.show();
				var store=w.items.items[0].store;
					Ext.Ajax.request({
					    url:'/web/mes/overall/moname_viewlist_android.action',
					    params: {key:'d'},
					   success:function(response, opts){
					   	 	console.log(response);
					   	 // obj= Ext.decode(response.responseText);		//把后台传来的JSON数据解码成前台数据
						 // store.proxy.data=obj;	
						  store.proxy.data=Ext.decode(response.responseText);	
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
			name:'dip_wx_begin',
	        maxValue: new Date(),
	        allowBlank:false
		},
		{
			xtype:'datetimefield',
			fieldLabel: '截止时间',
			//emptyText:'点击选择时间',
			format:'Y-m-d H:i:s',
			value: new Date(),
			allowBlank:false,
			name:'dip_wx_end'
		}
	]
 });