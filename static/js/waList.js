function changeListName(index) {
	var name =  $("#input_change_list_name").val();
	if(name == undefined || name == "") {
		alert("리스트 이름을 입력해주세요");
		return;
	}
	var data = myLists[index];
	data.name = name;
	$.ajax({
		type: "PUT",
		url: hbUrl + hbApiPath + "/accounts/" + accounts.userId + "/mylists/" + myLists[index].id,
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", accounts.token)
		},
		data : JSON.stringify(data),
		success: function(json) {
			myLists[index] = json;
			sortBookMarks();
			createBookMarkHTML();
			sortMyLists();
			createMyListHTML();
			refreshCheckBox();
		}
	}).fail( function (message){
		console.log(message);
	});
}

function deleteList(index) {
	console.log(index);
	$("#myDropdown").removeClass("drop-down-show");
	if( confirm("\"" + myLists[index].name + "\" 리스트를 정말 삭제하시겠습니까?") ) {
		$.ajax({
			type: "DELETE",
			url: hbUrl + hbApiPath + "/accounts/" + accounts.userId + "/mylists/" + myLists[index].id,
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", accounts.token)
			},
			success: function(json){
				myLists.splice(index, 1);
				sortBookMarks();
				createBookMarkHTML();
				sortMyLists();
				createMyListHTML();
				refreshCheckBox();
			},
			error: function(message){
				console.log(message);
			}
		});
	}
}

function myListMenu(index) {
	$("#myDropdown" + index).toggleClass("drop-down-show");
}

function modalChangeListName(index) {
	$("#myDropdown").removeClass("drop-down-show");
	
	var modal = $("#modal_setting");
	var changeListNameHTML = "";
	modal.html(changeListNameHTML);
	changeListNameHTML +=
	'<div class="modal-dialog">' +
		'<div class="modal-content">' +
			'<div class="modal-header"' +
				'style="background-color: rgb(82, 167, 231); color: rgb(237, 254, 255);">' +
				'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
				'<h2 class="modal-title">내 목록 이름 변경</h2>' +
			'</div>' +
			'<div class="modal-body"' +
			'style="font-size: 18px; padding-top: 30px; background-color: rgb(238, 238, 238);">' +
				'<div class="form-group">' +
					'<label for="inputdefault">목록 이름</label>' +
					'<input class="form-control" onkeyup="return keyUp(event,' + index + ')" value="' + myLists[index].name + '" placeholder="' + myLists[index].name + '" id="input_change_list_name" type="text" onfocus="this.value = this.value;"  autofocus >' +
				'</div>' +
			'</div>' +
			'<div class="modal-footer">' +
				'<button type="button" class="btn btn-success" data-dismiss="modal" onclick="changeListName(' + index +')">저장</button>' +
				'<button type="button" class="btn btn-success" data-dismiss="modal">취소</button>' +
			'</div>' +
		'</div>' +
	'</div>';
	modal.html(changeListNameHTML);
}

function modalInsertList() {
	if(bookMarks == null) getSubBookMarks();
	if(myLists == null) getSubMyLists();

	var modal = $("#modal_setting");
	var insertHTML = "";

	$.when(when_bookMarks, when_myLists).done(function() {
		sortBookMarks();
		sortMyLists();
		insertHTML = 
		'<div class="modal-dialog">' +
			'<div class="modal-content" id="sendMessagePage">' +
				'<div class="modal-header"' +
					'style="background-color: rgb(82, 167, 231); color: rgb(237, 254, 255);">' +
					'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
					'<h2 class="modal-title">내 목록에 추가</h2>' +
				'</div>' +
				'<div class="modal-body"' +
					'style="font-size: 18px; padding-top: 30px; background-color: rgb(238, 238, 238);">' +
					'<form role="form" id="radio_insert_list_name">' +
						'<div class="radio">' +
							'<label><input type="radio" autofocus name="list_name" value="" >새 목록에 추가&nbsp;&nbsp;<input onkeyup="return keyUp(event)" type="text" placeholder="새 목록 이름" id="input_insert_new_list_name"></label>' +
						'</div>';
						for(var i = 0; i < myLists.length; i++) {
							insertHTML +=
							'<div class="radio">' +
								'<label><input type="radio" name="list_name" value="' + i + '">' + myLists[i].name + '</label>' +
							'</div>';
						}
						insertHTML +=
						'<br>' +
					 '</form>' +
					 //'<button onclick="insertList()">추가하기</button>' +
				'</div>' +
				'<div class="modal-footer">' +
				'<button type="button" class="btn btn-success" data-dismiss="modal" onclick="insertList()">저장</button>' +
				'<button type="button" class="btn btn-success" data-dismiss="modal">닫기</button>' +
				'</div>' +
			'</div>' +
		'</div>';
	modal.html(insertHTML);
	});
}

