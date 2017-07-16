/*
	Main application controller, handling page movement, generic helpers and static variables
*/

var selectedPrograms;
var activeTable;

//find results and change view to the results page
function viewResults() {

	//check if the form is filled correclty, otherwise show an error
	if(profile.average == 0 || profile.courseCodes.indexOf("") != -1 || profile.fieldOfInterest == ""){
		removeClass("formError", "hidden");
	}
	//if its correctly filled
	else{

		//find all programs that the profile is elligible for
		selectedPrograms = [];

		for(var i = 0; i < programs.length; i++){
			//correct field of interest and within 15% of grade range
			if(programs[i].title.indexOf(profile.fieldOfInterest) !== -1 && parseInt(programs[i].gradeRange) - 15 < profile.average){
				selectedPrograms.push(formatProgram(programs[i]));
			}
		}

		//if no programs are found, display and error
		if(selectedPrograms.length == 0){
			removeClass("noProgramsFoundError", "hidden");
		}
		//if programs are found continue processing and displaying the data
		else{
			//sort these programs based upon their ranking score
			selectedPrograms = mergeSort(selectedPrograms);

			//change pages to the results
			switchView("resultsPage");

			//show the data on the table
			activeTable = "programs";

			updateViews();
		}
	}
}

//format program based on profile info
function formatProgram(unformattedProgram){

	//unlink the program from the other instance of it
	var program = JSON.parse(JSON.stringify(unformattedProgram));

	//find differences between profile's courses and requirements
	var coursesInformation = "";
	var missingCourses = 0;

	//if there is info about course requirements in program
	if(unformattedProgram.requirements[0] != "No Info"){

		//for the program, loop through each requirement course
		for(var j = 0; j < unformattedProgram.requirements.length; j++){

			//check if the profile has this course taken
			var courseTaken = false;
			for(var k = 0; k < profile.courseCodes.length; k++){
				if(profile.courseCodes[k] == unformattedProgram.requirements[j]){
					courseTaken = true;
				}
			}

			//if it does have it taken, add it in green to the requirements
			if(courseTaken){
				coursesInformation += '<span class="green">' + unformattedProgram.requirements[j] + '</span>, ';
			}
			//otherwise if it is not taken, add it in red and increment missing courses count
			else{
				missingCourses++;
				coursesInformation += '<span class="red">' + unformattedProgram.requirements[j] + '</span>, ';
			}

		}
	}

	//if there is no information format as No Info, otherwise remove the last unnecessary ", " from the requirements
	if(coursesInformation == ""){
		coursesInformation = "No Info";
	}else{
		coursesInformation = coursesInformation.substring(0, coursesInformation.length -2);
	}

	//add requriements to the new formatted program
	program.requirements = coursesInformation;

	//find differences between profile's grades and requirements
	var percentageDifference = Math.round(profile.average - unformattedProgram.gradeRange);

	//format accordlying the information and add it to the new formatted program
	if(parseInt(unformattedProgram.gradeRange) < profile.average){
		program.additionGradeInfo = '<span class="green"> (+' + Math.abs(percentageDifference) + '%)</span>';
	}else{
		program.additionGradeInfo = '<span class="red"> (-' + Math.abs(percentageDifference) + '%)</span>';
	}

	//calculate ranking score and return the formatted program
	program.rankingScore = 2 * percentageDifference - 50 * missingCourses;
	return program;
}
