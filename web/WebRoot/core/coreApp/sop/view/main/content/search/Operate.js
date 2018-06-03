 /***************************************************************************
  								<SOP查看操作界面> 
 ***************************************************************************/
 
 
  Ext.define("core.sop.view.main.content.search.Operate",{
 	extend:"Ext.form.FormPanel",
 	alias:'widget.search_sop_operate',
 	title:'查询条件',
 	height:120,
 	frame:true,
	bodyStyle:'padding:5px 5px 0',
	layout:"absolute",
	buttonAlign:"center",
	defaults:{width:150,xtype:'textfield'},
	labelAlign:"left",
	collapsible:true,
	items:[
		{
			xtype:'label',
			text:'机种名称:',
			x:40,
			y:20
		},
		{
			xtype : 'searchgrid',
			// emptyText:'请输入工单',
			//fieldLabel : '工单',
			name : 'name',
			allowBlank : false,
			width : 150,
			x:100,
			y:15,
			onTrigger2Click : function() {
				var type="";
				var me = this;
				var w = Ext.getCmp('mes_sop_pn_win'); // 通过ID获取显示所有信息窗口
				if (!w) { // 判断如果所有信息窗口不存在则建立一个窗口
					var win = Ext.create('core.sop.view.MOName_SMT_ViewList_View',{
						title : 'MO搜索界面',
						id : 'mes_sop_pn_win',
						modal:true,
						listeners : {
							beforeclose : function(eOpts) {
								me.setValue(eOpts.text[1]);
							}
						}
	
					}).show();
					var store = Ext.data.StoreManager.get('core.sop.store.MOName_SMT_ViewList_Store');
					Ext.create("core.util.model.MOName_SMT_ViewList").on(win,store,type);	
				} else {
					w.show();
					var store = Ext.data.StoreManager.get('core.sop.store.MOName_SMT_ViewList_Store');
					Ext.create("core.util.model.MOName_SMT_ViewList").on(w,store,type);
				}
	
			}
		},		
	
/*		{
			xtype:'searchgrid',
			emptyText:'请输入机种名称',
			value:'9',
			name:'name',
			allowBlank:false,
		    onTriggerClick: function() {
		      var me=this;
		      var w=Ext.getCmp('sop-search-operate-win');    //通过ID获取显示所有信息窗口
		      if(!w){										 //判断如果所有信息窗口不存在则建立一个窗口
				var win = Ext.create('Ext.window.Window', {  	//建立一个窗口用来显示搜索的表格
					title: 'PN搜索界面',
					id:'sop-search-operate-win',
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
							store:'core.sop.store.AllData',
						    columns: [
								{ header: '工单',  dataIndex: 'MOName' },
								{ header: '产品名称', dataIndex: 'ProductName'},
								{ header: '产品描述', dataIndex: 'ProductDescription'},
								{ header: '机型', dataIndex: 'ProductFamilyShortName',flex: 1 }
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
				var store=win.items.items[0].store;				//当点击获取工单查找按钮后，用AJAX获取后台数据
				store.load();
			}else{											//判断如果所有信息窗口存在则用show方法将其显示
				w.show();
		    }	
		    },			
			width:150,
			x:100,
			y:15
		},*/
	
		{
			xtype:'label',
			text:'制程别:',
			x:300,
			y:20			
		},
		{
			xtype:'combo',
			name:'zcb',
			emptyText:'请选择制程别',
			store:'core.sop.store.add.ProcedureStore',
			queryModel:'local',
			displayField:'name',
			valueField:'name',
			x:360,
			y:15
		}
	],
	buttons:[{text:'确定',action:'enter'},{text:'清除',action:'reset'}]
 });