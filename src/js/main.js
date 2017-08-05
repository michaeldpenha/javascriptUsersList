var mainObj = (function() {
	var usersArray= [];
	return {
		init : init,
		setUsersArray : setUsersArray,
		getUsersArray : getUsersArray
	}
	function init(){
		loadUsersList();
	}
	function loadUsersList(){
		apiMethodCall('GET','src/assets/localJson/usersList.json',function(response){
			setUsersArray(JSON.parse(response));
			populateTable();
    	});
	}
	function apiMethodCall(mehtod,url,callback){
		var xobj = new XMLHttpRequest();
			xobj.overrideMimeType("application/json");
			xobj.open(mehtod, url, true); 
			xobj.onreadystatechange = function () {
				if (xobj.readyState == 4 && xobj.status == 200) {
					callback(xobj.responseText);
				}
			};
			xobj.send(null);
	}
	function setUsersArray(arry){
		usersArray = arry;
	}
	function getUsersArray(){
		return usersArray;
	}
	function populateTable(){
		var users = getUsersArray();
		var tableHeaders = getTableHeaders();
		addTableHeaderDivs(tableHeaders);
		addTableChildDivs(users);
	}
	function addDivToTable(childDiv){
		var dvTable = document.getElementById("table");
    	dvTable.appendChild(childDiv);
	}
	function addTableHeaderDivs(headerArrays){
		createDivs(headerArrays);
	}
	function addTableChildDivs(users){
		var orderOfCols = fetchColOrder();
		users.forEach(function(item,index,arr){
			var childArray = [];
				orderOfCols.forEach(function(val,key,array){
					pushDivArrayBasisOfOrderCol(childArray,val,item);
				});
			createDivs(childArray,'childDiv',item);	
		});
	}
	function pushDivArrayBasisOfOrderCol(array,val,item){
		array.push({
			name : item ? item[val] : formatDisplayName(val)
		});
		return array;
	}
	function formatDisplayName(val){
		return val ? val.split('_').join(' ').toUpperCase() : val;
	}
	function createDivs(componentArry,cls,item){
		var mainDiv = document.createElement('div');
			mainDiv.setAttribute('class','flex-container '+cls);
		componentArry.forEach(function(item,index,arr){
			var divElement = document.createElement("div");
			divElement.innerHTML = item.name;
			divElement.setAttribute('class','item');
			mainDiv.appendChild(divElement);
		});
		mainDiv.setAttribute('dataValue', JSON.stringify(item));
		addDivToTable(mainDiv);
	}
	function fetchColOrder (){
		var orderOfCol = ['id','first_name','last_name','username','active','last_login'];
		return orderOfCol;
	}
	function getTableHeaders(){
		var orderOfCols = fetchColOrder();
		var headers = [];
		orderOfCols.forEach(function(val,key,array){
			pushDivArrayBasisOfOrderCol(headers,val);
		});
		return headers;
	}	
})();
(function(){
	document.addEventListener('readystatechange', function() {
		if (document.readyState === 'complete') {
			mainObj.init();
		}
	});
})(document);
