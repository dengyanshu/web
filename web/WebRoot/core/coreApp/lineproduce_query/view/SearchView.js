Ext.define("core.lineproduce_query.view.SearchView", {
			extend : 'Ext.form.Panel',
			alias : 'widget.lineproduce_search',
			region : 'west',
			width : 150,
			bodyPadding : 5,
			defaults : {
				anchor : '100%'
			},
			defaultType : 'textfield',
			layout : 'anchor',
			fieldDefaults:{labelAlign:'top'},
			collapsible:true,
			items : [ {
						xtype:'combo',
						displayField:'statusV',
			        	valueField:'statusK',
			        	name:'status',
			        	fieldLabel:'线体选择',
			        	queryMode:'local',
			        	store:Ext.create("Ext.data.Store",{
			        		fields:['statusK','statusV'],
			        		data:[
			        			{"statusK":'1B-2FA-L01',"statusV":'1B-2FA-L01'},
			        			{"statusK":'1B-2FA-L02',"statusV":'1B-2FA-L02'},
{"statusK":'1B-2FA-L03',"statusV":'1B-2FA-L03'},{"statusK":'1B-2FA-L04',"statusV":'1B-2FA-L04'},{"statusK":'1B-2FA-L05',"statusV":'1B-2FA-L05'},{"statusK":'1B-2FA-L06',"statusV":'1B-2FA-L06'},
{"statusK":'1B-2FA-L07',"statusV":'1B-2FA-L07'},{"statusK":'1B-2FA-L08',"statusV":'1B-2FA-L08'},{"statusK":'1B-2FA-L09',"statusV":'1B-2FA-L09'},{"statusK":'1B-2FA-L10',"statusV":'1B-2FA-L10'},
{"statusK":'1B-2FA-L11',"statusV":'1B-2FA-L11'},{"statusK":'1B-2FA-L12',"statusV":'1B-2FA-L12'},{"statusK":'1B-2FA-L13',"statusV":'1B-2FA-L13'},{"statusK":'1B-2FA-L14',"statusV":'1B-2FA-L14'},
{"statusK":'1B-2FA-L15',"statusV":'1B-2FA-L15'},{"statusK":'1B-2FA-L16',"statusV":'1B-2FA-L16'},{"statusK":'1B-2FA-L17',"statusV":'1B-2FA-L17'},{"statusK":'1B-2FA-L18',"statusV":'1B-2FA-L18'},			        			
{"statusK":'1B-2FA-L19',"statusV":'1B-2FA-L19'},{"statusK":'1B-2FA-L20',"statusV":'1B-2FA-L20'},{"statusK":'1B-2FA-L21',"statusV":'1B-2FA-L21'},{"statusK":'1B-2FA-L22',"statusV":'1B-2FA-L22'},
{"statusK":'1B-2FA-L23',"statusV":'1B-2FA-L23'},{"statusK":'1B-2FA-L24',"statusV":'1B-2FA-L24'},{"statusK":'1B-2FA-L25',"statusV":'1B-2FA-L25'},{"statusK":'1B-2FA-L26',"statusV":'1B-2FA-L26'},		
{"statusK":'1B-2FB-L27',"statusV":'1B-2FB-L27'},{"statusK":'1B-2FB-L28',"statusV":'1B-2FB-L28'},{"statusK":'1B-2FB-L29',"statusV":'1B-2FB-L29'},{"statusK":'1B-2FB-L30',"statusV":'1B-2FB-L30'},
{"statusK":'1B-2FB-L31',"statusV":'1B-2FB-L31'},{"statusK":'1B-2FB-L32',"statusV":'1B-2FB-L32'},{"statusK":'1B-2FB-L33',"statusV":'1B-2FB-L33'},{"statusK":'1B-2FB-L34',"statusV":'1B-2FB-L34'},
{"statusK":'1B-2FB-L35',"statusV":'1B-2FB-L35'},{"statusK":'1B-2FB-L36',"statusV":'1B-2FB-L36'},{"statusK":'1B-2FB-L37',"statusV":'1B-2FB-L37'},{"statusK":'1B-2FB-L38',"statusV":'1B-2FB-L38'},
{"statusK":'1B-2FB-L39',"statusV":'1B-2FB-L39'}, {"statusK":'1B-2FB-L40',"statusV":'1B-2FB-L40'}
			        			
			        		]
			        	})
			        	}
					],
			buttons:[
				{text:'查找',ref:'submit'}
				
			]
		});