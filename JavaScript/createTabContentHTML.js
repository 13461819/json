/*
function createRecommendHTML() { //정렬 된 videos[]의 첫 12개 카테고리를 가지고 Recommend탭의 HTML코드를 생성한다.
	console.log('createRecommendHTML');
	var i, j, length = 0;
	var recommendHTML = "", id = "";
	for(i = videos_length; i-- ; ) {
		length = videos[i].length;
		if(0 < length) {
			recommendHTML += 
			'<div class="panel panel-default" style="margin-top:0px;">' +
			'<div class="panel-heading">' +
			'<span class="panel-title" style="margin-top: 8px;">' +
			'<a data-toggle="collapse" href="#collapse_r' + 
				
			i + 
			
			'" onclick="recommendArrowRotate(' + 
			
			i + 
			
			')" style="font-size: 12px;">' + 
			'<span id="recommendArrow' + 
			
			i + 
			
			'" class="arrow glyphicon glyphicon-plus-sign" style="font-size:15px;"></span>' + 
			
			categories[i] +
				
			'<span class="label label-default label-as-badge">' + 
			
			videos[i].length + 
			
			'</span>' +
			'</a>' + 
			'</span>' +
			'</div>' +
			'<div id="collapse_r' + 
			
			i + 
			
			'" class="panel-collapse collapse">' + 
			'<div class="list-group">';

			for(j = length; j-- ; ) {
				id = videos[i][j].id;
				recommendHTML += 
				'<div class="row"><div class="col-sm-11"><a href="#" class="list-group-item list' + 
				
				id + 
				
				'" onclick="replaceAndLoadYoutubeByID(' + 
				
				id + 
				
				')">' +
				'<div class="row">' +
				'<div class="col-sm-3">' +
				'<img src="' + 
				
				videos[id].thumbnail + 
				
				'" class="img-responsive">' +
				'</div>' +
				'<div class="col-sm-9">' +
				'<div class="row">' + 
				
				videos[id].title + 
				
				'</div>' +
				'<div class="row" style="font-size:13px;">' +
				
				convertPlayTime(videos[id].playtime) +
				
				'</div>' +
				'</div>' +
				'</div>' +
				'</a></div>' +
				'<div class="col-sm-1" style="padding-left: 0px; margin-left:0px;">' +
				'<input type="checkbox" class="checkbox checkbox' + 
				
				id + 
				
				'" onclick="toggleCheckList(' + 
				
				id + 
				
				', this.checked)">' +
				'</div>' +
				'</div>';
			}
			recommendHTML += '</div></div></div>';
		}
	}
	$("#accordion_r").html(recommendHTML);
}
*/

function createTopicHTML() { // id값으로 HashMap 된 videos[]와 할당 된 topics[]를 가지고 Topic탭의 HTML코드를 생성한다.
	console.log('createTopicHTML');
	var i, j, topics_videos_length = 0;
	var topicHTML = "", id = "";
	for(i = topics.length; i-- ;) {
		topicHTML += 
			
			'<div class="panel panel-default" style="margin-top:0px;">' +
			'<div class="panel-heading">' +
			'<span class="panel-title" style="margin-top: 8px;">' +
			'<a data-toggle="collapse" href="#collapse_t' + 
			
			i + 
			
			'" onclick="topicArrowRotate(' + 
			
			i + 
			
			')" style="font-size: 12px;">' + 
			'<span id="topicArrow' + 
			
			i + 
			
			'" class="arrow glyphicon glyphicon-plus-sign" style="font-size:15px;"></span>' + 
			
			topics[i].name +
			
			'<span class="label label-default label-as-badge">' + 
			
			topics[i].videos.length + 
			
			'</span>' +
			'</a>' + 
			'</span>' +
			'</div>' +
			'<div id="collapse_t' + 
			
			i + 
			
			'" class="panel-collapse collapse">' + 
			'<div class="list-group">';
		topics_videos_length = topics[i].videos.length;
		for(j = topics_videos_length; j--; ) {
			id = topics[i].videos[j];
			topicHTML += 
				
				'<div class="row"><div class="col-sm-11"><a href="#" class="list-group-item list' + 
				
				id + 
				
				'" onclick="replaceAndLoadYoutubeByID(' + 
				
				id + 
				
				')">' +
				'<div class="row">' +
				'<div class="col-sm-3">' +
				'<img src="' + 
				
				videos[id].thumbnail + 
				
				'" class="img-responsive">' +
				'</div>' +
				'<div class="col-sm-9">' +
				'<div class="row">' + 
				
				videos[id].title + 
				
				'</div>' +
				'<div class="row" style="font-size:13px;">' +
				
				convertPlayTime(videos[id].playtime) +
				
				'</div>' +
				'</div>' +
				'</div>' +
				'</a></div>' +
				'<div class="col-sm-1" style="padding-left: 0px; margin-left:0px;">' +
				'<input type="checkbox" class="checkbox checkbox' + 
				
				id + 
				
				'" onclick="toggleCheckList(' + 
				
				id + 
				
				', this.checked)">' +
				'</div>' +
				'</div>';
		}
		topicHTML += 
			'</div>' +
			'</div>' + 
			'</div>';
	}
	$("#accordion_t").html(topicHTML);
}

