function showSelectedList() { // 선택 된 리스트의 썸네일을 보여주고 마우스를 가져다 대면 제목과 시간을 보여준다.
	var selectedListHTML = "";
	for(var i = 0; i < selectedVideos.length; i++) {
		selectedListHTML += 
		'<span style="float: left;">' +
			'<a href="#" id="selected_' + selectedVideos[i] + '">' +
				'<img src="' + videos[selectedVideos[i]].thumbnail + '" style="height: 6vh; margin: 1px;" title="' + 
				videos[selectedVideos[i]].title + ' ' + convertPlayTime(videos[selectedVideos[i]].playtime) + '">' +
			'</a>' +
		'</span>';
		$(document).on("click", "#selected_" + selectedVideos[i], removeFromSelectedList(selectedVideos[i]));	
	}	
	$("#selected_lists").html(selectedListHTML);
	refreshCheckBox();
}

function refreshCheckBox() { // Recommend, Topic, My List, Search 리스트의 체크박스를 새로고침 한다.
	//$("input.checkbox").attr("checked", false);
	$("input.checkbox").prop("checked", false);
	for( var i = 0; i < selectedVideos.length; i++){
		$("input.checkbox" + selectedVideos[i]).prop("checked", true);
	}
}

function removeFromSelectedList(id) { // 선택 된 비디오의 썸네일을 클릭하면 해당 비디오가 선택 리스트에서 제거된다.
	return function(event) {
		var index = selectedVideos.indexOf(id);
		if(index >= 0) {
			selectedVideos.splice(index, 1);
		}
		//$("input.checkbox" + id).attr("checked", false);
		showSelectedList();
	}
}

function toggleCheckList(id, isChecked) { //체크박스를 클릭하면 해당 비디오를 선택 리스트에 넣고 뺀다.
	if(isChecked){
		selectedVideos.push(id);		
		//$("input.checkbox" + id).attr("checked", true);
	} 
	else {
		var index = selectedVideos.indexOf(id);
		if(index >= 0) {
			selectedVideos.splice(index, 1);
		}
		//$("input.checkbox" + id).attr("checked", false);
	}
	showSelectedList();
}
