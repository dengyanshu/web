$(document).ready(function(){
	$(".datatd tr").mouseover(function(){
		$(this).addClass("over");	
	});

	$(".datatd tr").mouseout(function(){
		$(this).removeClass("over");	
	});	

  	$(".datatd tr:even").addClass("alt"); 
});
