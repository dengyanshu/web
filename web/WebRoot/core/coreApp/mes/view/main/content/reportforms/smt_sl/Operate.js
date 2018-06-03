 /***************************************************************************
  								<SMT上料查询> 
 ***************************************************************************/
 
  Ext.define("core.mes.view.main.content.reportforms.smt_sl.Operate",{
  	extend:"core.mes.base.BaseForm",
 	alias:'widget.smt_sl.operate',
	items:[
		{
		xtype : 'searchgrid',
		// emptyText:'请输入工单',
		fieldLabel : '工单',
		name : 'smt_sl_mo',
		allowBlank : false,
		width : 255,
		onTrigger2Click : function() {
			var type="S";
			var me = this;
			var w = Ext.getCmp('mes_smt_sl_operate_mo_win'); // 通过ID获取显示所有信息窗口
			if (!w) { // 判断如果所有信息窗口不存在则建立一个窗口
				var win = Ext.create('core.mes.view.main.content.viewList.MOName_SMT_ViewList_View',{
					title : 'MO搜索界面',
					id : 'mes_smt_sl_operate_mo_win',
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
			xtype:'combo',
			fieldLabel: 'SMT线别',
			name:'smt_sl_line',
			store:Ext.create("Ext.data.Store",{
				fields:['name'],
				data:[
					{name:'S01'},{name:'S02'},{name:'S03'},{name:'S04'},{name:'S05'},{name:'S06'},{name:'S07'},
					{name:'S08'},{name:'S09'},{name:'S10'},{name:'S11'},{name:'S12'},{name:'S13'},{name:'S14'},
					{name:'S15'},{name:'S16'},{name:'S17'},{name:'S18'},{name:'S19'},{name:'S20'},{name:'S21'},
					{name:'S22'},{name:'S23'},{name:'S24'},{name:'S25'},{name:'S26'},{name:'S27'},{name:'SMT测试'}
				]
			}),
			queryMode: 'local',
			//emptyText:'请选择线别',
			displayField: 'name',
			//allowBlank:false,
		    valueField: 'name'
		},	
		{
			xtype:'combo',
			fieldLabel: '机台',
			name:'smt_sl_station',
			store:Ext.create("Ext.data.Store",{
				fields:['name'],
				data:[
					{name:'1'},{name:'2'},{name:'3'},{name:'4'},{name:'5'}

				]
			}),
			queryMode: 'local',
			//emptyText:'请选择工作中心',
			displayField: 'name',
			//allowBlank:false,
		    valueField: 'name'
		}		

	]
 });