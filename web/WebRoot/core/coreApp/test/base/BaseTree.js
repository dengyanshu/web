/**
* 定义基础的树
*/
Ext.define("core.test.base.BaseTree",{
	extend:'Ext.tree.TreePanel',
	alias:'widget.tj_sc_kb_basetree',
    autoScroll:true, //自动加载滚动条
    rootVisible:false,//隐藏主节点
    border:false,	//
    animate:true,	//开启动画展示
    lines:true,
    height:600
});
