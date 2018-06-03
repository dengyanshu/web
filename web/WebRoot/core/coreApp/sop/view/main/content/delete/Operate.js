 /***************************************************************************
  								<SOP查看操作界面> 
 ***************************************************************************/
 
  Ext.define("core.sop.view.main.content.delete.Operate",{
 	extend:"Ext.form.FormPanel",
 	alias:'widget.delete_sop_operate',
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