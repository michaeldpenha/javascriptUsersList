var mainObj = (function() {
	var usersArray= [];
	var sortingObject = {
		'active' : '',
		'gender' : '',
		'last_login' : ''
	};
	return {
		init : init,
		setUsersArray : setUsersArray,
		getUsersArray : getUsersArray,
		setSortingValues : setSortingValues,
		filterUsersArray : filterUsersArray
	}
	function init(){
		loadUsersList();
		registerEvents();
	}
	function setSortingValues(key,value){
		sortingObject[key] = value;
	}
	function getSortingValues(key,value){
		return sortingObject; 
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
		usersArray = sortArrayAlpehbetically(arry);
	}
	function getUsersArray(){
		return usersArray;
	}
	function populateTable(){
		var users = getUsersArray();
		createTableHeaderDivs();
		createTableChildDivs(users);
	}
	function addDivToTable(childDiv){
		var dvTable = document.getElementById("table");
    	dvTable.appendChild(childDiv);
	}
	function createTableHeaderDivs(){
		var tableHeaders = orderDataBasedOnCols();
		createDivs(tableHeaders,'headerDiv');
	}
	function createTableChildDivs(usersArry){
		removeAllChildElements('childDiv');
		usersArry.forEach(function(item,index,arr){
			var childArray = orderDataBasedOnCols(item);
			createDivs(childArray,'childDiv',item);	
		});
	}
	function removeAllChildElements(cls){
		var childEl = document.getElementsByClassName(cls);
		while(childEl[0]){
			childEl[0].parentNode.removeChild(childEl[0]);
		}
	}
	function orderDataBasedOnCols (item){
		var orderOfCols = fetchColOrder();
		var array = [];
		orderOfCols.forEach(function(val,key,arr){
			pushDivArrayBasisOfOrderCol(array,val,item);
		});
		return array;
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
		if(item){
			mainDiv.setAttribute('dataValue', JSON.stringify(item));
			mainDiv.setAttribute('id',item.id);
		}
		addDivToTable(mainDiv);
	}
	function fetchColOrder (){
		var orderOfCol = ['id','first_name','last_name','username','active','last_login'];
		return orderOfCol;
	}
	function registerEvents(){
		document.getElementById('table') ? document.getElementById('table').addEventListener('click', changeTableBgColor) : '';
		document.getElementById('active') ? document.getElementById('active').addEventListener('change',changeUsersStatus) : '';
		document.getElementById('last_login') ? document.getElementById('last_login').addEventListener('change',changeUsersStatus) : '';
		document.getElementById('gender') ? document.getElementById('gender').addEventListener('click',changeUsersStatus): '';
	}
	function changeTableBgColor(event) {
		var targetEl = event.target.getAttribute('datavalue') ? event.target : event.target.parentElement.getAttribute('datavalue') ? event.target.parentElement : '';
		var bgColor = "#ffffff";
		if(event.target && targetEl){
			var data = JSON.parse(targetEl.getAttribute('datavalue'));
			bgColor = data.favorites && data.favorites.color ? data.favorites.color : '#ffffff';
		}
		document.getElementById('table').style.backgroundColor = bgColor;
	}
	function changeUsersStatus(event){
		setSortingValues(event.currentTarget.id,event.target.value);
		var sortedArry = filterUsersArray();
		createTableChildDivs(sortedArry);
	}
	function sortArrayAlpehbetically(array){
		var sortArry = array.sort(function(a, b){
			if(a.first_name < b.first_name) return -1;
			if(a.first_name > b.first_name) return 1;
			return 0;
		});
		return sortArry;
	}
	function filterUsersArray(){
		var usersArray = getUsersArray();
		var sortingObj = getSortingValues();
		var sortedResult = usersArray.filter(function(rec){
			var active = sortingObj.active === '' || rec.active === Boolean(sortingObj.active);
			var last_login = sortingObj.last_login === '' || (rec.last_login && new Date(rec.last_login).getFullYear().toString() === sortingObj.last_login);
			var gender = sortingObj.gender === '' || toCheckWhetherGenderMatchesRec(rec.gender,sortingObj.gender);
			return active && last_login && gender;
		});
		return sortedResult;
	}
	function toCheckWhetherGenderMatchesRec(genderRec,selectedGender){
		var booleanVal = false;
		genderRec.forEach(function(val,index,arry){
			if(val.toLowerCase() === selectedGender.toLowerCase()){
				booleanVal = true;
				return true;
			}
		});
		return booleanVal;
	}	
})();
(function(){
	document.addEventListener('readystatechange', function() {
		if (document.readyState === 'complete') {
			mainObj.init();
		}
	});
})(document);
