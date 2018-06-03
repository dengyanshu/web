 /***************************************************************************
  								<收料查询操作界面> 
 ***************************************************************************/
 
  Ext.define("core.xigao.view.main.content.xgsxsm.Operate",{
  	extend:"core.xigao.base.XiGaoBaseForm",
 	alias:'widget.xgsxsm_operate',
	items:[
		{
			xtype:'label',
			text:'工单:',
			x:20,
			y:15
		},
		{
			xtype : 'searchgrid',
			name : 'mo',
			allowBlank : false,
			width : 150,
			onTrigger2Click : function() {
				var me = this;
				var w = Ext.getCmp('xgsxsm_mo_win'); // 通过ID获取显示所有信息窗口
				if (!w) { // 判断如果所有信息窗口不存在则建立一个窗口
					var win = Ext.create('core.xigao.view.main.content.viewList.MOName_SMT_ViewList_View',{
						title : 'MO搜索界面',
						id : 'xgsxsm_mo_win',
						listeners : {
							beforeclose : function(eOpts) {
								me.setValue(eOpts.text[0]);
								me.ownerCt.items.items[3].setValue(eOpts.text[1]);
								me.ownerCt.items.items[5].setValue(eOpts.text[3]);
							}
						}
	
					}).show();
					var store = Ext.data.StoreManager.get('core.xigao.store.viewList.MOName_SMT_ViewList_Store');
					Ext.create("core.util.model.MOName_SMT_ViewList").on(win,store);	
				} else {
					w.show();
					var store = Ext.data.StoreManager.get('core.xigao.store.viewList.MOName_SMT_ViewList_Store');
					Ext.create("core.util.model.MOName_SMT_ViewList").on(w,store);
				}
			},
			
			x:20,
			y:35
		},
		{
			xtype:'label',
			text:'料号:',
			x:200,
			y:15
		},
		{
			xtype:'textfield',
			allowBlank:false,
			name:'pn',
			x:200,
			y:35
		},
		{
			xtype:'label',
			text:'产品描述:',
			x:380,
			y:15
		},
		{
			xtype:'textfield',
			allowBlank:false,
			name:'executor_operator',
			x:380,
			y:35
		},
		

//////////////////////////////////////////////////////////				
		{
			xtype:'label',
			text:'锡膏条码SN:',
			x:20,
			y:75
		},
		{
			xtype:'textfield',
			allowBlank:false,
			name:'sn',
			x:20,
			y:95
		},
		{
			xtype:'label',
			text:'编码代码:',
			x:200,
			y:75
		},
		{
			xtype:'textfield',
			name:'number_code',
			x:200,
			y:95
		},
		{
			xtype:'label',
			text:'锡膏名:',
			x:380,
			y:75
		},
		{
			xtype:'textfield',
			name:'name',
			x:380,
			y:95
		},
		
////////////////////////////////////////////////////////////	
		{
			xtype:'label',
			text:'进厂日期:',
			x:20,
			y:145
		},
		{
			xtype:'textfield',
			name:'in_date',
			x:20,
			y:165
		},
		{
			xtype:'label',
			text:'有效日期:',
			x:200,
			y:145
		},
		{
			xtype:'textfield',
			name:'effective_date',
			x:200,
			y:165
		},
		{
			xtype:'label',
			text:'锡膏入库时间:',
			x:380,
			y:145
		},
		{
			xtype:'textfield',
			name:'in_time',
			x:380,
			y:165
		},
///////////////////////////////////////////////////
		{
			xtype:'label',
			text:'锡膏型号:',
			x:20,
			y:215
		},
		{
			xtype:'textfield',
			name:'type',
			x:20,
			y:235
		},
		{
			xtype:'label',
			text:'SMT线别:',
			x:200,
			y:215
		},
		{
			xtype:'combo',
			name:'smtline',
			store:'core.xigao.store.viewList.WorkcenterOfSMT_ViewList',
			queryMode: 'remote',
			displayField: 'SMTLineNO',
		    valueField: 'SMTLineNO', //WorkcenterId
		    x:200,
			y:235
		},
		{
			xtype:'label',
			text:'扫描人工号:',
			x:380,
			y:215
		},
		{
			xtype:'textfield',
			allowBlank:false,
			name:'usernumber',
			x:380,
			y:235
		}
	],
	buttons:[
		{text:'锡膏上线扫描',action:'scan1'}
		//,{text:'锡膏信息显示',action:'scan2'}
		]
 });