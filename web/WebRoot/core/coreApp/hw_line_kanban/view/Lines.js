var imageTpl4 = new Ext.XTemplate(
    '<tpl for=".">',
          '<tpl if="hasNext==1"><div class="thumb-wrap"  style="height:100%;border-radius:8px;margin:10px;background-color:#006699">',
		  '<tpl else><div class="thumb-wrap" style="margin:10px"></tpl>',
		     '<div class="smt-line-progress">',
		         '<tpl if="this.needAlert(isAlert)==false"><div class="smt-line-progress-bar" style="height:100%; background-color:#86e01e">',
		     	 '<tpl else><div class="smt-line-progress-bar" style="height:100%; background-color:#ff0000"></tpl>',
		           '<span class="smt-line-progress_val" style="background-color:#006699">{WorkcenterName}</span><br/>',
		           '<p class="smt-line-progress_val4" >{FlowName}</p>',
 			 	   '<p class="smt-line-progress_val2" >{MoName}</p>',
		        ' </div>',
		     '</div>',
		 '</div>',
   '</tpl>',
   
   
   '<div class="x-clear"></div>',
  {  
        // XTemplate configuration:  
        compiled: true,  
        // member functions:  
         
        needAlert: function(alert){  
           return alert >=1;  
        }  
   }
  
);

//'<div class="thumb-wrap" id="{Workcenterid}" style="height:100%;background-color:#FFFF00">',

Ext.define("core.hw_line_kanban_view.Lines",{
	extend:'Ext.Panel',
	alias:'widget.hw_line_kb_lines',
	id:'images-view-hw',
	title:'华为线体',
	
	autoScroll:true,
	//bodyStyle: 'background:#2a2a2a;color:#FF0000;',
	items:[{
		xtype:'dataview',
		store:'core.hw_line_kanban.store.Store',
		tpl:imageTpl4,
		overItemCls:'x-item-over',
		itemSelector:'div.thumb-wrap'
	}],
	dockedItems:[{
		xtype:'toolbar',
		dock:'bottom',
		items:[
		    {xtype:'label',text:'外圈 '},'-',
		    {xtype:'label',html:'<img src="/web/core/css/image/grid/white.gif"/>'},
			{xtype:'label',text:'代表线体没有下个工单'},'-',
			{xtype:'label',html:'<img src="/web/core/css/image/grid/green2.gif"/>'},
			{xtype:'label',text:'代表线体存在下个工单'}
		]
	    },
	    {
	    xtype:'toolbar',
		dock:'bottom',
		items:[
		    {xtype:'label',text:'内圈'},'-',
			{xtype:'label',html:'<img src="/web/core/css/image/grid/green.gif"/>'},
			{xtype:'label',text:'代表当前工单生产正常'},'-',
			{xtype:'label',html:'<img src="/web/core/css/image/grid/red.gif"/>'},
			{xtype:'label',text:'代表当前工单生产异常'}
			
			
		]
	
	    }
	
	]
});







