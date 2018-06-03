/*******************************************************************************
 * <导航类>
 ******************************************************************************/
Ext.define("core.sys_stored_procedure.view.Navigation", {
			extend : 'Ext.tree.TreePanel',
			alias : 'widget.sys_stored_procedure_navigation',
			autoScroll : true, // 自动加载滚动条
			rootVisible : false,// 隐藏主节点
			border : false, //
			animate : true, // 开启动画展示
			lines : true,
			height : 600,
			title : '系统存储过程',
			collapsible : true,
			split : true,
			margins : '5 2 5 5',
			width : 200,
			store : 'core.sys_stored_procedure.store.Store',
			useArrows : true,
			multiSelect : true,
			columns : [{
						xtype : 'treecolumn', // this is so we know which column will show the tree
						text : '模块名',
						width : 200,
						sortable : true,
						dataIndex : 'text',
						locked : true
					}, {
						text : '存储过程名',
						width : 250,
						dataIndex : 'name',
						sortable : true
					}]
		});