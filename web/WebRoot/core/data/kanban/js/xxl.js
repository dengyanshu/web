function _InitScroll(_S1, _S2, _W, _H, _T) {
	return "var marqueesHeight" + _S1 + "=" + _H + ";" + "var stopscroll" + _S1
			+ "=false;" + "var scrollElem" + _S1 + "=document.getElementById('"
			+ _S1 + "');" + "with(scrollElem" + _S1 + "){style.width=" + _W
			+ ";" + "style.height=marqueesHeight" + _S1 + ";"
			+ "style.overflow='hidden';noWrap=true;" + "}scrollElem" + _S1
			+ ".onmouseover=new Function('stopscroll" + _S1
			+ "=true');scrollElem" + _S1
			+ ".onmouseout=new Function('stopscroll" + _S1
			+ "=false');var preTop" + _S1 + "=0; var currentTop" + _S1
			+ "=0; var stoptime" + _S1 + "=0;var leftElem" + _S2
			+ "=document.getElementById('" + _S2 + "');scrollElem" + _S1
			+ ".appendChild(leftElem" + _S2
			+ ".cloneNode(true));setTimeout('init_srolltext" + _S1 + "()',"
			+ _T + ");function init_srolltext" + _S1 + "(){scrollElem" + _S1
			+ ".scrollTop=0;setInterval('scrollUp" + _S1 + "()',1)"
			+ ";}function scrollUp" + _S1 + "(){if(stopscroll" + _S1
			+ "){return;}currentTop" + _S1 + "+=1;if(currentTop" + _S1
			+ "==(marqueesHeight" + _S1 + "+1)) {stoptime" + _S1 + "+=1;"
			+ "currentTop" + _S1 + "-=1;if(stoptime" + _S1 + "==" + _T / 1
			+ ") {currentTop" + _S1 + "=0;stoptime" + _S1 + "=0;}}else{preTop"
			+ _S1 + "=scrollElem" + _S1 + ".scrollTop;scrollElem" + _S1
			+ ".scrollTop +=1;if(preTop" + _S1 + "==scrollElem" + _S1
			+ ".scrollTop){scrollElem" + _S1 + ".scrollTop=0;scrollElem" + _S1
			+ ".scrollTop +=1;}}}";
}

var marquestHeightA1=800;
var stopscrollA1=false;
var scrollElemA1=document.getElementById('A1');
width(scrollElemA1){style.width=1000;style.height=marquestHeightA1;}