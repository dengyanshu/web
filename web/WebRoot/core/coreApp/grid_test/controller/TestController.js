/**
 * �����������
 */
Ext.define("core.grid_test.controller.TestController",{
	extend:"Ext.app.Controller",
	init:function(){
		var self=this;
		//事件注册
		this.control({
			
			/**
			 * 表格添加
			 */
			'panel[xtype=testgrid] button[ref=add]':{
				click:function(but){
					var grid=but.up('testgrid');
					var store=grid.getStroe();
					var edit=grid.editing;
					edit.cancelEdit();
					store.insert(0,"{Name:sadfasf}")
					edit.startEditByPosition({
						row:0,column:2
					});
				}				
			},
			
			/**
			 * 表格删除
			 */
			'panel[xtype=testgrid] button[ref=delete]':{
				click:function(but){
					var grid=but.up('testgrid');
					var store=grid.getStroe();
				}				
			},
			
			/**
			 * 表格保存
			 */
			'panel[xtype=testgrid] button[ref=save]':{
				click:function(but){
					var grid=but.up('testgrid');
					var store=grid.getStroe();
				}				
			}
		});
	},
	views:[
		"core.grid_test.view.TestGrid",
		"core.grid_test.view.TestForm",
		"core.grid_test.view.TestPanel"
	],
	stores:[
		"core.grid_test.store.test1.Store"
	],
	models:[
		"core.grid_test.model.test1.Model"
	]
});