function showSelectedList() { // 선택 된 리스트의 썸네일을 보여주고 마우스를 가져다 대면 제목과 시간을 보여준다.
	var selectedListHTML = "";
	var sectionWidth = parseInt($(".hb-section").css("width"), 10);
	for(var i = 0; i < selectedVideos.length; i++) {
		selectedListHTML += 
		'<span style="float: left; margin-top: 15px; margin-right: 14px">' +
			'<a href="#" id="selected_' + selectedVideos[i] + '">' +
				'<img src="' + videos[selectedVideos[i]].thumbnail + '" style="width: ' + (sectionWidth / 9) + 'px; margin: 1px;" title="' + 
				videos[selectedVideos[i]].title + ' ' + convertPlayTime(videos[selectedVideos[i]].playtime) + '">' +
			'</a>' +
		'</span>';
		$(document).on("click", "#selected_" + selectedVideos[i], removeFromSelectedList(selectedVideos[i]));	
	}	
	$("#selected_lists").html(selectedListHTML);
	refreshCheckBox();
}

function refreshCheckBox() { // Recommend, Topic, My List, Search 리스트의 체크박스를 새로고침 한다.
	console.log("refreshCheckBox");
	//$("input.checkbox").attr("checked", false);
	var isSelected = false;
	//$("input.checkbox").prop("checked", false);
	$(".list-manipulation").css("display", "none");
	for( var i = 0; i < selectedVideos.length; i++){
		isSelected = true;
		$("input.checkbox" + selectedVideos[i]).prop("checked", true);
		$(".list" + selectedVideos[i]).css("background-color", "rgb(204, 241, 255)");
	}
	if(isSelected) {
		$(".list-manipulation").css("display", "block");
	}
}

function removeFromSelectedList(id) { // 선택 된 비디오의 썸네일을 클릭하면 해당 비디오가 선택 리스트에서 제거된다.
	return function(event) {
		var index = selectedVideos.indexOf(id);
		if(index >= 0) {
			selectedVideos.splice(index, 1);
		}
		$("input.checkbox" + id).prop("checked", false);
		
		
		$(".list" + id).css("background-color", "white");
		/*
		$(".list" + id).mouseenter(function() {
			$(this).css("background-color", "rgb(231, 247, 253)");
		});
		
		$(".list" + id).mouseleave(function() {
			$(this).css("background-color", "white");
		});
		*/
		
		showSelectedList();
	}
}

function toggleCheckList(id, isChecked) { //체크박스를 클릭하면 해당 비디오를 선택 리스트에 넣고 뺀다.
	if(isChecked){
		if(selectedVideos.length < 7) {
			if (selectedVideos.indexOf(id) < 0) {
				selectedVideos.push(id);
			}
		} else {
			//$("input.checkbox" + id).attr("checked", true);
			$("input.checkbox" + id).prop("checked", false);
			alert("비디오는 최대 7개까지 선택할 수 있습니다!");
		}
	} 
	else {
		var index = selectedVideos.indexOf(id);
		if(index >= 0) {
			selectedVideos.splice(index, 1);
		}
		$("input.checkbox" + id).prop("checked", false);		
		$(".list" + id).css("background-color", "white");
		/*
		$(".list" + id).mouseenter(function() {
			$(this).css("background-color", "rgb(231, 247, 253)");
		});
		
		$(".list" + id).mouseleave(function() {
			$(this).css("background-color", "white");
		});
		*/
		
	}
	showSelectedList();
}
