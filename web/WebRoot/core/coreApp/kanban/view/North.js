Ext.define("core.kanban.view.North",{
	extend:'Ext.form.FormPanel',
	alias:'widget.kanban.north',
	title:'看板查询',
	height:120,
 	frame:true,
	bodyStyle:'padding:5px 5px 0',
    layout:"absolute",
	buttonAlign:"center",
	defaults:{width:150,xtype:'textfield'},
	labelAlign:"left",
	collapsible:true,
	buttons:[{text:'确定',action:'enter'},{text:'清除',action:'reset'}],
	items:[
		{
			xtype:'label',
			text:'选择:',
			x:350,
			y:20
		},
		{
			xtype:'combo',
			emptyText:'请输选择',
		    queryMode: 'local',
    		displayField: 'name',
    		valueField: 'abbr',
   			store:Ext.create('Ext.data.Store', {
    		fields: ['abbr', 'name'],
    			data : [
       				 {"abbr":"kanban1", "name":"SMT"},
       				 {"abbr":"kanban2", "name":"仓库"}
    			]
			}),
			x:400,
			y:20
		}
	]	
});