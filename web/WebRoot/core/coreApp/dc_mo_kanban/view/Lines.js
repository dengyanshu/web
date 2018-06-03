var imageTpl3 = new Ext.XTemplate(

    '<tpl for=".">',
          '<tpl if="hasNext==1"><div class="thumb-wrap" id="{Workcenterid}" style="height:100%;border-radius:8px;background-color:#006699">',
		  '<tpl else><div class="thumb-wrap" id="{Workcenterid} style="height:100%;border-radius: 8px; background-color:#ffffff"></tpl>',
		     '<div class="smt-line-progress">',
		         '<tpl if="flag==3"><div class="smt-line-progress-bar" style="height:100%; background-color:yellow">',
		         '<tpl elseif="flag==2"><div class="smt-line-progress-bar" style="height:100%; background-color:#ECB1AC">',
		         '<tpl elseif="flag==4"><div class="smt-line-progress-bar" style="height:100%; background-color:green">',
		     	 '<tpl else><div class="smt-line-progress-bar" style="height:100%; background-color:red"></tpl>',
		           '<span class="smt-line-progress_val" style="font-size:18px;">{WorkcenterName}线<br/></span>',
 			 	   '<p class="smt-line-progress_val2"   >{Site}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp </p>',
 				
		          
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

Ext.define("core.dc_mo_kanban.view.Lines",{
	extend:'Ext.Panel',
	alias:'widget.dc_mo_kb_lines',
	id:'images-view-ff',
	title:'大仓看板',
	
	autoScroll:true,
	//bodyStyle: 'background:#2a2a2a;color:#FF0000;',
	items:[
	{
			    labelAlign:'right',
			    labelWidth:55,
				xtype:'combo',
				displayField:'employeeCode',
	        	valueField:'employeeCode',
	        	//name:'status',
	        	fieldLabel:'仓管员',
	        	//value:'14110031',
	        	queryMode:'local',
	        	store:Ext.create("Ext.data.Store",{
	        		fields:['employeeid','employeeCode'],
	        		data:[
	        		    {"employeeid":'0001',"employeeCode":'14110031'},
	        		    {"employeeid":'0002',"employeeCode":'14110032'},
	        		    {"employeeid":'0003',"employeeCode":'14110033'},
	        		    {"employeeid":'0004',"employeeCode":'14110034'}
	        		    
	        		]
	        	}),
	        	listeners:{ 
	        	 /* blur : function(f){
				    	var childStore = Ext.data.StoreManager.map['core.dc_mo_kanban.store.Store'];
				    	childStore.removeAll();
						childStore.getProxy().extraParams={employee:this.value};
						childStore.load();
   			      }  */
   			      select:function(  combo, records,  eOpts ){
   			      	    var childStore = Ext.data.StoreManager.map['core.dc_mo_kanban.store.Store'];
				    	childStore.removeAll();
						childStore.getProxy().extraParams={employee:this.value};
						childStore.load();
   			      }
	           }
		   },	
	{
		xtype:'dataview',
		store:'core.dc_mo_kanban.store.Store',
		tpl:imageTpl3,
		overItemCls:'x-item-over',
		itemSelector:'div.thumb-wrap'
	}]
//	dockedItems:[
//	    {
//	    xtype:'toolbar',
//		dock:'bottom',
//		items:[
//		    {xtype:'label',text:'内圈'},'-',
//			{xtype:'label',html:'<img src="/web/core/css/image/grid/green.gif"/>'},
//			{xtype:'label',text:'代表当前工单生产正常'},'-',
//			{xtype:'label',html:'<img src="/web/core/css/image/grid/red.gif"/>'},
//			{xtype:'label',text:'代表当前工单生产异常'}
//			
//			
//		]
//	
//	    }
//	
//	]
});







