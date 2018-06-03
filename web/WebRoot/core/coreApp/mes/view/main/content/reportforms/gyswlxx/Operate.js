 /***************************************************************************
  								<收料查询操作界面> 
 ***************************************************************************/
 
  Ext.define("core.mes.view.main.content.reportforms.gyswlxx.Operate",{
  	extend:"core.mes.base.BaseForm",
 	alias:'widget.gyswlxx.operate',
	items:[
		{
			xtype:'combo',
			name:'gyswlxx_gys',
			fieldLabel: '供应商',
			store:'core.mes.store.reportforms.gyswlxx.StoreGYS',
			queryMode: 'remote',
			//emptyText:'请选择供应商',
			allowBlank:false,
			displayField: 'VendorDescription',
		    valueField: 'VendorId'
		},
/*		{
			xtype:'textfield',
			fieldLabel: '料号',
			//emptyText:'请输入料号',
			name:'gyswlxx_pn'
			//allowBlank:true,
		},*/
		
		{
			xtype : 'searchgrid',
			// emptyText:'请输入料号',
			fieldLabel : '料号',
			name : 'gyswlxx_pn',
			width : 255,
			onTrigger2Click : function() {
				var type="";
				var me = this;
				var w = Ext.getCmp('mes_gyswlxx_operate_pn_win'); // 通过ID获取显示所有信息窗口
				if (!w) { // 判断如果所有信息窗口不存在则建立一个窗口
					var win = Ext.create('core.mes.view.main.content.viewList.MOName_SMT_ViewList_View',{
						title : 'MO搜索界面',
						id : 'mes_gyswlxx_operate_pn_win',
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
			xtype:'datetimefield',
			//emptyText:'点击选择时间',
			fieldLabel: 'LOT CODE',
			format:'Y-m-d H:i:s',
			name:'gyswlxx_begin'
		},
		{
			xtype:'datetimefield',
			fieldLabel: 'DATE CODE',
			//emptyText:'点击选择时间',
			format:'Y-m-d H:i:s',
			name:'gyswlxx_end'
		}
	]
 });