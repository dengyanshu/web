 /***************************************************************************
  								<SOP添加界面> 
 ***************************************************************************/
 
  Ext.define("core.sop.view.main.content.add.Operate",{
 	extend:"Ext.form.FormPanel",
 	alias:'widget.add_sop_operate',
 	title:'添加条件',
 	bodyStyle:'padding:5 5 5 5',
 	frame:true,
 	region:'center',
	layout:"absolute",
	buttonAlign:"center",
	labelAlign:"left",
	defaults:{
		labelSeparator:':',
		labelWidth:100,
		height:25,
		width:300,
		allowBlank:false,
		msgTarget:'side',
		labelAlign:'left'
	},
	items:[
	
/*		{
			xtype:'textfield',
			fieldLabel : "机种名称",
			name:'name',
			x:135,
			y:20
		},*/
		{
			xtype : 'searchgrid',
			// emptyText:'请输入工单',
			fieldLabel : "机种名称",
			name : 'name',
			allowBlank : false,
			width : 300,
			x:135,
			y:20,
			onTrigger2Click : function() {
				var type="";
				var me = this;
				var w = Ext.getCmp('mes_sop_pn_win'); // 通过ID获取显示所有信息窗口
				if (!w) { // 判断如果所有信息窗口不存在则建立一个窗口
					var win = Ext.create('core.sop.view.MOName_SMT_ViewList_View',{
						title : 'MO搜索界面',
						id : 'mes_sop_pn_win',
						modal:true,
						listeners : {
							beforeclose : function(eOpts) {
								me.setValue(eOpts.text[1]);
							}
						}
	
					}).show();
					var store = Ext.data.StoreManager.get('core.sop.store.MOName_SMT_ViewList_Store');
					Ext.create("core.util.model.MOName_SMT_ViewList").on(win,store,type);	
				} else {
					w.show();
					var store = Ext.data.StoreManager.get('core.sop.store.MOName_SMT_ViewList_Store');
					Ext.create("core.util.model.MOName_SMT_ViewList").on(w,store,type);
				}
	
			}
		},	
		{
			xtype:'filefield',
			fieldLabel : "SOP路径",
			name:'path',
			allowBlank:true,
			 msgTarget: 'side', 
			emptyText:'请选择文件',
			buttonText:'选择文件',
			buttonConfig:{
				iconCls:'upload-icon'
			},
			x:135,
			y:60

		},
		{
			xtype:'combo',
			fieldLabel:'机型',
			name:'type',
			store:'core.sop.store.add.TypeStore',
			queryModel:'local',
			displayField:'name',
			valueField:'name',
			x:135,
			y:100
		},
		{
			xtype:'combo',
			fieldLabel:'制程别',
			name:'zcb',
			store:'core.sop.store.add.ProcedureStore',
			queryModel:'local',
			displayField:'name',
			valueField:'name',
			x:135,
			y:140
		}
		
	],
	buttons:[{text:'确定',action:'enter'},{text:'清除',action:'reset'}]
 });