function createSearchHTML() { // 서치 결과를 검색 탭에 보여주는 HTML코드를 생성한다.
	console.log('createSearchHTML');
	var searchHTML = "", beforeLength = "", afterLength = "", subSearchHTML = "";
	var title = "", id = "";
	var count = 0, length = 0;
	var searchWord = $("input#searchText").val();
	if(searchWord == "") {
		$("#accordion_s").html("");
		return;
	}
	for( var i = videos_length; i-- ;) {
		beforeLength = 
			'<div class="panel panel-default" style="margin-top:0px;">' +
			'<div class="panel-heading">' +
			'<span class="panel-title" style="margin-top: 8px;">' +
			'<a data-toggle="collapse" href="#collapse_s' + 
				
			i + 
			
			'" onclick="searchArrowRotate(' + 
			
			i + 
			
			')" style="font-size: 12px;">' + 
			'<span id="searchArrow' + 
			
			i + 
			
			'" class="arrow glyphicon glyphicon-plus-sign" style="font-size:15px;"></span>' + 
			
			categories[i] +
				
			'<span class="label label-default label-as-badge">';
		
			afterLength = 
				'</span>' +
				'</a>' + 
				'</span>' +
				'</div>' +
				'<div id="collapse_s' + 
				
				i + 
				
				'" class="panel-collapse collapse">' + 
				'<div class="list-group">';
					length = videos[i].length;
					for( var j = length; j-- ;) {
						title = videos[i][j].title;
						if( -1 < title.indexOf(searchWord)) {
							count++;
							id = videos[i][j].id;
							subSearchHTML += 
								'<div class="row"><div class="col-sm-11"><a href="#" class="list-group-item list' + 
								
								id + 
								
								'" onclick="replaceAndLoadYoutubeByID(' + 
								
								id + 
								
								')">' +
								'<div class="row">' +
								'<div class="col-sm-3">' +
								'<img src="' + 
								
								videos[id].thumbnail + 
								
								'" class="img-responsive">' +
								'</div>' +
								'<div class="col-sm-9">' +
								'<div class="row">' + 
								
								videos[id].title + 
								
								'</div>' +
								'<div class="row" style="font-size:13px;">' +
								
								convertPlayTime(videos[id].playtime) +
								
								'</div>' +
								'</div>' +
								'</div>' +
								'</a></div>' +
								'<div class="col-sm-1" style="padding-left: 0px; margin-left:0px;">' +
								'<input type="checkbox" class="checkbox checkbox' + 
								
								id + 
								
								'" onclick="toggleCheckList(' + 
								
								id + 
								
								', this.checked)">' +
								'</div>' +
								'</div>';
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


function createRecommendHTML() { //정렬 된 videos[]의 첫 12개 카테고리를 가지고 Recommend탭의 HTML코드를 생성한다.
	console.log('createRecommendHTML');
	var recommendHTML = "", beforeLength = "", afterLength = "", subRecommendHTML = "";
	var title = "", id = "";
	var count = 0, length = 0;
	var specialties = [];
	var professions = [];
	for( var i = videos_length; i-- ;) {
		beforeLength = 
			'<div class="panel panel-default" style="margin-top:0px;">' +
			'<div class="panel-heading">' +
			'<span class="panel-title" style="margin-top: 8px;">' +
			'<a data-toggle="collapse" href="#collapse_r' + 
				
			i + 
			
			'" onclick="recommendArrowRotate(' + 
			
			i + 
			
			')" style="font-size: 12px;">' + 
			'<span id="recommendArrow' + 
			
			i + 
			
			'" class="arrow glyphicon glyphicon-plus-sign" style="font-size:15px;"></span>' + 
			
			categories[i] +
				
			'<span class="label label-default label-as-badge">';
		
			afterLength = 
				'</span>' +
				'</a>' + 
				'</span>' +
				'</div>' +
				'<div id="collapse_r' + 
				
				i + 
				
				'" class="panel-collapse collapse">' + 
				'<div class="list-group">';
					length = videos[i].length;
					for( var j = length; j-- ;) {
						specialties = videos[i][j].specialties;
						professions = videos[i][j].professions;
						//title = videos[i][j].title;
						if( (-1 < specialties.indexOf(Number(sessionStorage.getItem("specialties")))) || specialties.length == 0) {
							if( (-1 < professions.indexOf(Number(sessionStorage.getItem("professions"))) ) || professions.length == 0) {
								//console.log(typeof videos[i][j].visible);
								if(videos[i][j].visible == true) {
								count++;
								id = videos[i][j].id;
								subRecommendHTML += 
									'<div class="row"><div class="col-sm-11"><a href="#" class="list-group-item list' + 
									
									id + 
									
									'" onclick="replaceAndLoadYoutubeByID(' + 
									
									id + 
									
									')">' +
									'<div class="row">' +
									'<div class="col-sm-3">' +
									'<img src="' + 
									
									videos[id].thumbnail + 
									
									'" class="img-responsive">' +
									'</div>' +
									'<div class="col-sm-9">' +
									'<div class="row">' + 
									
									videos[id].title + 
									
									'</div>' +
									'<div class="row" style="font-size:13px;">' +
									
									convertPlayTime(videos[id].playtime) +
									
									'</div>' +
									'</div>' +
									'</div>' +
									'</a></div>' +
									'<div class="col-sm-1" style="padding-left: 0px; margin-left:0px;">' +
									'<input type="checkbox" class="checkbox checkbox' + 
									
									id + 
									
									'" onclick="toggleCheckList(' + 
									
									id + 
									
									', this.checked)">' +
									'</div>' +
									'</div>';
								}
							}
						}
					}
					subRecommendHTML += 
				'</div>' +
			'</div>' + 
		'</div>';
		if( 0 < count) {
			recommendHTML += beforeLength + count + afterLength + subRecommendHTML;
		}
		subRecommendHTML = "";
		count = 0;
	}
	$("#accordion_r").html(recommendHTML);
}

function crateMyListHTML() {
	console.log('crateMyListHTML');
}