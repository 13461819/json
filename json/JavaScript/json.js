function getVideos() {
	
	$.getJSON("https://hbreeze4ani.appspot.com/api/v1/videos",
					function(json) {
						createVideos(); //코드값의 개수만큼 배열을 생성한다. (a ~ l 까지 12개)
						categorizeVideos(json); // code의 a~l값을 가지고 12개의 배열에 분류해서 넣는다.
						sortVideos(); // 분류 된 배열을 정렬한다.
						createRecommendHTML(); //정렬 된 배열을 가지고 HTML코드를 생성한다.
						getTopic();
					})
			.fail(
					function(request, status, error) {
						var msg = "code:" + request.status + "<br>"
								+ "message:" + request.responseText + "<br>"
								+ "status:" + status + "<br>" + "error:"
								+ error;
						console.log(msg);

						$("#result")
								.html(
										$("#result").html()
												+ "<div class=\"alert alert-success fade in\"><a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a><strong>.getJSON()</strong><br>"
												+ msg
												+ "</div>");
					});
}

function getTopic() {
	$
			.getJSON("https://hbreeze4ani.appspot.com/api/v1/topics",
					function(json) {
						createTopics(json); // 토픽은 분류할 것이 없기 때문에 그냥 넣는다.
						sortTopics(); // 배열을 정렬한다.
						createTopicHTML(); // 정렬 된 배열을 가지고 HTML코드를 생성한다.
					})
			.fail(
					function(request, status, error) {
						var msg = "code:" + request.status + "<br>"
								+ "message:" + request.responseText + "<br>"
								+ "status:" + status + "<br>" + "error:"
								+ error;
						console.log(msg);

						$("#result")
								.html(
										$("#result").html()
												+ "<div class=\"alert alert-success fade in\"><a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a><strong>.getJSON()</strong><br>"
												+ msg
												+ "</div>");
					});
}

var videos_length = 12;
var videos = new Array(); // code a~l까지 각각의 배열
var topics = new Array(); // topic별 배열
var selectedVideos = new Array();
var categories = [
	'질병증상',
	'진단적 술기',
	'치료적 술기',
	'입원/퇴원',
	'의약품',
	'운동/재활',
	'자가 치료',
	'식이',
	'행정 교육',
	'의료 기기 사용',
	'기타',
	'환자 안내 시리즈'
];

function createVideos() { //코드의 개수만큼 (a~l 12개)배열을 생성한다.
	console.log('createVideos');
	for( var i = 0; i < videos_length; i++) {
		videos[i] = new Array();
	}
}

function createTopics(json) { //코드의 개수만큼 (a~l 12개)배열을 생성한다.
	console.log('createTopics');
	for( var i = 0; i < json.length; i++) {
		topics.push(json[i]);
	}
}


function categorizeVideos(json) { // code의 a~l값을 가지고 12개의 배열에 분류한다.
	console.log('categorizeVideos');
	var index = 0;
	for( var i = 0; i < json.length; i++) {
		index = findIndexFromCode(json[i]);
		videos[index].push(json[i]);
		videos[json[i].id] = json[i];
	}
}

function findIndexFromCode(value) { //a~l 까지의 코드값을 0~11로 반환한다.
	return (value.code.charCodeAt(0) - 97);
}

function sortVideos() { // 분류 된 배열을 오름차순 정렬한다.
	console.log('sortVideos');
	for(var i = 0; i < videos_length; i++) {
		videos[i].sort(function(a, b) {
			return (a.title > b.title) ? 1 : -1;
		});
	}
}

function sortTopics() { // 분류 된 배열을 오름차순 정렬한다.
	console.log('sortTopics');
	topics.sort( function (a, b) {
		return (a.name > b.name) ? 1 : -1;
	});
}

