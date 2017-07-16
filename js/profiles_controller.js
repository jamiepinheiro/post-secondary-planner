/*
	Controller for the profiles view, handling all actions related to it
*/

//change the view to the profiles page
function viewProfiles(){

	//set current profile to null (need to login one profile now)
	profile = null;

	loadProfiles();
	switchView("profilesPage");
}

//load profiles from database (HTML5 local storage)
function loadProfiles(){

	//query the database, if empty, create an empty list, otherwise parse the stored JSON into a list of javascript objects
	profiles = JSON.parse(localStorage.getItem("profiles")) || [];

	//if other classes exist, show them, otherwise hide the panel to show them
	if(profiles.length == 0){
		addClass("existingProfilesHolder", "hidden");
	}else{
		removeClass("existingProfilesHolder", "hidden");
	}
	updateViews();
}


//login a particular profile loading saved data from it
function login(profilename) {

	//error if the profile name is empty
	if(profilename.replace(/\s/g, '') == ""){
		removeClass("formError", "hidden");
	}

	//if its not empty either load the profile if it exists or create a new one if it does not
	else{

		//find index of the profile based on the profilename
		var index = -1;
		if(profiles != null){
			for(var i = 0; i < profiles.length; i++){
				if(profiles[i].profilename == profilename){
					index = i;
				}
			}
		}

		//if the profile doesnt exist create a new one and save it
		if(index == -1){
			profile = new Profile(profilename);
			profiles.push(profile);
			saveProfiles();
		}
		//if the profile does exist, set it to the current profile
		else{
			profile = profiles[index];
		}

		//move to searchpage
		switchView("searchPage");

		updateViews();
	}
}

//delete a particular profile
function remove(profilename){

	//find profile index in list
	var index = -1;
	if(profiles !== null){
		for(var i = 0; i < profiles.length; i++){
			if(profiles[i].profilename == profilename){
				index = i;
			}
		}
	}

	//if it was in the list, remove it and save the updated profiles to the database
	if(index !== -1){
		profiles.splice(index, 1);
		saveProfiles();
		loadProfiles();
	}
}
