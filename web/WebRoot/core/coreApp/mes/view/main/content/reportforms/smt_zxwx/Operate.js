 /***************************************************************************
  								<SMT在线维修查询> 
 ***************************************************************************/

  Ext.define("core.mes.view.main.content.reportforms.smt_zxwx.Operate",{
  	extend:"core.mes.base.BaseForm",
 	alias:'widget.smt_zxwx.operate',
	items:[
		{
			xtype:'textfield',
			fieldLabel: '批号',
			//emptyText:'请输入批号',
			name:'smt_zxwx_sn'
			//value:'03010089B70012531843',
			//allowBlank:false,
		},
		/********ID隐藏按钮***********/
		{
			xtype:'textfield',
			name:'smt_zxwx_moId',
			hidden:true
		},		
		{
			xtype : 'searchgrid',
			// emptyText:'请输入工单',
			fieldLabel : '工单',
			name : 'smt_zxwx_mo',
			allowBlank : false,
			width : 255,
			onTrigger2Click : function() {
				var type="S";
				var me = this;
				var w = Ext.getCmp('mes_smt_zxwx_operate_mo_win'); // 通过ID获取显示所有信息窗口
				if (!w) { // 判断如果所有信息窗口不存在则建立一个窗口
					var win = Ext.create('core.mes.view.main.content.viewList.MOName_SMT_ViewList_View',{
						title : 'MO搜索界面',
						id : 'mes_smt_zxwx_operate_mo_win',
						listeners : {
							beforeclose : function(eOpts) {
								me.setValue(eOpts.text[0]);
								me.ownerCt.items.items[1].setValue(eOpts.text[2]);
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
			fieldLabel: '起始时间',
			//emptyText:'点击选择时间',
			format:'Y-m-d H:i:s',
			name:'smt_zxwx_begin',
			allowBlank:false,
	        maxValue: new Date()
		},
		{
			xtype:'datetimefield',
			fieldLabel: '截止时间',
			//emptyText:'点击选择时间',
			format:'Y-m-d H:i:s',
			//value: new Date(),
			allowBlank:false,
			maxValue: new Date(),
			name:'smt_zxwx_end'
		}
	]
 });