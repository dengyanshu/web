 /***************************************************************************
  								<收料查询操作界面> 
 ***************************************************************************/
 
  Ext.define("core.mes.view.main.content.reportforms.gccxsjscap.Operate",{
	extend:"core.mes.base.BaseForm",
 	alias:'widget.gccxsjscap.operate',
	items:[	
		{
			xtype : 'searchgrid',
			// emptyText:'请输入料号',
			fieldLabel : '料号',
			name : 'gccxsjscap_pn',
			width : 255,
			onTrigger2Click : function() {
				var type="";
				var me = this;
				 me.ownerCt.items.items[1].setValue("");
				var w = Ext.getCmp('mes_gccxsjscap_operate_pn_win'); // 通过ID获取显示所有信息窗口
				if (!w) { // 判断如果所有信息窗口不存在则建立一个窗口
					var win = Ext.create('core.mes.view.main.content.viewList.MOName_SMT_ViewList_View',{
						title : 'PN搜索界面',
						id : 'mes_gccxsjscap_operate_pn_win',
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
	    }, 
		{
			xtype : 'searchgrid',
			// emptyText:'请输入料号',
			fieldLabel : '工单',
			name : 'gccxsjscap_mo',
			width : 255,
			onTrigger2Click : function() {
				var type="";
				var me = this;
				me.ownerCt.items.items[0].setValue("");
				var w = Ext.getCmp('mes_gccxsjscap_operate_mo_win'); // 通过ID获取显示所有信息窗口
				if (!w) { // 判断如果所有信息窗口不存在则建立一个窗口
					var win = Ext.create('core.mes.view.main.content.viewList.MOName_SMT_ViewList_View',{
						title : 'PN搜索界面',
						id : 'mes_gccxsjscap_operate_mo_win',
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
	    }	    	
		
	]
 });