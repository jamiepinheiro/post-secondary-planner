/*
	Model handler for the profile model
*/

//profile object definition
function Profile(profilename){

	//attributes
	this.profilename = profilename;
	this.courseCodes = ["", "", "", "", "", ""];
	this.courseMarks = [0, 0, 0, 0, 0, 0];
	this.fieldOfInterest = "";
	this.favouritePrograms = [];
	this.average = 0;
}

//save profiles into database (HTML5 local storage) as JSON string
function saveProfiles(){
	localStorage.setItem("profiles", JSON.stringify(profiles));
}
