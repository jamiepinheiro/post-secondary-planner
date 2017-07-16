//ammend the database to be more consistant

//download current unparsed version of programs
var programs;
(function(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			programs = JSON.parse(this.response);
			parse();
		}
	};
	xhttp.open("GET", "https://api.myjson.com/bins/n1lth", true);
	xhttp.send();

})();


//once downloaded parse the programs
function parse() {

	//go through each program
	for(var i = 0; i < programs.length; i++){

		//add an id attribute to the program
		programs[i].id = i;

		//if missing a title, say no info
		if(programs[i].title == ""){
			programs[i].title = "No Info";
		}

		//if missing a university, say no info
		if(programs[i].university == ""){
			programs[i].university = "No Info";
		}

		//if missing a outside learning, say no info
		if(programs[i].outsideLearning == ""){
			programs[i].outsideLearning = "No Info";
		}

		//find first integer in the grade range using regexs
		programs[i].gradeRange = programs[i].gradeRange.replace(/\D/g,' ').trim().split(" ")[0];

		//if missing a grade range, say no info
		if(programs[i].gradeRange == ""){
			programs[i].gradeRange = "No Info";
		}

		//from list of requirements, find all the 5 letter course codes and put them into a list
		var courses = [];
		if(programs[i].requirements != null){

			//go through each requirement
			for(var j = 0; j < programs[i].requirements.length; j++){

				//break the line up by spaces
				var words = programs[i].requirements[j].split(" ");

				//go through each of those words
				for(var k = 0; k < words.length; k++){

					//if the word is a course code add it to the list of courses
					if(words[k].length == 5 && words[k].charAt(3) == '4'){
						courses.push(words[k].replace(/ /g,''));
					}
				}
			}
		}

		//if missing requirements, say no info
		programs[i].requirements = courses;
		if(programs[i].requirements.length == 0){
			programs[i].requirements[0] = "No Info";
		}

		//if missing ouac code, say no info
		if(programs[i].ouac == ""){
			programs[i].ouac = "No Info";
		}

		//if missing a url, say no info
		if(programs[i].url == ""){
			programs[i].url = "No Info";
		}
	}

	//print out the results
	console.log(JSON.stringify(programs));
}