function createTopicHTML() {
	console.log('createTopicHTML');
	var i, j = 0;
	var topicHTML = "", id = "";
	for(i = 0; i < topics.length; i++) {
		topicHTML += 
			'<div class="panel panel-default" style="margin-top: 0px;">' +
				'<div class="panel-heading">' +
					'<span class="panel-title" style="margin-top: 8px;">' +
						'<a data-toggle="collapse" href="#collapse_t' + i + '" onclick="topicArrowRotate(' + i + ')" style="font-size: 12px;">' + 
							//'<img src="../image/arrow.png" id="topicArrow' + i + '" class="arrow img-responsive">' + topics[i].name +
							'<span id="topicArrow' + i + '" class="arrow glyphicon glyphicon-plus-sign" style="font-size:15px;"></span>' + topics[i].name +
							'<span class="label label-default label-as-badge">' + topics[i].videos.length + '</span>' +
						'</a>' + 
					'</span>' +
				'</div>' +
				'<div id="collapse_t' + i + '" class="panel-collapse collapse">' + 
					'<div class="list-group">';
						for(j = 0; j < topics[i].videos.length; j++) {
						id = topics[i].videos[j];
						topicHTML += 
						'<a href="#" class="list-group-item list' + id + '">' +
							//' onclick="replaceAndLoadYoutubeByID(' + id + ')">' +
							//' id = "list2_' + id + '">' +	
							'<div class="row">' +
								'<div class="col-sm-3">' +
									'<img src="' + videos[id].thumbnail + '" class="img-responsive">' +
								'</div>' +
								'<div class="col-sm-7">' +	
									'<div class="row">' +
										videos[id].title + 
									'</div>' +
									'<div class="row" style="font-size:13px;">' + 
										convertPlayTime(videos[id].playtime) +
									'</div>' +
								'</div>' +
								'<div class="col-sm-1" style="padding-left: 0px;">' +
									'<input type="checkbox" class="checkbox checkbox' + id + '">' +
								'</div>' +
							'</div>' +
						'</a>';
						}
						topicHTML += 
					'</div>' +
				'</div>' + 
			'</div>';
	}
	$("#accordion_t").html(topicHTML);
}

function createRecommendHTML() { //정렬 된 배열을 가지고 HTML코드를 생성한다.
	console.log('createRecommendHTML');
	var i, j = 0;
	var recommendHTML = "", id = "";
	for(i = 0; i < videos_length; i++) {
		if(0 < videos[i].length) {
			recommendHTML += 
			'<div class="panel panel-default" style="margin-top:0px;">' +
				'<div class="panel-heading">' +
					'<span class="panel-title" style="margin-top: 8px;">' +
						'<a data-toggle="collapse" href="#collapse_r' + i + '" onclick="recommendArrowRotate(' + i + ')" style="font-size: 12px;">' + 
							//'<img src="../image/arrow.png" id="recommendArrow' + i + '" class="arrow img-responsive">' + categories[i] +
							'<span id="recommendArrow' + i + '" class="arrow glyphicon glyphicon-plus-sign" style="font-size:15px;"></span>' + categories[i] +
							'<span class="label label-default label-as-badge">' + videos[i].length + '</span>' +
						'</a>' + 
					'</span>' +
				'</div>' +
				'<div id="collapse_r' + i + '" class="panel-collapse collapse">' + 
					'<div class="list-group">';
						for(j = 0; j < videos[i].length; j++) {
							id = videos[i][j].id;
							recommendHTML += 
							'<a href="#" class="list-group-item list' + id + '">' +
								//' onclick="replaceAndLoadYoutube(' + i + ', ' + j + ')">' +
							//' id = "list_' + id + '">' +	
								'<div class="row">' +
									'<div class="col-sm-3">' +
										'<img src="' + videos[id].thumbnail + '" class="img-responsive">' +
									'</div>' +
									'<div class="col-sm-7">' +
										'<div class="row">' + 
											videos[id].title + 
										'</div>' +
										'<div class="row" style="font-size:13px;">' +
											convertPlayTime(videos[id].playtime) +
										'</div>' +
									'</div>' +
									'<div class="col-sm-1" style="padding-left: 0px;">' +
										'<input type="checkbox" class="checkbox checkbox' + id + '">' +
									'</div>' +
								'</div>' +
							'</a>';
							$(document).on("click", "a.list" + id, loadID(id));
							$(document).on("click", "input.checkbox" + id, toggleID(id, this));
						}
						recommendHTML += 
					'</div>' +
				'</div>' + 
			'</div>';
		}
	}
	$("#accordion_r").html(recommendHTML);
}

function loadID(id) {
	return function(event) {
		replaceAndLoadYoutubeByID(id);
	}
}

function toggleID(id, element) {
	return function(event) {
		event.stopPropagation();
		//console.log(this);
		toggleCheckList(id, $(this).is(":checked"));
	}
}

function convertPlayTime(playtime) { // 3자리 숫자로 되어있는 playTime을 mm분 ss초로 변환한다.
	var min, sec = 0;
	min = Math.floor(playtime / 60);
	if(min < 10) min = "0" + min;
	sec = playtime % 60;
	if(sec < 10) sec = "0" + sec;
	return ("(" + min + ":" + sec + ")");
}

