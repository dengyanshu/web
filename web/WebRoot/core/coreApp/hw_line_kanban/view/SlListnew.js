Ext.define("core.hw_line_kanban.view.SlListnew",{
      extend : "Ext.form.Panel",
	  alias : 'widget.hw_line_sl_listnew_kb',
	  //layout:'fit',
	  //frame:true,
	  //renderTo:Ext.getBody(),
	  border:false,
	  bodyStyle:"background:black;padding:5px",
	  //background-color:#dfe8f6
//	  reader : new Ext.data.JsonReader(
//	  	   {
//	        root:'data',
//	        successProperty: 'success'
//	        //totalProperty:'totalCount'
//	        },
//	        [
//	        {name: 'MoName' , mapping:'MoName'},
//	        {name: 'WorkcenterName' , mapping:'WorkcenterName'},
//	        {name: 'ProductName' , mapping:'ProductName'},
//	        {name: 'StandardProductivity' , mapping:'StandardProductivity'},
//	        {name: 'StandardNumOfPeople' , mapping:'StandardNumOfPeople'},//biaozhunrenli
//	        {name: 'WOSN' , mapping:'WOSN'},
//	        {name: 'CustomerModel' , mapping:'CustomerModel'},//huaweibianma
//	        {name: 'Productivity' , mapping:'Productivity'},//实际产能
//	        {name: 'StandardNumOfPeople' , mapping:'StandardNumOfPeople'},//实际人力
//	        {name: 'MOQtyDone' , mapping:'MOQtyDone'},//wangongshuliang
//	        {name: 'MOQtyRequired' , mapping:'MOQtyRequired'},
//	        {name: 'TimeSlice1' , mapping:'TimeSlice1'},
//	        {name: 'StandardProduct1' , mapping:'StandardProduct1'},
//	        {name: 'Productivity1' , mapping:'Productivity1'},
//	        {name: 'Efficiency1' , mapping:'Efficiency1'},
//	        {name: 'TimeSlice2' , mapping:'TimeSlice2'},
//	        {name: 'StandardProduct2' , mapping:'StandardProduct2'},
//	        {name: 'Productivity2' , mapping:'Productivity2'},
//	        {name: 'Efficiency2' , mapping:'Efficiency2'}
//	    	]),
	  items:[
	  
	  {
	   	layout:'column',
	   	baseCls:'x-plain',
	   	items:[
	   	{
	   	  layout:'form',
	   	  columnWidth:.2,
	   	  baseCls:'x-plain',
	   	  items:[{
	   	     xtype:'textfield',
		   	 name:'WorkcenterName',
		   	 id:'WorkcenterName',
		   	 height:212,
		   	 fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:20px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
		   	 readOnly : true
		   	  
	   	 }]
	   },
	   {
	   	 columnWidth:.8,
	   	 baseCls:'x-plain',
	   	 items:[
	   	 	    {   
	       	      layout:'column',
	       	      baseCls:'x-plain',
	       	      items:[
	       	      {   
	       	     	 layout:'form',
	       	     	 columnWidth:.2,
	       	     	 baseCls:'x-plain',
	       	     	 items:[{
	       	     	 	labelSeparator:'',
		       	     	labelAlign : 'top',
		       	     	labelStyle  : 'text-align:center;color:white;font-weight:bold;font-size:30px;height:40px;',
		       	     	height:100,
	       	     	 	xtype:'textfield',
	       	     	 	fieldLabel:'工单号',
		   	            fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:20px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
		   	 			readOnly : true,
		   	            ///1111
	    	       	 	name:'MoName',
	    	       	 	id:'MoName'
	       	     	 }]
	       	     	
	       	     },
	       	     {  
	       	     	layout:'form',
	       	     	columnWidth:.2,
	       	     	baseCls:'x-plain',
	       	     	items:[{
	       	     		labelSeparator:'',
		       	     	labelAlign : 'top',
		       	     	labelStyle  : 'text-align:center;color:white;font-weight:bold;font-size:30px;height:40px;',
		       	     	height:100,
		       	     	 fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:20px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
		   	 			readOnly : true,
	       	     	 	xtype:'textfield',
		       	     	 fieldLabel:'卓翼料号',
		       	     	 id:'ProductName',
		    	       	 name:'ProductName'
	    	       	}]
	       	     },
	       	     {  
	       	     	layout:'form',
	       	     	columnWidth:0.2,
	       	     	baseCls:'x-plain',
	       	     	items:[{
	       	     		labelSeparator:'',
		       	     	labelAlign : 'top',
		       	     labelStyle  : 'text-align:center;color:white;font-weight:bold;font-size:30px;height:40px;',
		       	     	height:100,
		       	     	 fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:20px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
		   	 			readOnly : true,
	       	     	 	xtype:'textfield',
	       	     	 fieldLabel:'标准产能',
	    	       	 name:'StandardProductivity',id:'StandardProductivity'}]
	       	     },
	       	     {
	       	     	layout:'form',
	       	     	columnWidth:0.2,
	       	     	baseCls:'x-plain',
	       	     	items:[{
	       	     		labelSeparator:'',
		       	     	labelAlign : 'top',
		       	    labelStyle  : 'text-align:center;color:white;font-weight:bold;font-size:30px;height:40px;',
		       	     	height:100,
		       	     	 fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:20px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
		   	 			readOnly : true,
	       	     	 	xtype:'textfield',
	       	     	 fieldLabel:'标准人力',
	    	       	 name:'StandardNumOfPeople',id:'StandardNumOfPeople'}]
	       	     },
	       	     {
	       	     	layout:'form',
	       	     	columnWidth:0.2,
	       	     	baseCls:'x-plain',
	       	     	items:[{
	       	     		labelSeparator:'',
		       	     	labelAlign : 'top',
		       	     	labelStyle  : 'text-align:center;color:white;font-weight:bold;font-size:30px;height:40px;',
		       	     	height:100,
		       	     	 fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:20px;background:none;border:2px green solid;border-bottom:2px green solid;',
		   	 			readOnly : true,
	       	     	 	xtype:'textfield',
	       	     	fieldLabel:'工单批量',
	    	      name:'MOQtyRequired'}]
	       	     }
	       	     ]
	   	 	},
	   	 	//下横布局
	   	 	{
	   	 	 
	       	     layout:'column',
	       	     baseCls:'x-plain',
	       	     items:[
	       	     {
	       	     	layout:'form',
	       	     	columnWidth:.2,
	       	     	baseCls:'x-plain',
	       	     	items:[{
	       	     		labelSeparator:'',
		       	     	labelAlign : 'top',
		       	     	labelStyle  : 'text-align:center;color:white;font-weight:bold;font-size:30px;height:40px;',
		       	     	height:100,
		       	     	fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:20px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
		   	 			readOnly : true,
	       	     	 	xtype:'textfield',
	       	     	 fieldLabel:'任务令',
	    	       	 name:'WOSN',id:'WOSN'
	    	       	 }]
	       	     },
	       	     {
	       	     	layout:'form',
	       	     	columnWidth:.2,
	       	     	baseCls:'x-plain',
	       	     	items:[{
	       	     		labelSeparator:'',
		       	     	labelAlign : 'top',
		       	     	labelStyle  : 'text-align:center;color:white;font-weight:bold;font-size:30px;height:40px;',
		       	     	height:100,
		       	     	fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:20px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
		   	 			readOnly : true,
	       	     	 	xtype:'textfield',
	       	     	 fieldLabel:'华为编码',
	    	       	 name:'CustomerModel',id:'CustomerModel'
	    	       	 }]
	       	     },
	       	     
	       	       {
	       	       	layout:'form',
	       	     	columnWidth:0.2,
	       	     	baseCls:'x-plain',
	       	     	items:[{
	       	     		labelSeparator:'',
		       	     	labelAlign : 'top',
		       	     	labelStyle  : 'text-align:center;color:white;font-weight:bold;font-size:30px;height:40px;',
		       	     	height:100,
		       	     	fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:20px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
		   	 			readOnly : true,
	       	     	 	xtype:'textfield',
	       	     	 fieldLabel:'实际产能',
	    	       	 name:'Productivity',id:'Productivity' }]
	       	     },
	       	       {
	       	       	layout:'form',
	       	     	columnWidth:0.2,
	       	     	baseCls:'x-plain',
	       	     	items:[{
	       	     		labelSeparator:'',
		       	     	labelAlign : 'top',
		       	     	labelStyle  : 'text-align:center;color:white;font-weight:bold;font-size:30px;height:40px;',
		       	     	height:100,
		       	     	fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:20px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
		   	 			readOnly : true,
	       	     	 	xtype:'textfield',
	       	     	 fieldLabel:'实际人力',
	    	       	 name:'NumOfPeople'}]
	       	     },
	       	       {
	       	       	layout:'form',
	       	     	columnWidth:0.2,
	       	     	baseCls:'x-plain',
	       	     	items:[{
	       	     		labelSeparator:'',
		       	     	labelAlign : 'top',
		       	     	labelStyle  : 'text-align:center;color:white;font-weight:bold;font-size:30px;height:40px;',
		       	     	height:100,
						fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:20px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
		   	 			readOnly : true,
	       	     	 	xtype:'textfield',
	       	     	 fieldLabel:'完工数量',
	    	       	 name:'MOQtyDone'
	
	    	       		 
	       	     	}]
	       	     }
	       	     ]
	   	 	}   
	   		]
	   }
	   
	   ]
	  },
	  
	 {
	  	height:60,
	  	baseCls:'x-plain'
	  },
	  
	  
	  //下部分
	  {
	  	layout:'column',
	  	baseCls:'x-plain',
	  	items:[
	  	{
	  		columnWidth:.75, 
	  		baseCls:'x-plain',
	  		items:[
	  		{
	  			layout:'column',
	  			baseCls:'x-plain',
	  			items:[
	  			{
	  				columnWidth:.3,
	  				layout:'form',
	  				baseCls:'x-plain',
	  				items:[
	  				{		
	  				xtype:'textfield',
	  				height:80,
	  	    		fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:30px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
		    		readOnly : true,
	  				value:'时间（H）'
	  				}
	  				]
	  				
	  			},
	  			{
	  				columnWidth:.35,
	  				layout:'form',
	  				baseCls:'x-plain',
	  				items:[{
			  		xtype:'textfield',
			  		 height:80,
			  		fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:30px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
				   	 readOnly : true,
			  		name:'TimeSlice1',
			  		id:'TimeSlice1'
			  		}]
	  			},
	  			{
	  				columnWidth:.35,
	  				layout:'form',
	  				baseCls:'x-plain',
	  				items:[{
			  		xtype:'textfield',
			  		height:80,
			  	  	fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:30px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
			  		name:'TimeSlice2',
			  		id:'TimeSlice2'}
	  				]
	  			}
	  			]
	  		},
	  		//第2排
	  		{
	  			layout:'column',
	  			baseCls:'x-plain',
	  			items:[
	  			{
	  				columnWidth:.3,
	  				layout:'form',
	  				baseCls:'x-plain',
	  				items:[
	  				{		
	  				xtype:'textfield',
	  				height:80,
	  	    		fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:30px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
		    		readOnly : true,
	  				value:'标产（PCS）'
	  				}
	  				]
	  			},
	  			{
	  				columnWidth:.35,
			  		baseCls:'x-plain',
			  		layout:'form',
			  		items:[{
			  			xtype:'textfield',
			  			id:'StandardProduct1',
			  			name:'StandardProduct1',
			  			height:80,
			  		 	fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:30px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
				    	readOnly : true
			  		}]
	  			},
	  			{
	  				columnWidth:.35,
			  		baseCls:'x-plain',
			  		layout:'form',
			  		items:[{
			  			xtype:'textfield',
			  			height:80,
			  		 	fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:30px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
				    	readOnly : true,
			  			id:'StandardProduct2',
			  			name:'StandardProduct2'
			  		}]
	  			}
	  			]
	  		},
	  		//第3排
	  		{
	  			layout:'column',
	  			baseCls:'x-plain',
	  			items:[
	  			{
	  				columnWidth:.3,
			  		baseCls:'x-plain',
			  		layout:'form',
			  		items:[{
			  		xtype:'textfield',
			  		height:80,
			  		fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:30px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
				    readOnly : true,
			  		value:'实产（PCS）'
			  		}]
	  			},
	  			{
	  				columnWidth:.35,
			  		baseCls:'x-plain',
			  		layout:'form',
			  		items:[{
			  			xtype:'textfield',
			  			height:80,
			  		 	fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:30px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
				   		readOnly : true,
			  			id:'Productivity1',
			  			name:'Productivity1'
			  		}]
	  			},
	  			{
	  				columnWidth:.35,
			  		baseCls:'x-plain',
			  		layout:'form',
			  		items:[{
			  			xtype:'textfield',
			  			height:80,
			  			fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:30px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
				    	readOnly : true,
			  			id:'Productivity2',
			  			name:'Productivity2'
	  			    }]
	  			}
	  			]
	  		},
	  		//line 4
	  		{  
	  			layout:'column',
	  			baseCls:'x-plain',
	  			items:[
	  			{
	  				columnWidth:.3,
			  		baseCls:'x-plain',
			  		layout:'form',
			  		items:[{
				  		xtype:'textfield',
				  		height:80,
				  		fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:30px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
				   		readOnly : true,
				  		value:'效率'
		      		}]
	  			},
	  			{
	  				columnWidth:.35,
		      		baseCls:'x-plain',
		      		layout:'form',
		      		items:[{
		      			xtype:'textfield',
		  				height:80,
			  		 	fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:30px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
			   		 	readOnly : true,
		      			id:'Efficiency1',
		      			name:'Efficiency1'
		      		}]
	  			},
	  			{
	  				columnWidth:.35,
		      		baseCls:'x-plain',
		      		layout:'form',
		      		items:[{
		      			xtype:'textfield',
			  			height:80,
				  		fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:30px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
				    	readOnly : true,
			      		id:'Efficiency2',
			      		name:'Efficiency2'
		      		}]
	  			}
	  			]
	  	},
  		//line 5
  		{  
  			layout:'column',
  			baseCls:'x-plain',
  			items:[{
  				columnWidth:.3,
		  		baseCls:'x-plain',
		  		layout:'form',
		  		items:[{
			  		xtype:'textfield',
			  		height:80,
			  		fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:30px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
			   		readOnly : true,
			  		value:'备注'
	      		}]
  			},{
  				columnWidth:.35,
	      		baseCls:'x-plain',
	      		layout:'form',
	      		items:[{
	      			xtype:'textfield',
	  				height:80,
		  		 	fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:30px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
		   		 	readOnly : true,
	      			id:'FaultDescription1',
	      			name:'FaultDescription1'
	      		}]
  			},{
  				columnWidth:.35,
	      		baseCls:'x-plain',
	      		layout:'form',
	      		items:[{
	      			xtype:'textfield',
		  			height:80,
			  		fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:30px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
			    	readOnly : true,
		      		id:'FaultDescription2',
		      		name:'FaultDescription2'
		      		
	      		}]
  			}]	
  		}]
  	},
	  	//下右
	  	{
	  		columnWidth:.25, 
	  		baseCls:'x-plain',
	  		layout:'form',
	  		items:[
	  		{
	  		xtype:'textfield',
	  		height:80,
	  	    fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:70px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
	  		value:'累计效率'
	  		},
	  		{
	  		xtype:'textfield',
	  		height:164,
	  		fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:70px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
		    readOnly : true,
	  		name:'Efficiency3'
	  		}]
	  	},	{
	  		columnWidth:.25, 
	  		baseCls:'x-plain',
	  		layout:'form',
	  		items:[
	  		{
	  		xtype:'textfield',
	  		height:80,
	  	    fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:70px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
	  		value:'UPPH'
	  		},
	  		{
	  		xtype:'textfield',
	  		height:80,
	  		fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:70px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
		    readOnly : true,
	  		name:'UPPH'
	  		}]
	  	}
  	
  	] 
	  
	}]	
	  
	  
	 
	 
	  	
	  	
	  	
	
		
		


			
});