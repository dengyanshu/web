Ext.define("core.sop.view.main.content.delete.Result",{
	extend:'Ext.grid.GridPanel',
	alias:'widget.delete_sop_result',
	title:'资源列表',
	store:'core.sop.store.delete.Store',
	loadMask:true,	
	stripeRows:true,								//斑马线效果
	multiSelect:true,								//运行多选
	selType:'checkboxmodel', 						//设定选择模式(check)
	frame:true,	
	tbar:[
		{text:'删除',action:'delete'},
		{text:'保存',action:'save'}
	],
	columns:[  
		Ext.create("Ext.grid.RowNumberer",{header:'序号',width: 50,align:'center'}),
		{header:'ID',dataIndex:'id',hidden:true},
		{header:"产品名称",dataIndex:'name',sortable:true,width:130,
			field:{xtype:'textfield',allowBlank:false}
		},
		{header:"制程别",dataIndex:'processing',sortable:true,width:110,
			editor: {
                xtype: 'combobox',
                typeAhead: true,
                queryModel:'local',
				displayField:'name',
				valueField:'name',                
                triggerAction: 'all',
                selectOnTab: true,
                store: 'core.sop.store.add.ProcedureStore',
                lazyRender: true,
                listClass: 'x-combo-list-small'
            }
		},
		{header:"上传日期",dataIndex:'date',sortable:true,width:130,
			field:{xtype:'datetimefield',allowBlank:false,format:'Y-m-d H:i:s'}
		},
		{header:"机型",dataIndex:'type',sortable:true,width:130,
			editor: {
                xtype: 'combobox',
                typeAhead: true,
                queryModel:'local',
				displayField:'name',
				valueField:'name',
                triggerAction: 'all',
                selectOnTab: true,
                store: 'core.sop.store.add.TypeStore',
                lazyRender: true,
                listClass: 'x-combo-list-small'
            }
		}	
	],
	plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],	
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.sop.store.delete.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
		}];

	this.callParent(arguments);  //初始化后的参数传给上级
	}
});