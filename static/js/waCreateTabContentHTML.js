function createTopicHTML() { // id값으로 HashMap 된 videos[]와 할당 된 topics[]를 가지고 Topic탭의 HTML코드를 생성한다.
	console.log('createTopicHTML');
	var i, j, topics_videos_length = 0;
	var topicHTML = "", id = "";
	for(i = topics.length; i-- ;) {
		topicHTML += 
			
			'<div class="panel panel-default">' +
			'<div class="panel-heading">' +
			'<span class="panel-title">' +
			'<a class="hb-list-title" data-toggle="collapse" href="#collapse_t' + 
			
			i + 
			
			'" onclick="arrowRotate(\'topicArrow' + 
			
			i + 
			
			'\')">' + 
			'<span id="topicArrow' + 
			
			i + 
			
			'" class="arrow glyphicon glyphicon-plus-sign"></span>' + 
			
			topics[i].name +
			
			'<span class="badge">' + 
			
			topics[i].videos.length + 
			
			'</span>' +
			'</a>' + 
			'<div class="drop-down">' +
			'<span class="glyphicon glyphicon-menu-hamburger my-list-menu" id="topicMenu' + i + '" onclick="topicMenu(' + i + ')"></span>' + 
			'<div id="topicDropdown' + i + '" class="drop-down-content">' +
			'<a onclick="playMyListYoutube(false, ' + i + ')"><span class="glyphicon glyphicon-play-circle"></span>&nbsp;반복 재생(Youtube)</a>'+
			'<a onclick="playMyListFlowPlayer(false, ' + i + ')"><span class="glyphicon glyphicon-play-circle"></span>&nbsp;반복 재생(FlowPlayer)</a>'+
			'</div>' +
			'</div>' +
			'</span>' +
			'</div>' +
			'<div id="collapse_t' + 
			
			i + 
			
			'" class="panel-collapse collapse">' + 
			'<div class="list-group">';
		topics_videos_length = topics[i].videos.length;
		for(j = 0; j < topics_videos_length; j++) {
			id = topics[i].videos[j];
			topicHTML += 
				
				'<div class="row list-group-item list' + id + '"><div class="col-sm-11"><div onclick="replaceAndLoadYoutubeByID(' + 
				
				id + 
				
				')">' +
				'<div class="row">' +
				'<div class="col-sm-4">' +
				'<img src="' + 
				
				videos[id].thumbnail + 
				
				'" class="img-responsive">' +
				'</div>' +
				'<div class="col-sm-8">' +
				'<div class="row hb-video-title">' + 
				
				videos[id].title + 
				
				'</div>' +
				'<div class="row hb-video-time">' +
				
				convertPlayTime(videos[id].playtime) +
				(videos[id].expired_date ? '<img src="/static/img/saved.png" style="width: 17px; top: -3px; position: relative; margin-left: 30px" title="만료일 : ' + videos[id].expired_date.substr(0,10) + '">' : '') +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div></div>' +
				'<div class="col-sm-1 hb-video-chkbox">' +
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
	var searchWord = $("input#searchText").val().toLowerCase();
	var searchWordIndex;
	if(searchWord == "") {
		$("#accordion_s").html("");
		return;
	}
	for( var i = videos_length; i-- ;) {
		beforeLength = 
			'<div class="panel panel-default">' +
			'<div class="panel-heading">' +
			'<span class="panel-title">' +
			'<a class="hb-list-title" data-toggle="collapse" href="#collapse_s' + 
				
			i + 
			
			'" onclick="arrowRotate(\'searchArrow' + 
			
			i + 
			
			'\')">' + 
			'<span id="searchArrow' + 
			
			i + 
			
			'" class="arrow glyphicon glyphicon-minus-sign"></span>' + 
			
			categories[i] +
				
			'<span class="badge">';
		
			afterLength = 
				'</span>' +
				'</a>' + 
				'</span>' +
				'</div>' +
				'<div id="collapse_s' + 
				
				i + 
				
				'" class="panel-collapse collapse in" aria-expanded="true">' + 
				'<div class="list-group">';
					length = videos[i].length;
					for( var j = length; j-- ;) {
						title = videos[i][j].title.toLowerCase();
						searchWordIndex = title.indexOf(searchWord);
						if( -1 < searchWordIndex) {
							count++;
							id = videos[i][j].id;
							subSearchHTML += 
								'<div class="row list-group-item list' + id + '"><div class="col-sm-11"><div onclick="replaceAndLoadYoutubeByID(' + 
								
								id + 
								
								')">' +
								'<div class="row">' +
								'<div class="col-sm-4">' +
								'<img src="' + 
								
								videos[id].thumbnail + 
								
								'" class="img-responsive">' +
								'</div>' +
								'<div class="col-sm-8">' +
								'<div class="row hb-video-title">';
								
								for (var kk = 0; kk < videos[id].title.length; kk++) {
									if (kk == searchWordIndex) {
										subSearchHTML += '<span style="background-color: yellow">';
									}
									if (kk == (searchWordIndex + searchWord.length)) {
										subSearchHTML += '</span>';
									}
									subSearchHTML += videos[id].title[kk];
								}
								
								subSearchHTML +=
								'</div>' +
								'<div class="row hb-video-time">' +
								
								convertPlayTime(videos[id].playtime) +
								(videos[id].expired_date ? '<img src="/static/img/saved.png" style="width: 17px; top: -3px; position: relative; margin-left: 30px" title="만료일 : ' + videos[id].expired_date.substr(0,10) + '">' : '') +
								'</div>' +
								'</div>' +
								'</div>' +
								'</div></div>' +
								'<div class="col-sm-1 hb-video-chkbox">' +
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
	var specialty = accounts.specialty;
	var profession = accounts.profession;
	profession -= profession % 100; 
	var video_specialties = []; //비디오의 video_specialties
	var video_professions = []; //비디오의 video_professions
	for( var i = videos_length; i-- ;) {
		beforeLength = 
			'<div class="panel panel-default">' +
			'<div class="panel-heading">' +
			'<span class="panel-title">' +
			'<a class="hb-list-title" data-toggle="collapse" href="#collapse_r' + 
				
			i + 
			
			'" onclick="arrowRotate(\'recommendArrow' + 
			
			i + 
			
			'\')">' + 
			'<span id="recommendArrow' + 
			
			i + 
			
			'" class="arrow glyphicon glyphicon-plus-sign"></span>' + 
			
			categories[i] +
				
			'<span class="badge">';
		
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
						video_specialties = videos[i][j].specialties;
						video_professions = videos[i][j].professions;
						video_countries = videos[i][j].countries;
						video_language = videos[i][j].code.substr(7, 2);
						//title = videos[i][j].title;
						if( (-1 < video_specialties.indexOf(specialty)) || video_specialties.length == 0) {
							//console.log(video_specialties.indexOf(specialty));
							if( (-1 < video_professions.indexOf(profession)) || video_professions.length == 0) {
								//console.log(typeof videos[i][j].visible);
								//console.log(video_professions.indexOf(profession));
								if( (-1 < video_countries.indexOf(accounts.country)) || video_countries.length == 0) {
									if(videos[i][j].visible == true) {
									id = videos[i][j].id;
										if (!waData.videoLang[0]) {
											count++;
											subRecommendHTML += getSubRecommendHTML(id);
										} else {
											if (waData.videoLang[1]) {
												if ( waData.videoLang[2] && video_language == "en" ) {
													subRecommendHTML += getSubRecommendHTML(id);
													count++;
													continue;
												}
												if ( waData.videoLang[3] && video_language == "ko" ) {
													subRecommendHTML += getSubRecommendHTML(id);
													count++;
													continue;
												}
												if ( waData.videoLang[4] && video_language == "jp" ) {
													subRecommendHTML += getSubRecommendHTML(id);
													count++;
													continue;
												}
												if ( waData.videoLang[5] && video_language == "cn" ) {
													subRecommendHTML += getSubRecommendHTML(id);
													count++;
													continue;
												}
												if( !waData.videoLang[2] && !waData.videoLang[3] && !waData.videoLang[4] && !waData.videoLang[5]) {
													subRecommendHTML += getSubRecommendHTML(id);
													count++;
													continue;
												}
											} else {
												if ( video_language == accounts.language ) {
													subRecommendHTML += getSubRecommendHTML(id);
													count++;
													continue;
												}
											}
										}
									}
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

function getSubRecommendHTML(id) {
	return  '<div class="row list-group-item list' + id + '"><div class="col-sm-11"><div onclick="replaceAndLoadYoutubeByID(' + 
	
	id + 
	
	')">' +
	'<div class="row">' +
	'<div class="col-sm-4">' +
	'<img src="' + 
	
	videos[id].thumbnail + 
	
	'" class="img-responsive">' +
	'</div>' +
	'<div class="col-sm-8">' +
	'<div class="row hb-video-title">' + 
	
	videos[id].title + 
	
	'</div>' +
	'<div class="row hb-video-time">' +
	
	convertPlayTime(videos[id].playtime) +

	(videos[id].expired_date ? '<img src="/static/img/saved.png" style="width: 17px; top: -3px; position: relative; margin-left: 30px" title="만료일 : ' + videos[id].expired_date.substr(0,10) + '">' : '') +
	
	'</div>' +
	'</div>' +
	'</div>' +
	
	'</div></div>' +
	
	'<div class="col-sm-1 hb-video-chkbox">' +
	'<input type="checkbox" class="checkbox checkbox' + 
	
	id + 
	
	'" onclick="toggleCheckList(' + 
	
	id + 
	
	', this.checked)">' +
	'</div>' +
	'</div>';
}

function createMyListHTML() {
	console.log('createMyListHTML');
	var myListHTML = "", beforeLength = "", afterLength = "", subMyListHTML = "";
	var title = "", id = "";
	var count = 0, length = 0;
	var my_videos = [];
	var isOpened;
	for( var i = 1; i < myLists.length + 1; i++) {
		isOpened = ($("#collapse_m" + i).attr("aria-expanded") === "true" ? true : false);
		beforeLength = 
			'<div class="panel panel-default">' +
			'<div class="panel-heading">' +
			'<span class="panel-title">' +
			'<a class="hb-list-title" data-toggle="collapse" href="#collapse_m' + 
				
			i + 
			
			'" onclick="arrowRotate(\'myListArrow' + 
			
			i + 
			
			'\')">' + 
			'<span id="myListArrow' + 
			
			i + 
			
			'" class="arrow glyphicon glyphicon-' + (isOpened ? 'minus' : 'plus') + '-sign"></span>' + 
		
			myLists[i - 1].name +
				
			'<span class="badge">';
		
			afterLength = 
				'</span>' +
				'</a>' +
				'<div class="drop-down">' +
				'<span class="glyphicon glyphicon-menu-hamburger my-list-menu" id="myListMenu' + (i - 1) + '" onclick="myListMenu(' + (i - 1) + ')"></span>' + 
				'<div id="myDropdown' + (i - 1) + '" class="drop-down-content">' +
				'<a data-toggle="modal" data-target="#modal_setting" onclick="modalChangeListName(' + (i - 1) + ')"><span class="glyphicon glyphicon-pencil"></span>&nbsp;이름 변경</a>'+
				'<a onclick="deleteList(' + (i - 1) + ')"><span class="glyphicon glyphicon-trash"></span>&nbsp;삭제</a>'+
				'<a data-toggle="modal" data-target="#modal_setting" onclick="modalEditList(' + (i - 1) + ')"><span class="glyphicon glyphicon-list"></span>&nbsp;편집</a>'+
				'<a onclick="playMyListYoutube(true, ' + (i - 1) + ')"><span class="glyphicon glyphicon-play-circle"></span>&nbsp;반복 재생(Youtube)</a>'+
				'<a onclick="playMyListFlowPlayer(true, ' + (i - 1) + ')"><span class="glyphicon glyphicon-play-circle"></span>&nbsp;반복 재생(FlowPlayer)</a>'+
				'</div>' +
				'</div>' +
				'</span>' +
				'</div>' +
				'<div id="collapse_m' +  
				
				i + 
				
				'" class="panel-collapse collapse' + (isOpened ? ' in" aria-expanded="true' : '') + '">' + 
				'<div class="list-group">';
					my_videos = myLists[i - 1].videos;
					length = my_videos.length;
					for( var j = 0; j < length; j++) {
						count++;
						id = my_videos[j];
						subMyListHTML += 
							'<div class="row list-group-item list' + id + '" ><div class="col-sm-11"><div onclick="replaceAndLoadYoutubeByID(' + 
							
							id + 
							
							')">' +
							'<div class="row">' +
							'<div class="col-sm-4">' +
							'<img src="' + 
							
							videos[id].thumbnail + 
							
							'" class="img-responsive">' +
							'</div>' +
							'<div class="col-sm-8">' +
							'<div class="row hb-video-title">' + 
							
							videos[id].title + 
							
							'</div>' +
							'<div class="row hb-video-time">' +
							
							convertPlayTime(videos[id].playtime) +
							(videos[id].expired_date ? '<img src="/static/img/saved.png" style="width: 17px; top: -3px; position: relative; margin-left: 30px" title="만료일 : ' + videos[id].expired_date.substr(0,10) + '">' : '') +
							'</div>' +
							'</div>' +
							'</div>' +
							'</div></div>' +
							'<div class="col-sm-1 hb-video-chkbox">' +
							'<input type="checkbox" class="checkbox checkbox' + 
							
							id + 
							
							'" onclick="toggleCheckList(' + 
							
							id + 
							
							', this.checked)">' +
							'</div>' +
							'</div>';
					}
					subMyListHTML += 
				'</div>' +
			'</div>' + 
		'</div>';
		//if( 0 < count) {
			myListHTML += beforeLength + count + afterLength + subMyListHTML;
		//}
		subMyListHTML = "";
		count = 0;
	}
	createBookMarkHTML();
	$("#accordion_m").append(myListHTML);
}

function createBookMarkHTML() {
	console.log('createBookMarkHTML');
	var bookMarkHTML = "", beforeLength = "", afterLength = "", subBookMarkHTML = "";
	var title = "", id = "";
	var count = 0, length = 0;
	var isOpened = ($("#collapse_m0").attr("aria-expanded") === "true" ? true : false);
	beforeLength = 
		'<div class="panel panel-default">' +
		'<div class="panel-heading">' +
		'<span class="panel-title">' +
		'<a class="hb-list-title" data-toggle="collapse" href="#collapse_m0" onclick="arrowRotate(\'myListArrow0\')">' + 
		'<span id="myListArrow0" class="arrow glyphicon glyphicon-' + (isOpened ? 'minus' : 'plus') + '-sign"></span>북마크<span class="badge">';
		afterLength = 
			'</span>' +
			'</a>' + 
			'<div class="drop-down">' +
			'<span class="glyphicon glyphicon-menu-hamburger my-list-menu" id="myListMenu' + myLists.length + '"onclick="myListMenu(' + myLists.length + ')"></span>' + 
			'<div id="myDropdown' + myLists.length + '" class="drop-down-content">' +
			'<a data-toggle="modal" data-target="#modal_setting" onclick="modalEditList(' + myLists.length + ')"><span class="glyphicon glyphicon-list"></span>&nbsp;편집</a>'+
			'<a onclick="playMyListYoutube(true, ' + myLists.length + ')"><span class="glyphicon glyphicon-play-circle"></span>&nbsp;반복 재생(Youtube)</a>'+
			'<a onclick="playMyListFlowPlayer(true, ' + myLists.length + ')"><span class="glyphicon glyphicon-play-circle"></span>&nbsp;반복 재생(FlowPlayer)</a>'+
			'</div>' +
			'</div>' +
			'</span>' +
			'</div>' +
			'<div id="collapse_m0" class="panel-collapse collapse' + (isOpened ? ' in" aria-expanded="true' : '') + '">' + 
			'<div class="list-group">';
				for( var i = 0; i < bookMarks.length; i++) {
					count++;
					id = bookMarks[i];
					subBookMarkHTML += 
						'<div class="row list-group-item list' + id + '"><div class="col-sm-11"><div onclick="replaceAndLoadYoutubeByID(' + 
						
						id + 
						
						')">' +
						'<div class="row">' +
						'<div class="col-sm-4">' +
						'<img src="' + 
						
						videos[id].thumbnail + 
						
						'" class="img-responsive">' +
						'</div>' +
						'<div class="col-sm-8">' +
						'<div class="row hb-video-title">' + 
						
						videos[id].title + 
						
						'</div>' +
						'<div class="row hb-video-time">' +
						
						convertPlayTime(videos[id].playtime) +
						(videos[id].expired_date ? '<img src="/static/img/saved.png" style="width: 17px; top: -3px; position: relative; margin-left: 30px" title="만료일 : ' + videos[id].expired_date.substr(0,10) + '">' : '') +
						'</div>' +
						'</div>' +
						'</div>' +
						'</div></div>' +
						'<div class="col-sm-1 hb-video-chkbox">' +
						'<input type="checkbox" class="checkbox checkbox' + 
						
						id + 
						
						'" onclick="toggleCheckList(' + 
						
						id + 
						
						', this.checked)">' +
						'</div>' +
						'</div>';
				}
				subBookMarkHTML += 
			'</div>' +
		'</div>' + 
	'</div>';
	bookMarkHTML += beforeLength + count + afterLength + subBookMarkHTML;
	$("#accordion_m").html(bookMarkHTML);
}
