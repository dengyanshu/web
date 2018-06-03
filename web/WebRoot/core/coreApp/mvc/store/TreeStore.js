Ext.define("core.mvc.store.TreeStore",{
	extend:'Ext.data.TreeStore',
	    root: {
	        expanded: true,
	        children: [
	            { text: "test1", id:'0001',name:'testgrid1',leaf:true },
	            { text: "test2", id:'0002',name:'testgrid2',leaf: true }
	        ]
	    }
	});