var accordion_resize = function() {
	$('#accordion_r').height($(window).height() /*- $('#draw_menu_button').height()*/ - 700);
	$('#accordion_t').height($(window).height() /*- $('#draw_menu_button').height()*/ - 700);
}

var playerYT = null;

function replaceAndLoadYoutubeByID(id) { //
	loadYouTube(videos[id].title, replaceDescription(videos[id].description), videos[id].youtube);
}

function replaceDescription(description) { //description의 개행을 HTML의 "<br>"로 바꾼다.
	description = description.replace(/(\r\n|\n\r|\r|\n)/g, "<br>");
	return description;
}

function showSelectedList() { //체크박스에 선택 된 리스트를 보여준다.
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

function refreshCheckBox() {
	//$("input.checkbox").attr("checked", false);
	$("input.checkbox").prop("checked", false);
	for( var i = 0; i < selectedVideos.length; i++){
		$("input.checkbox" + selectedVideos[i]).prop("checked", true);
	}
}

function removeAllFromSelectedList() {
	return function(event) {
		selectedVideos = [];
		showSelectedList();
		//$("input.checkbox").attr("checked", false);
	}
}

function removeFromSelectedList(id) {
	return function(event) {
		var index = selectedVideos.indexOf(id);
		if(index >= 0) {
			selectedVideos.splice(index, 1);
		}
		//$("input.checkbox" + id).attr("checked", false);
		showSelectedList();
	}
}

function toggleCheckList(id, isChecked) { //체크박스 토글
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
var arrow, degree = 0, rotateINT; // rotate할 목록 화살표, 각도, 인터벌참조자

function arrowRotate() {
	//console.log("arrowRotate");
	degree += 10;
	arrow.css({
		transform : "rotate(" + degree + "deg)",
		webkitTransform : "rotate(" + degree + "deg)",
		OTransform : "rotate(" + degree + "deg)",
		MozTransform : "rotate(" + degree + "deg)"
	});
	if (degree == 180 || degree >= 360) {
		clearInterval(rotateINT);
		if (degree >= 360) {
			degree = 0
		}
	}
}

function recommendArrowRotate(arrowID) {
	console.log("recommendArrowRotate");
	arrow = $("#recommendArrow" + arrowID);
	
	
	if(arrow.hasClass("glyphicon-plus-sign")) {
		arrow.removeClass("glyphicon-plus-sign");
		arrow.addClass("glyphicon-minus-sign");
	} else {
		arrow.removeClass("glyphicon-minus-sign");
		arrow.addClass("glyphicon-plus-sign");
	}
	
	/*
	clearInterval(rotateINT);
	rotateINT = setInterval("arrowRotate()", 10);*/
}

function searchArrowRotate(arrowID) {
	console.log("searchArrowRotate");
	arrow = $("#searchArrow" + arrowID);
	
	
	if(arrow.hasClass("glyphicon-plus-sign")) {
		arrow.removeClass("glyphicon-plus-sign");
		arrow.addClass("glyphicon-minus-sign");
	} else {
		arrow.removeClass("glyphicon-minus-sign");
		arrow.addClass("glyphicon-plus-sign");
	}
	
	/*
	clearInterval(rotateINT);
	rotateINT = setInterval("arrowRotate()", 10);*/
}

function topicArrowRotate(arrowID) {
	console.log("topicArrowRotate");
	arrow = $("#topicArrow" + arrowID);
	/*
	clearInterval(rotateINT);
	rotateINT = setInterval("arrowRotate()", 10);
	*/
	if(arrow.hasClass("glyphicon-plus-sign")) {
		arrow.removeClass("glyphicon-plus-sign");
		arrow.addClass("glyphicon-minus-sign");
	} else {
		arrow.removeClass("glyphicon-minus-sign");
		arrow.addClass("glyphicon-plus-sign");
	}
}

function loadYouTube(title, description, youtube) {
    $("#title").text(title);
    $("#description").html(description);
    playerYT.loadPlaylist(youtube); 
    playerYT.setLoop(true);
}

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  
  playerYT = new YT.Player('playerYT', {
      height: 720,
      width: 1280,
//      videoId: 'ZuX0rQ7twnE',
      playerVars: {
      	'controls': 2,
      	'autohide': 1,
      	'showinfo': 0},
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
  });
  
}

function onPlayerReady(event) {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {


  }
  else {


  }
}

var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    //setTimeout(stopVideo, 6000);
    done = true;
  }
}

