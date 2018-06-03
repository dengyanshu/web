

Ext.define("core.silou_line_kanban.controller.Controller", {
	extend : "Ext.app.Controller",
	mixins:{
		MessageUtil : 'core.util.MessageUtil'
	},
	
	init : function() {
		var self = this;
		coreApp = self;				
		this.control({
			'silou_line_kanban_search button[ref=submit]':{
			   click:function(e,Opts){
		   	      var   ser=e.ownerCt.ownerCt;
		   	      var  main=ser.ownerCt;
		          var   WorkcenterId=ser.getForm().findField('WorkcenterId').getValue();
		          if(WorkcenterId==null){
		          	Ext.Msg.alert('警告','线体必须选择，才能查询出结果！！');
		          }
		          var   status=ser.getForm().findField('status').getValue();
		          var   chaxunrq= Ext.Date.format(new Date(ser.getForm().findField('chaxunrq').getValue()),'Y-m-d'); 
		          var   chaxunrq2= Ext.Date.format(new Date(ser.getForm().findField('chaxunrq2').getValue()),'Y-m-d'); 
		          var   banci=ser.getForm().findField('banci').getValue();
	              if(banci==null){
	            	   var  now_date= new Date().getHours();
	            	   if(now_date>=8 &&now_date<20){
	            	   	   banci='1';
	            	   }
	            	   else{
	            	   	  banci='2';
	            	   }
	           	   }
		            
		           
		       
		          
		          var  grid=main.down('silou_line_kanban_listview');
		          if(banci=='2') {
		          	  grid.columns[5].setText('20:00');
		          	  grid.columns[6].setText('21:00');
		          	  grid.columns[7].setText('22:00');
		          	  grid.columns[8].setText('23:00');
		          	  grid.columns[9].setText('24:00');
		          	  grid.columns[10].setText('1:00');
		          	  grid.columns[11].setText('2:00');
		          	  grid.columns[12].setText('3:00');
		          	  grid.columns[13].setText('4:00');
		          	  grid.columns[14].setText('5:00');
		          	  grid.columns[15].setText('6:00');
		          	  grid.columns[16].setText('7:00');
		           }
		            else if(banci=='1') {
		          	  grid.columns[5].setText('8:00');
		          	  grid.columns[6].setText('9:00');
		          	  grid.columns[7].setText('10:00');
		          	  grid.columns[8].setText('11:00');
		          	  grid.columns[9].setText('12:00');
		          	  grid.columns[10].setText('13:00');
		          	  grid.columns[11].setText('14:00');
		          	  grid.columns[12].setText('15:00');
		          	  grid.columns[13].setText('16:00');
		          	  grid.columns[14].setText('17:00');
		          	  grid.columns[15].setText('18:00');
		          	  grid.columns[16].setText('19:00');
		           }
		         ///
					var store = Ext.data.StoreManager.map['core.silou_line_kanban.store.Store'];
					store.removeAll();
					store.getProxy().extraParams={WorkcenterId:WorkcenterId,status:status,chaxunrq:chaxunrq,chaxunrq2:chaxunrq2,banci:banci};
					store.load();
			   }
			}
			
			
		});
	},	
	views : ['core.silou_line_kanban.view.Main',
	'core.silou_line_kanban.view.ResultView',
	'core.silou_line_kanban.view.SearchView',
	'core.silou_line_kanban.view.ChartView'
	],
		
	stores : ['core.silou_line_kanban.store.Store',
	'core.silou_line_kanban.store.sl.Store'],
	
	models : ['core.silou_line_kanban.model.Model']
});


