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
		initalizeChildTableHeight();
	}
	function initalizeChildTableHeight(){
		document.getElementById('childTableDiv').style.height = window.outerHeight-170 + 'px';
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
	function addDivToTable(childDiv,divEl){
		var dvTable = document.getElementById(divEl);
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
	function divAttribute(el,key,value){
		el.setAttribute(key,value);
	}
	function getDivAttribute(el,key){
		return el.getAttribute(key);
	}
	function createDivs(componentArry,cls,item){
		var mainDiv = document.createElement('div');
		var addToDiv = "table";
		divAttribute(mainDiv,'class','flex-container '+cls);
		componentArry.forEach(function(item,index,arr){
			var divElement = document.createElement("div");
			divElement.innerHTML = item.name;
			divAttribute(divElement,'class','item');
			mainDiv.appendChild(divElement);
		});
		if(item){
			var color = item.favorites && item.favorites.color ? item.favorites.color : '#ffffff';
			divAttribute(mainDiv,'favouriteColor',color);
			divAttribute(mainDiv,'firstName', item.first_name);
			divAttribute(mainDiv,'lastName',item.last_name);
			divAttribute(mainDiv,'active',item.active);
			divAttribute(mainDiv,'id',item.id);
			addToDiv = "childTableDiv";
		}
		addDivToTable(mainDiv,addToDiv);
	}
	function fetchColOrder (){
		var orderOfCol = ['first_name','last_name','username','active','last_login'];
		return orderOfCol;
	}
	function registerEvents(){
		document.getElementById('childTableDiv') ? document.getElementById('childTableDiv').addEventListener('click', changeTableBgColor) : '';
		document.getElementById('active') ? document.getElementById('active').addEventListener('change',applyFilterOptions) : '';
		document.getElementById('last_login') ? document.getElementById('last_login').addEventListener('change',applyFilterOptions) : '';
		document.getElementById('gender') ? document.getElementById('gender').addEventListener('change',applyFilterOptions): '';
		document.getElementById('closeBtn') ? document.getElementById('closeBtn').addEventListener('click',closeModalDialog): '';
	}
	function closeModalDialog(){
		overlay('none');
	}
	function changeTableBgColor(event) {
		var targetEl = getDivAttribute(event.target,'favouriteColor') ? event.target : getDivAttribute(event.target.parentElement,'favouriteColor') ? event.target.parentElement : '';
		if(event.target && targetEl){
			openModalDialog(targetEl);
		}
	}
	function overlay(val){
		document.getElementById('overlay').style.display=val;
		document.getElementById('fade').style.display=val;
	}
	function openModalDialog(el){
		document.getElementById('idName').innerHTML = getDivAttribute(el,'id');
		document.getElementById('firstName').innerHTML = getDivAttribute(el,'firstName');
		document.getElementById('lastName').innerHTML=getDivAttribute(el,'lastName');
		document.getElementById('activeId').innerHTML = getDivAttribute(el,'active');
		document.getElementById('overlay').style.display='block';
		document.getElementsByTagName('body')[0].style.backgroundColor = getDivAttribute(el,'favouriteColor');
		overlay('block');
	}
	function applyFilterOptions(event){
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
			if(val && selectedGender && val.toLowerCase() === selectedGender.toLowerCase()){
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
