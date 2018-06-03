 /***************************************************************************
  								<收料查询操作界面> 
 ***************************************************************************/
 
  Ext.define("core.mes.view.main.content.reportforms.gdbl.Operate",{
  	extend:"core.mes.base.BaseForm",
 	alias:'widget.gdbl.operate',
	items:[	
/*		{
			xtype:'searchgrid',
			fieldLabel: '工单',
			//emptyText:'请输入工单',
			name:'gdbl_mo',
			value:'MO010112070777',
			allowBlank:false,
			onTrigger2Click:function(){
		      var me=this;
		      var w=Ext.getCmp('mes_sljl_operate_mo_win');         //通过ID获取显示所有信息窗口
		      if(!w){										    //判断如果所有信息窗口不存在则建立一个窗口
				var win = Ext.create('core.mes.view.main.content.viewList.AllDataView', {  	//建立一个窗口用来显示搜索的表格
					title: 'MO搜索界面',
					id:'mes_sljl_operate_mo_win',
					listeners : {
						beforeclose : function(eOpts) {
							me.setValue(eOpts.text[0]);
						}
					}
				}).show();
				var store=win.items.items[0].store;				//当点击获取工单查找按钮后，用AJAX获取后台数据
				store.load();
			}else{											//判断如果所有信息窗口存在则用show方法将其显示
				w.show();
				var store=w.items.items[0].store;	
				store.load();
		    }	
		    },					
			width:255
		},	
		*/
		{
			xtype : 'searchgrid',
			// emptyText:'请输入工单',
			fieldLabel : '工单',
			name : 'gdbl_mo',
			allowBlank : false,
			width : 255,
			onTrigger2Click : function() {
				var type="";
				var me = this;
				var w = Ext.getCmp('mes_gdbl_operate_mo_win'); // 通过ID获取显示所有信息窗口
				if (!w) { // 判断如果所有信息窗口不存在则建立一个窗口
					var win = Ext.create('core.mes.view.main.content.viewList.MOName_SMT_ViewList_View',{
						title : 'MO搜索界面',
						id : 'mes_gdbl_operate_mo_win',
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
			xtype:'textfield',
			fieldLabel: '料号',
			//emptyText:'请输入料号',
			//allowBlank:false,
			name:'gdbl_pn',
			disabled:true			
		}
	]
 });