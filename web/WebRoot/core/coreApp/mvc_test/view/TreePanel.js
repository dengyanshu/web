Ext.define("core.mvc_test.view.TreePanel",{
	extend:'Ext.tree.Panel',
	    title: 'Simple Tree',
	    xtype:'mvc_treepanel',
	    width: 200,
	    store: 'core.mvc_test.store.TreeStore',
	    rootVisible: false,
	
});