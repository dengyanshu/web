 /***************************************************************************
  								<物料查询操作界面> 
 ***************************************************************************/
 
  Ext.define("core.mes.view.main.content.reportforms.wl.Operate",{
  	extend:"core.mes.base.BaseForm",
 	alias:'widget.wl.operate',
	items:[
		{
			xtype:'combo',
			fieldLabel: 'A/B面:',
			name:'wl_ab',
			store:Ext.create("Ext.data.Store",{
				fields:['name1','name2'],
				data:[
					{name1:'a',name2:'A'},
					{name1:'b',name2:'B'}
				]
			}),
			queryMode: 'local',
			//emptyText:'请选择A/B面',
			displayField: 'name2',
			allowBlank:false,
		    valueField: 'name1'
		},
		{
			xtype:'combo',
			fieldLabel: '主机名',
			allowBlank:false,
			name:'wl_host',
			store:[
			'S022','S011','S012','S013','S021','S022','S023','S031','S032',
			'S033','S041','S042','S043','S051','S052','S053','S061','S062',
			'S063','S071','S072','S073','S081','S082','S083','S091','S092',
			'S093'
			]
			//emptyText:'请选择主机名',
		},
	
		{
			xtype : 'searchgrid',
			// emptyText:'请输入工单',
			fieldLabel : '工单',
			name:'wl_mo',
			//value:'MO010213110315',
			allowBlank : false,
			width : 255,
			onTrigger2Click : function() {
				var type="";
				var me = this;
				var w = Ext.getCmp('mes_wl_operate_mo_win'); // 通过ID获取显示所有信息窗口
				if (!w) { // 判断如果所有信息窗口不存在则建立一个窗口
					var win = Ext.create('core.mes.view.main.content.viewList.MOName_SMT_ViewList_View',{
						title : 'MO搜索界面',
						id : 'mes_wl_operate_mo_win',
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
/*		{
			xtype:'searchgrid',
			fieldLabel: '工单',
			//emptyText:'请输入工单',
			name:'wl_mo',
			value:'MO010213110315',
			allowBlank:false,
			onTrigger2Click:function(){
		      var me=this;
		      var w=Ext.getCmp('mes_wl_operate_mo_win');         //通过ID获取显示所有信息窗口
		      if(!w){										    //判断如果所有信息窗口不存在则建立一个窗口
				var win = Ext.create('core.mes.view.main.content.viewList.MOName_SMT_ViewList_View', {  	//建立一个窗口用来显示搜索的表格
					title: 'MO搜索界面',
					id:'mes_wl_operate_mo_win',
					listeners : {
						beforeclose : function(eOpts) {
							me.setValue(eOpts.text[0]);
							me.ownerCt.items.items[3].setValue(eOpts.text[1]);
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
		},		*/	
		
		{
			xtype: 'numberfield',
			fieldLabel: '倍数',
       		value: 1,
        	maxValue: 100,
        	allowBlank:false,
        	minValue: 1,
			name:'wl_multiple'
		}
	]
 });