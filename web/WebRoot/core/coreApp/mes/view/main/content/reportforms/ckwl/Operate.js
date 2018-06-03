 /***************************************************************************
  								<收料查询操作界面> 
 ***************************************************************************/
 
  Ext.define("core.mes.view.main.content.reportforms.ckwl.Operate",{
  	extend:"core.mes.base.BaseForm",
 	alias:'widget.ckwl.operate',
	items:[
		{
			xtype:'combo',
			fieldLabel: '查询方式',
			name:'ckwl_type',
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
			allowBlank:false,
		    valueField: 'name1'
		},	
/*		
		{
			xtype:'textfield',
			fieldLabel: '料号',
			name:'ckwl_pn',
			//emptyText:'请输入料号',
			value:'100408-0018-01',
			allowBlank:false
		},
*/		
		{
			xtype : 'searchgrid',
			// emptyText:'请输入料号',
			fieldLabel : '料号',
			name : 'ckwl_pn',
			//value:'100408-0018-01',
			width : 255,
			onTrigger2Click : function() {
				var type="";
				var me = this;
				var w = Ext.getCmp('mes_ckwl_operate_pn_win'); // 通过ID获取显示所有信息窗口
				if (!w) { // 判断如果所有信息窗口不存在则建立一个窗口
					var win = Ext.create('core.mes.view.main.content.viewList.MOName_SMT_ViewList_View',{
						title : 'PN搜索界面',
						id : 'mes_ckwl_operate_pn_win',
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