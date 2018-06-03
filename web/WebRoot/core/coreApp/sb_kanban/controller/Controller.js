Ext.define("core.sb_kanban.controller.Controller", {
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
			'panel[xtype=sb_kanban_listview]' : {
				itemclick : function(e, eOpts) {		
					var InstrumentId=eOpts.data.InstrumentId;
					var win=Ext.create("core.sb_kanban.view.SBMaintenanceList",{
					}).show();
					var mask=self.msg(win);
					
					var store=Ext.data.StoreManager.map['core.sb_kanban.store.sb.ListStore'];

					mask.show();
					store.removeAll();
					store.load({params:{InstrumentId:InstrumentId}});
					mask.hide();
				}
			},
			'sb_kanban_search button[ref=submit]':{
			   click:function(e,Opts){
		   	      var ser=e.ownerCt.ownerCt;
		          var BelongDivision=ser.getForm().findField('BelongDivision').getValue();
		          //var factory=ser.getForm().findField('factory').getValue();
		          var InstrumentType= ser.getForm().findField('InstrumentType').getValue(); 
		          var UserDepartments= ser.getForm().findField('UserDepartments').getValue(); 
		          var status=ser.getForm().findField('status').getValue();
                   
			  	  var store = Ext.data.StoreManager.map['core.sb_kanban.store.Store'];
				  store.removeAll();
				  store.getProxy().extraParams={
					  BelongDivision:BelongDivision,InstrumentType:InstrumentType,UserDepartments:UserDepartments,status:status};
				  store.load();

			   		}
				}
			}		
					
		);
	},


	views : ['core.sb_kanban.view.Main',
		'core.sb_kanban.view.SearchView',
		'core.sb_kanban.view.ResultView',
		'core.sb_kanban.view.SBMaintenanceList'
		],
		
	stores : ['core.sb_kanban.store.Store',
	          'core.sb_kanban.store.sb.Store',
	          'core.sb_kanban.store.sb.ListStore'
	],
	
	models : ['core.sb_kanban.model.Model',
	         'core.sb_kanban.model.sb.ListModel'
	          ]
});