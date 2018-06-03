 /***************************************************************************
  								<工单物料出库明细查询> 
 ***************************************************************************/
 
  Ext.define("core.mes.view.main.content.reportforms.gdwlckmx.Operate",{
  	extend:"core.mes.base.BaseForm",
 	alias:'widget.gdwlckmx.operate',
	items:[
/*		{
			xtype:'combo',
			name:'gdwlckmx_pn',
			fieldLabel: '查询方式',
			store:Ext.create("Ext.data.Store",{
				fields:['name1','name2'],
				data:[
					{name1:'a',name2:'料号库位查询'},
					{name1:'b',name2:'料号查询入库'}
				]
			}),
			queryMode: 'local',
			//emptyText:'请选择查询方式:',
			displayField: 'name2',
			//allowBlank:false,
		    valueField: 'name1'
		},*/

/*		{
			xtype:'textfield',
			text:'请输入工单',
			name:'gdwlckmx_mo',
			fieldLabel: '工单',
			allowBlank:false
			
		},
		{
			xtype:'textfield',
			text:'请输入料号',
			name:'gdwlckmx_pn',
			fieldLabel: '料号'
			
		},*/
		{
			xtype : 'searchgrid',
			// emptyText:'请输入工单',
			fieldLabel : '工单',
			name : 'gdwlckmx_mo',
			//allowBlank : false,
			width : 255,
			onTrigger2Click : function() {
				var type="";
				var me = this;
				var w = Ext.getCmp('mes_gdwlckmx_operate_mo_win'); // 通过ID获取显示所有信息窗口
				if (!w) { // 判断如果所有信息窗口不存在则建立一个窗口
					var win = Ext.create('core.mes.view.main.content.viewList.MOName_SMT_ViewList_View',{
						title : 'MO搜索界面',
						id : 'mes_gdwlckmx_operate_mo_win',
						listeners : {
							beforeclose : function(eOpts) {
								me.setValue(eOpts.text[0]);
							}
						}
	
					}).show();
					var store = Ext.data.StoreManager.get('core.mes.store.viewList.MOName_SMT_ViewList_Store');
					Ext.create("core.util.model.MOName_SMT_ViewList").on(win,store,type);	
				} else {
					w.show();
					var store = Ext.data.StoreManager.get('core.mes.store.viewList.MOName_SMT_ViewList_Store');
					Ext.create("core.util.model.MOName_SMT_ViewList").on(w,store,type);
				}
	
			}
		},
		{
			xtype : 'searchgrid',
			// emptyText:'请输入工单',
			fieldLabel : '料号',
			name : 'gdwlckmx_pn',
			//allowBlank : false,
			width : 255,
			onTrigger2Click : function() {
				var type="";
				var me = this;
				var w = Ext.getCmp('mes_gdwlckmx_operate_pn_win'); // 通过ID获取显示所有信息窗口
				if (!w) { // 判断如果所有信息窗口不存在则建立一个窗口
					var win = Ext.create('core.mes.view.main.content.viewList.MOName_SMT_ViewList_View',{
						title : 'MO搜索界面',
						id : 'mes_gdwlckmx_operate_pn_win',
						listeners : {
							beforeclose : function(eOpts) {
								me.setValue(eOpts.text[1]);
							}
						}
	
					}).show();
					var store = Ext.data.StoreManager.get('core.mes.store.viewList.MOName_SMT_ViewList_Store');
					Ext.create("core.util.model.MOName_SMT_ViewList").on(win,store,type);	
				} else {
					w.show();
					var store = Ext.data.StoreManager.get('core.mes.store.viewList.MOName_SMT_ViewList_Store');
					Ext.create("core.util.model.MOName_SMT_ViewList").on(w,store,type);
				}
	
			}
		}		
	]
 });