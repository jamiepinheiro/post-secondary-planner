/*
	Through the usage of a 3rd party library, autocomplete features for courses and fields of interests were added
	library - https://goodies.pixabay.com/javascript/auto-complete/demo.html
*/

//values for autocompete to use
var ontarioCourses = ["ENG4U", "MHF4U", "MCV4U", "SCH4U", "SBI4U", "PSE4U", "ICS4U", "SPH4U", "FEF4U", "FIF4U", "PSK4U", "SES4U", "MDM4U", "FRA4U", "ISC4U", "FSF4U", "MCB4U", "CIA4U", "MFH4U", "EWC4U", "EAE4U", "ETS4U", "BOH4M","ENG4U","CLN4U","IDC4U","BBB4M","TGJ4M","PAF4O","PSE4U","SNC4M","HHS4M","HRE4M","MAP4C","MCB4U","SCH4U","EWC4U","CPW4U","MDM4U","SBI4U","SPH4U","TCJ4E","HRE4O","HZT4U","IDP4O","MGA4U","ICS4M","AMG4M","CGW4U","TPO4C","ENG4C","ADA4M","ICE4M","TFH4E","OLC4O","TDJ4M","TPT4C","ETS4U","BAT4M","PAD4O","CHY4U","AMI4M","AWL4M","CHM4E"];
var fieldsOfInterest = ["Computer Science", "Biology", "Community Development", "English", "Business Administration", "Business Communication", "Business Economics", "Child and Youth Studies", "Math", "Mathematics", "Computing", "Anthropology", "Criminology", "Engineering", "Electrical Engineering", "Environmental", "Life Sciences", "Bioinformatics", "Chemistry", "Chemical Engineering", "Civil Engineering", "Ancient Studies", "Arts", "Neuroscience", "Biochemistry", "Commerce", "	Social Sciences", "Journalism", "Psychologica", "Economics", "Physics", "Cultural Studies", "Forensic Science", "Architecture", "Law", "Humanities", "Criminal Justice", "Music ", "Fine Arts", "Technology", "Automotive Engineering", "Drama Studies", "Gender & Women's Studies", "Industrial Engineering", "History", "Nursing", "Science"];

//when page loads, set up the autocompleter objects
window.addEventListener("DOMContentLoaded", function() {

	//set up the autocompleter for field of interest input
	//CODE FROM LIBRARY WEBSITE START*
	var fieldOfInterestAutoComplete = new autoComplete({
		selector: "#fieldOfInterest",
		minChars: 1,
		source: function(term, suggest){
			term = term.toLowerCase();
			var choices = fieldsOfInterest;
			var suggestions = [];
			for (i = 0; i < choices.length; i++){
				if (~choices[i].toLowerCase().indexOf(term)) suggestions.push(choices[i]);
			}
			suggest(suggestions);
		}
	});
	//CODE FROM LIBRARY WEBSITE END*

	//for all 6 course code input fields
	for (var i = 1; i <= 6; i++) {
		//set up the autocompleter for course i input
		//CODE FROM LIBRARY WEBSITE START*
		var courseCode1AutoComplete = new autoComplete({
			selector: "#courseCode" + i,
			minChars: 1,
			source: function(term, suggest){
				term = term.toLowerCase();
				var choices = ontarioCourses;
				var suggestions = [];
				for (i = 0; i < choices.length; i++){
					if (~choices[i].toLowerCase().indexOf(term)) suggestions.push(choices[i]);
				}
				suggest(suggestions);
			}
		});
		//CODE FROM LIBRARY WEBSITE END*
	}
});
