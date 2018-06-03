var pheight = comm.get("resolutionHeight")*0.7;
var northheight = 150;
var southheight = (pheight - northheight) / 2;

Ext.define("core.smt_cn_kanban.view.MainLayout",{
	extend:'Ext.Panel',
	alias:'widget.smt_kanban_cn',
	layout:'border',
	items:[
		{xtype:'smt_kb_cn_north',region :'north',height:northheight},
		{xtype:'smt_kb_cn_center',region:'center',flex:1	},
		{xtype:'smt_kb_cn_sonth',region:'south',flex:1	}
	]
});


