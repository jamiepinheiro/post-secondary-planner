/*
	Main application controller, handling page movement, generic helpers and static variables
*/

//static variables
var pages = ["profilesPage", "searchPage", "resultsPage", "favouritesPage"];
var errorMsgs = ["formError", "noFavouritesError", "noProgramsFoundError"]
var currentPage = "profilesPage";
var programs;
var profiles = [];
var profile;

//download program data from online data base (IIFE)
(function(){
	//make an asynchronous call to myjson.com and get data
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
			//parse json into javascript object array
			programs = JSON.parse(this.response);
		}
	};
	//make GET request
	xhttp.open("GET", "https://api.myjson.com/bins/dzcix", true);
	xhttp.send();
})();

//load profiles page once the DOM is loaded
window.addEventListener("DOMContentLoaded", function() {
	viewProfiles();
	updateViews();
}, false);

//Add a particular css class to an HTML element
function addClass(id, cssClass){
	if(document.getElementById(id).className.indexOf(cssClass) === -1){
		document.getElementById(id).className += " " + cssClass;
	}
}

//Remove a particular css class from an HTML element
function removeClass(id, cssClass){
	document.getElementById(id).className = document.getElementById(id).className.replace(cssClass, "");
}

//switch between different views in application
function switchView(page){

	currentPage = page;

	//when switching, hide all error messages
	for(var i = 0; i < errorMsgs.length; i++){
		addClass(errorMsgs[i], "hidden");
	}

	//show navigation buttons on all pages except profile selection page
	if(page === "profilesPage"){
		addClass("navButtons", "hidden");
	}else{
		removeClass("navButtons", "hidden");
	}

	//set the current page to visible and update the navigation buttons
	for(var i = 0; i < pages.length; i++){
		if(pages[i] === page){
			removeClass(pages[i], "hidden");
			addClass(pages[i]+"Nav", "active")
		}else{
			addClass(pages[i], "hidden");
			removeClass(pages[i] + "Nav", "active")
		}
	}
}
