 /***************************************************************************
  								<SMT贴片类型查询> 
 ***************************************************************************/
 
  Ext.define("core.mes.view.main.content.reportforms.smt_tplx.Operate",{
  	extend:"core.mes.base.BaseForm",
 	alias:'widget.smt_tplx.operate',
	items:[
		{
			xtype : 'searchgrid',
			// emptyText:'请输入工单',
			fieldLabel : '工单',
			name : 'smt_tplx_mo',
			allowBlank : false,
			width : 255,
			onTrigger2Click : function() {
				var type="S";
				var me = this;
				var w = Ext.getCmp('mes_smt_tplx_operate_mo_win'); // 通过ID获取显示所有信息窗口
				if (!w) { // 判断如果所有信息窗口不存在则建立一个窗口
					var win = Ext.create('core.mes.view.main.content.viewList.MOName_SMT_ViewList_View',{
						title : 'MO搜索界面',
						id : 'mes_smt_tplx_operate_mo_win',
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
		}]
 });