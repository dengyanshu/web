var _runner=new Ext.util.TaskRunner();

Ext.define("core.silou_site_kanban.controller.Controller", {
	extend : "Ext.app.Controller",
	mixins:{
		suppleUtil:'core.util.SuppleUtil',
		MaskMsgUtil:'core.util.model.MaskMsgUtil',
		MessageUitl:'core.util.MessageUtil'
	},
	
	init : function() {
		var self = this;
		coreApp = self;				
		this.control(
			{
			'silou_site_kanban_search button[ref=submit]':{
			   click:function(e,Opts){
			   	  _runner.stopAll();
		   	      var   ser=e.ownerCt.ownerCt;
		   	         var  main=ser.ownerCt;
		   	         var  grid=main.down('silou_site_kanban_listview');
		          var   status=ser.getForm().findField('status').getValue();
		          var   WorkcenterId=ser.getForm().findField('WorkcenterId').getValue();
		          var   chaxunrq= Ext.Date.format(new Date(ser.getForm().findField('chaxunrq_site').getValue()),'Y-m-d'); 
		          var   chaxunrq2= Ext.Date.format(new Date(ser.getForm().findField('chaxunrq_site2').getValue()),'Y-m-d'); 
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
		          
		          //  alert(site+':'+shiftname);
		           if(banci=='2') {
		          	  grid.columns[4].setText('20:00');
		          	  grid.columns[5].setText('21:00');
		          	  grid.columns[6].setText('22:00');
		          	  grid.columns[7].setText('23:00');
		          	  grid.columns[8].setText('24:00');
		          	  grid.columns[9].setText('1:00');
		          	  grid.columns[10].setText('2:00');
		          	  grid.columns[11].setText('3:00');
		          	  grid.columns[12].setText('4:00');
		          	  grid.columns[13].setText('5:00');
		          	  grid.columns[14].setText('6:00');
		          	  grid.columns[15].setText('7:00');
		           }
		           
		           else if(banci=='1'||banci==undefined) {
		          	  grid.columns[4].setText('8:00');
		          	  grid.columns[5].setText('9:00');
		          	  grid.columns[6].setText('10:00');
		          	  grid.columns[7].setText('11:00');
		          	  grid.columns[8].setText('12:00');
		          	  grid.columns[9].setText('13:00');
		          	  grid.columns[10].setText('14:00');
		          	  grid.columns[11].setText('15:00');
		          	  grid.columns[12].setText('16:00');
		          	  grid.columns[13].setText('17:00');
		          	  grid.columns[14].setText('18:00');
		          	  grid.columns[15].setText('19:00');
		           }
		          
		          
		           var reList ={
					  run: function(){
					  	var store = Ext.data.StoreManager.map['core.silou_site_kanban.store.Store'];
						store.removeAll();
						store.getProxy().extraParams={status:status,chaxunrq:chaxunrq,chaxunrq:chaxunrq,banci:banci,WorkcenterId:WorkcenterId};
						store.load();
					  },
					  interval : 60000
					};
			        _runner.start(reList);
			   }
			},
			
			'window[id=8a81a0f05542bc7a015543b3d91f0001_win]':{
					beforehide:function(e,Opts){
						_runner.stopAll();
						//alert('here contr2');
					}
			 }
		}
		);
	},	
	views : ['core.silou_site_kanban.view.Main',
		'core.silou_site_kanban.view.SearchView',
		'core.silou_site_kanban.view.ResultView'
		,'core.silou_site_kanban.view.ChartView'
		],
		
	stores : ['core.silou_site_kanban.store.Store',
	'core.silou_line_kanban.store.sl.Store'
	],
	
	models : ['core.silou_site_kanban.model.Model']
});