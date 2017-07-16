/*
	Sort programs using the merge sort algorithm
*/

//sort a list of programs, returning the sorted list
function mergeSort(programs){

	//base case - only 1 or 0 programs in list, thus is sorted
    if(programs.length <= 1){
		return programs;
	}

	var middleIndex = programs.length/2;
    var leftHalf   = programs.slice(0, middleIndex);
    var rightHalf  = programs.slice(middleIndex, programs.length);

	//sorted list is the combination of the sorted left half and right half
    return merge(mergeSort(leftHalf), mergeSort(rightHalf));

}

//merge 2 sorted lists
function merge(left, right){
    var merged = [];

	//while both lists are not empty add from the list with the greater ranking score
    while(left.length != 0 && right.length != 0){
        if(left[0].rankingScore >= right[0].rankingScore){
            merged.push(left.shift());
        } else {
            merged.push(right.shift());
        }
    }

	//if the left list is not empty add from it only
    while(left.length != 0){
        merged.push(left.shift());
	}

	//if the right list is not empty add from it only
    while(right.length != 0){
        merged.push(right.shift());
	}

	//return the merged list
    return merged;
}
