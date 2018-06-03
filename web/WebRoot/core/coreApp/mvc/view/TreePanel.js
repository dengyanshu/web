Ext.define("core.mvc.view.TreePanel",{
	extend:'Ext.tree.Panel',
	    title: 'Simple Tree',
	    xtype:'mvc_treepanel',
	    width: 200,
	    store: 'core.mvc.store.TreeStore',
	    rootVisible: false,
	
});