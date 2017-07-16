/*
	Controller for the favourite view, handling all actions related to it
*/

//if there are favourites, change the view to favourites
function viewFavourites(){
	if(profile.favouritePrograms.length == 0){
		removeClass("noFavouritesError", "hidden");
	}else{
		switchView("favouritesPage");
		loadFavourites();
	}
}

//load favourites based on current profile
function loadFavourites(){

	//find all favourited programs from list
    selectedPrograms = [];
    for(var i = 0; i < profile.favouritePrograms.length; i++){
        selectedPrograms.push(formatProgram(programs[profile.favouritePrograms[i]]));
    }

	//sort based upon ranking score
	selectedPrograms = mergeSort(selectedPrograms);

	//display resultant programs on favourites page
	activeTable = "favouritePrograms";

	updateViews();
}

//based upon code from http://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
//download favourites into csv
function downloadFavourites(){
	//CODE FROM WEBSITE START*
	var content = [["Ranking Score", "Program Name", "University", "Outside Learning", "Grades Requirements", "Admission Requirements", "OUAC Code"]];
	for (var i = 0; i < selectedPrograms.length; i++) {
		content.push([selectedPrograms[i].rankingScore, selectedPrograms[i].title, selectedPrograms[i].university, selectedPrograms[i].outsideLearning, selectedPrograms[i].gradeRange, selectedPrograms[i].requirements.replace(/<\/?[^>]+(>|$)/g, ""), selectedPrograms[i].ouac]);
	}
	var finalVal = '';
	for (var i = 0; i < content.length; i++) {
	    var value = content[i];
	    for (var j = 0; j < value.length; j++) {
	        var innerValue = value[j].toString();
	        var result = innerValue.replace(/"/g, '""');
	        if (result.search(/("|,|\n)/g) >= 0){
	            result = '"' + result + '"';
			}
	        if (j > 0){
	            finalVal += ',';
			}
	        finalVal += result;
	    }
	    finalVal += '\n';
	}
	var pom = document.createElement('a');
	pom.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(finalVal));
	pom.setAttribute('download', 'favourites.csv');
	pom.click();
	//CODE FROM WEBSITE END*
}

//toggle favourited value for a particular program
function favourite(programNumber){
	//add a new favourite if it is not there
	if(profile.favouritePrograms.indexOf(programNumber) == -1){
		profile.favouritePrograms.push(programNumber);
	}
	//remove it if it is there
	else{
		profile.favouritePrograms.splice(profile.favouritePrograms.indexOf(programNumber), 1);
	}
	//save the data to database
	saveProfiles();

	//if no more favourites exist, go to the results page
	if(currentPage == "favouritesPage" && profile.favouritePrograms.length != 0){
		viewFavourites();
	}else{
		viewResults();
	}
}
