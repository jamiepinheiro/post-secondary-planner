/*
	Controller for the search view, handling all actions related to it
*/

//view the search view
function viewSearch(){
	if(profile == null){
		switchView("profilesPage");
	}else{
		login(profile.profilename);
	}
}

//collect the data from the view, and save it with the user to be used by the results controller to find programs
function search(){

	//save courses
	profile.courseCodes = [document.getElementById("courseCode1").value,
					document.getElementById("courseCode2").value,
					document.getElementById("courseCode3").value,
					document.getElementById("courseCode4").value,
					document.getElementById("courseCode5").value,
					document.getElementById("courseCode6").value];

	//save marks
	profile.courseMarks = [document.getElementById("courseMark1").value,
					document.getElementById("courseMark2").value,
					document.getElementById("courseMark3").value,
					document.getElementById("courseMark4").value,
					document.getElementById("courseMark5").value,
					document.getElementById("courseMark6").value];

	//save field of interest
	profile.fieldOfInterest = document.getElementById("fieldOfInterest").value;

	//save average
	var sum = 0;
	for(var i = 0; i < profile.courseMarks.length; i++){
		sum += parseInt(profile.courseMarks[i]);
	}
	profile.average = Math.round(sum*10/6)/10;

	//save the profile and go to the results
	saveProfiles();
    viewResults();
}
