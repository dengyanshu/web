/**
* 定义基础的树
*/


//初始化提示
Ext.QuickTips.init();

Ext.define("core.sop.base.SopBaseTree",{
	extend:'Ext.tree.TreePanel',
	alias:'widget.sop.basetree',
    autoScroll:true, //自动加载滚动条
    //root:root,
    rootVisible:false,//隐藏主节点
    border:false,	//
    animate:true,	//开启动画展示
    lines:true,
    //collapsible:true,
    //enableDD:true,
    height:600
    //store:store,
    //store:'core.mes.store.tree.Function1Store',
    /*
	dockedItems:[{
		xtype:'toolbar',
		dock:'left',
		//ui:'footer',
		items:[
			{xtype:'button',text:'add',id:'add'},
			{xtype:'button',text:'copy',id:'copy'},
			{xtype:'button',text:'delete',id:'delete'}
		]
	},{
		xtype:'toolbar',
		items:[{
			xtype:'button',
			id:'allopen',
			text:'展开全部'
		},{
			xtype:'button',
			id:'allclose',
			text:'收起全部'
		}]
	}], 
	*/
    //split:true
    /*
    tbar:[
    	{
    		text:"展开",
    		handler:function(){tree.expandAll();}
    	},
    	{
    		text:"折叠",
    		handler:function(){
    			tree.collapseAll();
    			//tree.root.expand();
    		}
    	}
    ]
    */
    /*
    listeners: {
    	//单击事件
		itemclick:function(view,record,item,index,e,eOpts){ 
                // 从record item index 等参数中我们可以获得大部分满足我们应用的信息
               if(record.get('text')=='SOP��Ŀ1'){};
               if(record.get('text')=='SOP��Ŀ2'){alert(index);};
        },
        //双击事件
        itemdblclick:function(view,record,item,index,e,eOpts){ 
                
               if(record.get('text')=='SOP��Ŀ2'){alert("XXXX")};
        }
     }	
	*/
});
