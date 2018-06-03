 /***************************************************************************
  								<收料查询操作界面> 
 ***************************************************************************/
  Ext.define("core.mes.view.main.content.reportforms.iqc.Operate",{
 	extend:"core.mes.base.BaseForm",
 	alias:'widget.iqc.operate',
	items:[
/*		{
			xtype:'textfield',
			fieldLabel: '料号',
			//emptyText:'请输入料号',
			value:'130002-0124-01',
			name:'iqc_pn',
			allowBlank:false
		}	*/
		{
			xtype : 'searchgrid',
			// emptyText:'请输入工单',
			fieldLabel : '料号',
			name : 'iqc_pn',
			//value:'130002-0124-01',
			allowBlank : false,
			width : 255,
			onTrigger2Click : function() {
				var type="";
				var me = this;
				var w = Ext.getCmp('mes_iqc_operate_pn_win'); // 通过ID获取显示所有信息窗口
				if (!w) { // 判断如果所有信息窗口不存在则建立一个窗口
					var win = Ext.create('core.mes.view.main.content.viewList.MOName_SMT_ViewList_View',{
						title : 'MO搜索界面',
						id : 'mes_iqc_operate_pn_win',
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