function insertList() {
	var index = $("input[name='list_name']:checked").val();
	var type = "";
	var url = hbUrl + hbApiPath + "/accounts/" + accounts.userId + "/mylists";
	var data = {};
	data.videos = [];
	
	if(index == "" || index == undefined) {
		type = "POST";
		index = myLists.length;
		data.name = $("#input_insert_new_list_name").val();
	} else {
		type = "PUT";
		url = url + "/" + myLists[index].id;
		data.name = myLists[index].name;
		data.videos = JSON.parse(JSON.stringify(myLists[index].videos)); //이렇게 해야 포인터만 복사되지 않고 깊은복사가 일어난다.
	}	
	data.videos = data.videos.concat(selectedVideos);
	$.ajax({
		type: type,
		url: url,
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", accounts.token)
		},
		data : JSON.stringify(data),
		success: function(json) {
			var accordion_m = $("#accordion_m");
			accordion_m.html("");
			accordion_m.html("<img src=\"/static/img/loading.gif\">");
			myLists[index] = json;
			sortBookMarks();
			createBookMarkHTML();
			sortMyLists();
			createMyListHTML();
			selectedVideos = [];
			showSelectedList();
			$("input.checkbox").prop("checked", false);			
			$(".list-group-item").css("background-color", "white");
		}
	}).fail( function (message){
		console.log(message);
	});
}

function createNewListPage() {
	var modal = $("#modal_setting");
	var createNewListHTML = "";
	modal.html(createNewListHTML);
	createNewListHTML +=
	'<div class="modal-dialog">' +
		'<div class="modal-content">' +
			'<div class="modal-header"' +
				'style="background-color: rgb(82, 167, 231); color: rgb(237, 254, 255);">' +
				'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
				'<h2 class="modal-title">내 목록 만들기</h2>' +
			'</div>' +
			'<div class="modal-body"' +
			'style="font-size: 18px; padding-top: 30px; background-color: rgb(238, 238, 238);">' +
				'<div class="form-group">' +
					'<label for="inputdefault">목록 이름</label>' +
					'<input class="form-control" autofocus onkeyup="return keyUp(event)" placeholder="내 목록 이름" id="input_new_list_name" type="text">' +
				'</div>' +
			'</div>' +
			'<div class="modal-footer">' +
			'<button type="button" class="btn btn-success" data-dismiss="modal" onclick="createNewList()">저장</button>' +
			'<button type="button" class="btn btn-success" data-dismiss="modal">취소</button>' +
			'</div>' +
		'</div>' +
	'</div>';
	modal.html(createNewListHTML);
}

function createNewList() {
	var name = $("#input_new_list_name").val();
	if(name == undefined || name == "") {
		alert("리스트 이름을 입력해주세요");
		return;
	}
	var data = {};
	data.name = name;
	data.videos = [];
	$.ajax({
		type: "POST",
		url: hbUrl + hbApiPath + "/accounts/" + accounts.userId + "/mylists",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", accounts.token)
		},
		data : JSON.stringify(data),
		success: function(json) {
			myLists.push(json);
			sortBookMarks();
			createBookMarkHTML();
			sortMyLists();
			createMyListHTML();
			refreshCheckBox();
		}
	}).fail( function (message){
		console.log(message);
	});
}