function myDialog() {
	bootbox.dialog({
        title: "Modal Form 예제입니다.",
        message: '<div class="row">  ' +
            '<div class="col-md-12"> ' +
            '<form class="form-horizontal"> ' +
            '<div class="form-group"> ' +
            '<label class="col-md-4 control-label" for="name">이름</label> ' +
            '<div class="col-md-4"> ' +
            '<input id="name" name="name" type="text" placeholder="이름" class="form-control input-md"> ' +
            '<span class="help-block">이름을 입력하세요.</span> </div> ' +
            '</div> ' +
            '<div class="form-group"> ' +
            '<label class="col-md-4 control-label" for="awesomeness">성별을 고르세요.</label> ' +
            '<div class="col-md-4"> <div class="radio"> <label for="awesomeness-0"> ' +
            '<input type="radio" name="awesomeness" id="awesomeness-0" value="Really awesome" checked="checked"> ' +
            '남자 </label> ' +
            '</div><div class="radio"> <label for="awesomeness-1"> ' +
            '<input type="radio" name="awesomeness" id="awesomeness-1" value="Super awesome"> 여자 </label> ' +
            '</div> ' +
            '</div> </div>' +
            '</form> </div>  </div>',
        buttons: {
            success: {
                label: "Save",
                className: "btn-success",
                callback: function () {
                    var name = $('#name').val();
                    var answer = $("input[name='awesomeness']:checked").val()
                    Example.show("안녕하세요. <strong>" + answer + "</strong> " + name + "님. 환영합니다.");
                }
            }
        }
    }
);
}

var Example = (function() {
    "use strict";

    var elem,
        hideHandler,
        that = {};

    that.init = function(options) {
        elem = $(options.selector);
    };

    that.show = function(text) {
        clearTimeout(hideHandler);

        elem.find("span").html(text);
        elem.delay(200).fadeIn().delay(4000).fadeOut();
    };

    return that;
}());

function searchVideos() {
	var searchHTML = "", beforeLength = "", afterLength = "", subSearchHTML = "";
	var title = "", id = "";
	var count, length = 0;
	var searchWord = $("input#searchText").val();
	if(searchWord == "") {
		$("#accordion_s").html("");
		return;
	}
	for( var i = 0; i < videos_length; i++) {
		beforeLength = 
			'<div class="panel panel-default" style="margin-top:0px;">' +
				'<div class="panel-heading">' +
					'<span class="panel-title" style="margin-top: 8px;">' +
						'<a data-toggle="collapse" href="#collapse_s' + i + '" onclick="searchArrowRotate(' + i + ')" style="font-size: 12px;">' + 
							//'<img src="../image/arrow.png" id="recommendArrow' + i + '" class="arrow img-responsive">' + categories[i] +
							'<span id="searchArrow' + i + '" class="arrow glyphicon glyphicon-plus-sign" style="font-size:15px;"></span>' + categories[i] +
							'<span class="label label-default label-as-badge">';
			afterLength = '</span>' +
						'</a>' + 
					'</span>' +
				'</div>' +
				'<div id="collapse_s' + i + '" class="panel-collapse collapse">' + 
					'<div class="list-group">';
					length = videos[i].length;
					for( var j = 0; j < length; j++) {
						title = videos[i][j].title;
						if( -1 < title.indexOf(searchWord)) {
							count++;
							id = videos[i][j].id;
							subSearchHTML += 
							'<a href="#" class="list-group-item list' + id + '">' +
								//' onclick="replaceAndLoadYoutubeByID(' + id + ')">' +
								//' id = "list2_' + id + '">' +	
								'<div class="row">' +
									'<div class="col-sm-3">' +
										'<img src="' + videos[id].thumbnail + '" class="img-responsive">' +
									'</div>' +
									'<div class="col-sm-7">' +	
										'<div class="row">' +
											videos[id].title + 
										'</div>' +
										'<div class="row" style="font-size:13px;">' + 
											convertPlayTime(videos[id].playtime) +
										'</div>' +
									'</div>' +
									'<div class="col-sm-1" style="padding-left: 0px;">' +
										'<input type="checkbox" class="checkbox checkbox' + id + '">' +
									'</div>' +
								'</div>' +
							'</a>';
						}
					}
					subSearchHTML += 
				'</div>' +
			'</div>' + 
		'</div>';
		if( 0 < count) {
			searchHTML += beforeLength + count + afterLength + subSearchHTML;
		}
		subSearchHTML = "";
		count = 0;
	}
	$("#accordion_s").html(searchHTML);
	refreshCheckBox();
}
