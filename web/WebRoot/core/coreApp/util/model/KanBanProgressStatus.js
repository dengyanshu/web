/**
 * 处理看板进度条状态
 */
Ext.define("core.util.model.KanBanProgressStatus",{	
	
	ProgressStatus:function(value) {
		
		var color = '#ff0000';
		var arr = new Array();
		arr = value.split("/");
		var val;
		var cc=200;
		
		if(arr[0]==0&&arr[1]==0){
			 val=1;
		}else{
			 val= (arr[0] / arr[1]) * 100;
		}		
		if (val < 1||val==0){
			val = 1;
		}else if (val > 100){
			val = 100;
		};
		if (val <= 5) {
			color = '#ff0000';
		} else if (val > 5 && val <= 25) {
			color = '#f27011';
		} else if (val > 25 && val <= 50) {
			color = '#f2b01e';
		} else if (val > 50 && val <= 75) {
			color = '#f2d31b';
		} else if (val > 75 && val <= 100) {
			color = '#86e01e';
		}
		
		ret = '<section class="container">' + '<div class="progress">'
		+'<div class="progress-bar3">'
				+ '<div class="progress-bar" ' + 'style="width:' + val
				+ '%; background-color:' + color + '">'
		+ '<span class="progress-val3">' + arr[0]+' / '+arr[1] + '</span>'
		+'</div>'+'</div>' + '</div>' + '</section>';
		//alert(val);
		return ret;		
	},
	ProgressStatus2:function(value) {
		var arr = new Array();
		arr = value.split("/");
		
		var val1,val2;
		val1=(arr[1]/arr[0])*100;
		val2=(arr[2]/arr[0])*100;
		
		if(val1<1||val1==0){
			val1=1;
		}else if(val1>100){
			val1=100;
		}
		
		if(val2<1||val2==0){
			val2=1;
		}else if(val2>100){
			val2=100;
		}
		var ret;
		//#00ff30 绿色
		if(val2<8){
				ret='<section class="container">'
			 	+'<div class="progress">'
					  +'<div class="progress-bar3">'
					 	 +'<div class="progress-bar" style="width:'+val1+'%; background-color:#086296"></div>'	
					 	 +'<div class="progress-bar2" style="width:'+val2+'%; background-color:#ff0000"><span class="progress-val2">'+parseInt(val2)+'%</span></div>'	
					  +'</div>'
				 +'</div>'
			 +'</section>';
			
		}else{
				ret='<section class="container">'
			 	+'<div class="progress">'
					  +'<div class="progress-bar3">'
					 	 +'<div class="progress-bar" style="width:'+val1+'%; background-color:#086296"></div>'	
					 	 +'<div class="progress-bar2" style="width:'+val2+'%; background-color:#ff0000"><span class="progress-val">'+parseInt(val2)+'%</span></div>'	
					  +'</div>'
				 +'</div>'
			 +'</section>';
		}
		

		
		return ret;
	},
	ProgressStatus3:function(value) {
        	var image;
        	var color;
		var value=value*100;
        	if( parseFloat(value)>=0 && parseFloat(value)<30){ 
        		image="1";
        		color = '#f27011';
        	}else if(parseFloat(value)<90&&parseFloat(value)>=30){
        		image="2";
        		color = '#ffff00';
        	}else if(parseFloat(value)<=100 &&parseFloat(value)>=90){
        		image="3";
        		 color = '#86e01e';
        	}else if(parseFloat(value)>100){        		
        		 image="4";
        		 color = '#008000';
        	}else{  		 
        		 image="5";
        		 color = '#ff0000';
        		 
        	}
        		text= value;
        		val= parseFloat(value)>100?'100':value;
        		
        		ret='<section class="container">'
			 				+'<div class="progress">'
					  				+'<div class="progress-bar3">'
					 					 +'<div class="progress-bar" style="width:'+val+'%; background-color:'+color+'"><span class="progress-val3">'+Math.round(text*100)/100+'%</span></div>'	
					  			+'</div>'
							+'</div>'
			 		+'</section>' 
			 		+'<img class="progress-images" src=\'MyDesktop/images/biaoqing/'+image+'.gif\' />';
			 		return ret;
	},
	
	
	
	ProgressStatus4:function(value) {
		value=value*100;
		return Math.round(value*100)/100+"%";
	},
	
	
	ProgressStatus5:function(value) {
    	var image;

    	if( parseFloat(value)>=0 && parseFloat(value)<30){ 
    		image="1";
    	}else if(parseFloat(value)<90&&parseFloat(value)>=30){
    		image="2";
    	}else if(parseFloat(value)<=100 &&parseFloat(value)>=90){
    		image="3";
    	}else if(parseFloat(value)>100){        		
    		 image="4";
    	}else{  		 
    		 image="5";
    	}
    		text= value;
    		val= parseFloat(value)>100?'100':value;
    		
    		ret=Math.round(value*100)/100+"%"+'<img class="progress-images" src=\'MyDesktop/images/biaoqing/'+image+'.gif\' />';
		 		return ret;
},

	ProgressStatus6:function(value) {
		var time=Ext.Date.format(new Date(value),'Y-m-d');
		return time;
	},
	ProgressStatusDate:function(value) {
		var  day_2 = new Date(value);
	    var  day_1 = Ext.Date.add(day_2, Ext.Date.DAY, +2);
	    var time=Ext.Date.format(day_1,'Y-m-d');
	    return time;
	}
});