function getModalEditListHTML(index, newOpen) {
	var editListHTML = "", itemHTML = "", categoryHTML = "";
	var previousCategoryIndex, currentCategoryIndex, count = 0;
	if(newOpen) {
		targetVideos = JSON.parse(JSON.stringify(myLists[index].videos));
		selectedEditLists = [];
	}
	editListHTML =	
		'</div>' +
		'<div class="modal-footer">' +
		'<button type="button" class="btn btn-success" data-dismiss="modal" onclick="editList(' + index + ')">저장</button>' +
		'<button type="button" class="btn btn-success" data-dismiss="modal">취소</button>' +
		'</div>' +
	'</div>' +
'</div>';
	
	
				for(var i = targetVideos.length; i-- ; ){
				currentCategoryIndex = findIndexFromCode(videos[targetVideos[i]]); 
				if((0 < count) && (currentCategoryIndex != previousCategoryIndex)){
					editListHTML =
					'<div style="font-size: 14px; background-color: rgb(209, 209, 209); padding: 5px 20px;">' +
					categories[previousCategoryIndex] +
					'<span class="label label-default label-as-badge">' + count + '</span></div>' + editListHTML;
					count = 0;
				}
				itemHTML =
				'<div class="row editItem" id="editItem' + targetVideos[i] + '" >' +
					'<div class="col-sm-11">' +
						'<div class="row">' +
							'<div class="col-sm-2">' +
								'<img src="' + videos[targetVideos[i]].thumbnail + '" class="img-responsive">' +
							'</div>' +
							'<div class="col-sm-10">' +
								'<div class="row">' + videos[targetVideos[i]].title + '</div>' +
								'<div class="row" style="font-size:17px;">' + convertPlayTime(videos[targetVideos[i]].playtime) + '</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="col-sm-1" style="padding-left: 0px; margin-left:0px;">' +
						'<input type="checkbox" class="editCheck" onclick="editCheckClick(this.value)" value="' + targetVideos[i] + '">' +
					'</div>' +
				'</div>';
				count++;
				previousCategoryIndex = currentCategoryIndex;
				editListHTML = itemHTML + editListHTML;
				}
				editListHTML =
					'<div class="modal-dialog">' +
						'<div class="modal-content">' +
							'<div class="modal-header"' +
								'style="background-color: rgb(82, 167, 231); color: rgb(237, 254, 255); border: none;">' +
								'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
								'<h2 class="modal-title" id="edit-modal-title">' + myLists[index].name +
									'<span class="edit-list-icon glyphicon glyphicon-trash" onclick="editListRemove(' + index + ')"></span>' +
									'<span class="edit-list-icon glyphicon glyphicon-chevron-down" onclick="editListDown(' + index + ')"></span>' +
									'<span class="edit-list-icon glyphicon glyphicon-chevron-up" onclick="editListUp(' + index + ')"></span>' +
								'</h2>' +
							'</div>' +
							'<div class="modal-body modal-edit-list-body"' +
							'style="font-size: 18px; padding: 0px; background-color: rgb(238, 238, 238);">' +
							'<div style="font-size: 14px; background-color: rgb(209, 209, 209); padding: 5px 20px;">' +
							categories[previousCategoryIndex] +
							'<span class="label label-default label-as-badge">' + count + '</span></div>' +
							editListHTML;
				return editListHTML;
}

function modalEditList(index) {
	var modal = $("#modal_setting");
	modal.html("");
	modal.html(getModalEditListHTML(index, true));
}

