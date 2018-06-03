var imageTpl = new Ext.XTemplate(

    '<tpl for=".">',
          '<tpl if="hasNext==1"><div class="thumb-wrap" id="{Workcenterid}" style="height:100%;border-radius: 8px; background-color:#006699">',
		  '<tpl else><div class="thumb-wrap" id="{Workcenterid} style="height:100%;border-radius: 8px; background-color:#ffffff"></tpl>',
		     '<div class="smt-line-progress">',
		         '<tpl if="this.needAlert(isAlert)==false"><div class="smt-line-progress-bar" style="height:100%; background-color:#86e01e">',
		     	 '<tpl else><div class="smt-line-progress-bar" style="height:100%; background-color:#ff0000"></tpl>',
		           '<span class="smt-line-progress_val">{WorkcenterName}线<br/></span>',
 			 	   '<p class="smt-line-progress_val2" style="font-size:12px">{MoName}</p>',
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

Ext.define("core.smt_line_kanban_view.Lines",{
	extend:'Ext.Panel',
	alias:'widget.smt_line_kb_lines',
	id:'images-view',
	title:'SMT线别',
	
	autoScroll:true,
	//bodyStyle: 'background:#2a2a2a;color:#FF0000;',
	items:[{
		xtype:'dataview',
		store:'core.smt_line_kanban.store.Store',
		tpl:imageTpl,
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




//var imageTpl = new Ext.XTemplate(     
//		   '<tpl for=".">',
//		 		 '<tpl if="DoneRequired &gt;= 0">',
//			 		'<div class="thumb-wrap" id="{Workcenterid}">',
//					    '<div class="smt-line-progress">',
//					         ' <div class="smt-line-progress-bar" style="height:100%; background-color:#33CCFF">',
//					     	    '<span class="smt-line-progress_val">{WorkcenterName}线<br/></span>',
//			 			 	    '<p class="smt-line-progress_val2"></p>',
//					        ' </div>',
//					    '</div>',
//					'</div>',
//		         '<tpl else>',
//			 		'<div class="thumb-wrap" id="{Workcenterid}">',
//					    '<div class="smt-line-progress">',
//					         ' <div class="smt-line-progress-bar" style="height:{value1}%; background-color:{value2}">',
//					     	     '<span class="smt-line-progress_val">{WorkcenterName}线<br/></span>',
//			 			 	     '<p class="smt-line-progress_val2">&nbsp &nbsp &nbsp当前生产工单<br/>{MoName}<br/>&nbsp &nbsp &nbsp &nbsp{DoneRequired}</p>',
//					         ' </div>',
//					    '</div>',
//					'</div>',
//			     '</tpl>',
//		   '</tpl>',
//		 
//
//		   '<div class="x-clear"></div>'  
//		);






