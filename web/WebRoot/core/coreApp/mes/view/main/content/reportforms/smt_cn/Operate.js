/*******************************************************************************
 * <SMT产能查询>
 ******************************************************************************/

Ext.define("core.mes.view.main.content.reportforms.smt_cn.Operate", {
	extend : "core.mes.base.BaseForm",
	alias : 'widget.smt_cn.operate',
	items : [
	
		
		{
		xtype : 'searchgrid',
		// emptyText:'请输入工单',
		fieldLabel : '工单',
		name : 'smt_cn_mo',
		allowBlank : false,
		width : 255,
		onTrigger2Click : function() {
			var type="S";
			var me = this;
			var w = Ext.getCmp('mes_smt_cn_operate_mo_win'); // 通过ID获取显示所有信息窗口
			if (!w) { // 判断如果所有信息窗口不存在则建立一个窗口
				var win = Ext.create('core.mes.view.main.content.viewList.MOName_SMT_ViewList_View',{
					title : 'MO搜索界面',
					id : 'mes_smt_cn_operate_mo_win',
					listeners : {
						beforeclose : function(eOpts) {
							me.setValue(eOpts.text[0]);
							me.ownerCt.items.items[1].setValue(eOpts.text[1]);
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
	}, {
		xtype : 'textfield',
		fieldLabel : '料号',
		name : 'smt_cn_pn'
			// emptyText:'请输入料号'
		}, {
		xtype : 'textfield',
		name : 'smt_cn_ddh',
		fieldLabel : '订单号'
			// emptyText:'请输入订单号',
		}, {
		xtype : 'combo',
		fieldLabel : '手机工作中心',
		name : 'smt_cn_workcenter',
		store : 'core.mes.store.viewList.Workcenter_ViewList_Store',
		queryMode : 'remote',// remote local
		// emptyText:'请选择工作中心',
		displayField : 'WorkcenterName',
		// allowBlank:false,
		valueField : 'WorkcenterName'
	}, {
		xtype : 'datetimefield',
		// emptyText:'点击选择时间',
		fieldLabel : '起始时间',
		format : 'Y-m-d H:i:s',
		name : 'smt_cn_begin',
		// allowBlank:false,
		maxValue : new Date()
	}, {
		xtype : 'datetimefield',
		// emptyText:'点击选择时间',
		format : 'Y-m-d H:i:s',
		fieldLabel : '截止时间',
		// allowBlank:false,
		name : 'smt_cn_end'
	}]
});