function editList(index) {
	var type = "PUT";
	var url = hbUrl + hbApiPath + "/accounts/" + accounts.userId + "/mylists/" + myLists[index].id;
	var data = {};
	data.name = myLists[index].name;
	data.videos = targetVideos;

	$.ajax({
		type: type,
		url: url,
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", accounts.token)
		},
		data : JSON.stringify(data),
		success: function(json) {
			var accordion_m = $("#accordion_m");
			accordion_m.html("");
			accordion_m.html("<img src=\"/static/img/loading.gif\">");
			myLists[index] = json;
			sortBookMarks();
			createBookMarkHTML();
			sortMyLists();
			createMyListHTML();
			$("input.checkbox").prop("checked", false);
			$(".list-group-item").css("background-color", "white");
		}
	}).fail( function (message){
		console.log(message);
	});
}

function editCheckClick(id) {
	var index = selectedEditLists.indexOf(Number(id));
	if( -1 < index) {
		selectedEditLists.splice(index, 1);
	} else {
		selectedEditLists.push(Number(id));
	}
	refreshEditList();	
}

function editListUp(index) {
	var modal = $("#modal_setting");
	
	var targetIndex = [];
	var temp;
	for(var i = targetVideos.length; i--;) {
		if(-1 < selectedEditLists.indexOf(targetVideos[i])) {
			if(i == 0) break;
			targetIndex.push(i);
			if (-1 == selectedEditLists.indexOf(targetVideos[(i - 1)])) {
				temp = targetVideos[(i - 1)];
				for(var j = targetIndex.length; j-- ;) {
					targetVideos[targetIndex[j] - 1] = targetVideos[targetIndex[j]];
				}
				targetVideos[targetIndex[0]] = temp;
				i--;
				targetIndex = [];
			}
		}
	}
	modal.html("");
	modal.html(getModalEditListHTML(index));
	refreshEditList();
}

function editListDown(index) {
	var modal = $("#modal_setting");
	var targetIndex = 0;
	var targetIndex = [];
	var temp;
	for(var i = 0; i < targetVideos.length; i++) {
		if(-1 < selectedEditLists.indexOf(targetVideos[i])) {
			if(i == (targetVideos.length - 1)) break;
			targetIndex.push(i);
			if (-1 == selectedEditLists.indexOf(targetVideos[(i + 1)])) {
				temp = targetVideos[(i + 1)];
				for(var j = targetIndex.length; j-- ;) {
					targetVideos[targetIndex[j] + 1] = targetVideos[targetIndex[j]];
				}
				targetVideos[targetIndex[0]] = temp;
				i++;
				targetIndex = [];
			}
		}
	}
	modal.html("");
	modal.html(getModalEditListHTML(index));
	refreshEditList();
}

function refreshEditList() {
	$(".editItem").css("background-color", "rgb(238, 238, 238)");
	$.each(selectedEditLists, function(i, v) {
		$(".editCheck[value^=" + v + "]").prop("checked", true);
		$("#editItem" + v).css("background-color", "rgb(135, 214, 244)");
	});
}

function playMyListYoutube(index) {
	loadYouTubePlayer();
	youtubePlayList = [];
	currentPlayMyListIndex = index;
	$.each(myLists[index].videos, function(i, v) {
		youtubePlayList.push(videos[v].youtube);
	});
	playerYT.loadVideoById(youtubePlayList[0]);
	$("#title").html(videos[myLists[index].videos[0]].title);
	$("#description").html(replaceDescription(videos[myLists[index].videos[0]].description));
}

function playMyListFlowPlayer(index) {
	loadFlowPlayer();
	youtubePlayList = [];
	currentPlayMyListIndex = index;
	$.each(myLists[index].videos, function(i, v) {
		youtubePlayList.push(videos[v].youtube);
	});
}

function editListRemove(index) {
	var modal = $("#modal_setting");
	var targetIndex = 0;
	$.each(selectedEditLists, function(i, v) {
		targetIndex = targetVideos.indexOf(Number(v));
		targetVideos.splice(targetIndex, 1);
	});
	modal.html("");
	modal.html(getModalEditListHTML(index));
	refreshEditList();
}