/*
	Create linkage between views and models
*/

//update all view items to value of their models
var updateViews = function(){

	//Existing profiles
	var ul = document.getElementById("existingProfiles");
	ul.innerHTML = "";

	//loop through all the existing profiles adding them to the view
	for(var i = 0; i < profiles.length; i++){

		//create list item
		var li = document.createElement("li");
		li.className = "list-group-item text-center";

		//create button to login to profile
		var goButton = document.createElement("button");
		goButton.className = "btn btn-primary";
		goButton.innerHTML = profiles[i].profilename;
		goButton.onclick = function(){login(this.innerHTML)};

		//delete button for the profile
		var deleteButton = document.createElement("button");
		deleteButton.className = "btn btn-danger";
		deleteButton.innerHTML = "Remove";
		deleteButton.onclick = function(){remove(this.previousSibling.innerHTML)};

		//add componenets to list item
		li.appendChild(goButton);
		li.appendChild(deleteButton);
		ul.appendChild(li);
	}


	//load data from selected profile
	//course codes
	if(profile != null){
		document.getElementById("courseCode1").value = profile.courseCodes[0];
		document.getElementById("courseCode2").value = profile.courseCodes[1];
		document.getElementById("courseCode3").value = profile.courseCodes[2];
		document.getElementById("courseCode4").value = profile.courseCodes[3];
		document.getElementById("courseCode5").value = profile.courseCodes[4];
		document.getElementById("courseCode6").value = profile.courseCodes[5];

		//course marks
		document.getElementById("courseMark1").value = profile.courseMarks[0];
		document.getElementById("courseMark2").value = profile.courseMarks[1];
		document.getElementById("courseMark3").value = profile.courseMarks[2];
		document.getElementById("courseMark4").value = profile.courseMarks[3];
		document.getElementById("courseMark5").value = profile.courseMarks[4];
		document.getElementById("courseMark6").value = profile.courseMarks[5];

		//field of interest
		document.getElementById("fieldOfInterest").value = profile.fieldOfInterest;

		//update view to current profile
		var profileTags = document.getElementsByClassName("profile");
		for(var i = 0; i < profileTags.length; i++){
			profileTags[i].innerHTML = profile.profilename;
		}
	}


	//display basic query data
	if(profile != null && selectedPrograms != null){
		document.getElementById("numberOfFavourites").innerHTML = profile.favouritePrograms.length;
		document.getElementById("viewFavourites").disabled = profile.favouritePrograms.length == 0;
		document.getElementById("numberOfPrograms").innerHTML = selectedPrograms.length;
		document.getElementById("field").innerHTML = profile.fieldOfInterest;
		document.getElementById("average").innerHTML = profile.average + "%";
		document.getElementById("courses").innerHTML = "";
		for (var i = 0; i < profile.courseCodes.length; i++){
			document.getElementById("courses").innerHTML += profile.courseCodes[i];
			if(i !== 5){
				document.getElementById("courses").innerHTML += ", ";
			}
		}
	}


	//update view of active table
	if(profile != null && activeTable != null && selectedPrograms != null){
		//reset the table
		var tbody = document.getElementById(activeTable);
		tbody.innerHTML = "";

		//loop through each of the programs
		for(var i = 0; i < selectedPrograms.length; i++){

			//create a new row
			var tr = tbody.insertRow(-1);
			var itemNum = 0;
			var maxLength = 40;

			//add each element of the program to the new row

			//ranking score
			var rankingScore = tr.insertCell(0);
			rankingScore.innerHTML = selectedPrograms[i].rankingScore;

			//program title
			var program = tr.insertCell(1);
			program.innerHTML = selectedPrograms[i].title;

			//university name
			var university = tr.insertCell(2);
			university.innerHTML = selectedPrograms[i].university;

			//outside learning information
			var outsideLearning = tr.insertCell(3);
			outsideLearning.innerHTML = selectedPrograms[i].outsideLearning;

			//grade requirement information
			var gradeRange = tr.insertCell(4);
			gradeRange.innerHTML = selectedPrograms[i].gradeRange + "%" + selectedPrograms[i].additionGradeInfo;

			//course requriements
			var requirements = tr.insertCell(5);
			requirements.innerHTML = selectedPrograms[i].requirements;

			//ouac code
			var ouac = tr.insertCell(6);
			ouac.innerHTML = selectedPrograms[i].ouac;

			//link to website
			var link = tr.insertCell(7);
			link.innerHTML = selectedPrograms[i].url;

			//favoruite button
			var favouriteButton = tr.insertCell(8);
			var star = document.createElement("div");
			star.id = selectedPrograms[i].id;
			star.onclick = function(){favourite(parseInt(this.id))};
			//not favourited already
			if(profile.favouritePrograms.indexOf(selectedPrograms[i].id) == -1){
				star.className = "glyphicon glyphicon-star-empty";
			}
			//favourited already
			else{
				star.className = "glyphicon glyphicon-star";
			}
			favouriteButton.appendChild(star);
		}
	}

}
