Ext.define("core.app.base.BaseQueryPanel",{
extend : 'Ext.form.Panel',
alias : 'widget.basequerypanel',
layout:"column",
title:"组合查询",
border:2,
frame:true,
autoScroll : true,
animCollapse : true,
collapsible:true,
bodyPadding : '10 20 0 20',
defaults:{
	margin:"10 0 0 0 0",
	xtype : 'textfield',
	labelAlign : 'right',
	columnWidth : .5
},
buttonAlign:"center",
buttons:[{
	text : '查询',
	ref : 'queryBtn',
	iconCls : 'tree_ok'
					
	},{
	text: '重置',
	ref : 'resetBtn',
	iconCls : 'tree_delete'
}]
});