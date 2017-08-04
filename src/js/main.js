var mainObj = mainObj || {};

mainObj.init = function(){
    mainObj.loadUsersList(function(response){
          console.log(JSON.parse(response)); 
    });
}
mainObj.loadUsersList = function(callback){
    var xobj = this.createXMLHTTPObject();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'src/assets/localJson/usersList.json', true); 
        xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == 200) {
            callback(xobj.responseText);
          }
        };
        xobj.send(null);
}
mainObj.createXMLHTTPObject = function(){
    var XMLHttpFactories = [
    	                    	function () {return new XMLHttpRequest()},
    	                    	function () {return new ActiveXObject("Msxml2.XMLHTTP")},
    	                    	function () {return new ActiveXObject("Msxml3.XMLHTTP")},
    	                    	function () {return new ActiveXObject("Microsoft.XMLHTTP")}
    	                    ];
    	var xmlhttp = false;
    	for (var i=0;i<XMLHttpFactories.length;i++) {
    		try {
    			xmlhttp = XMLHttpFactories[i]();
    		}
    		catch (e) {
    			continue;
    		}
    		break;
    	}
    	return xmlhttp;
}
mainObj.init();