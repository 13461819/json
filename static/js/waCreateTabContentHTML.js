function createTopicHTML() { // id값으로 HashMap 된 videos[]와 할당 된 topics[]를 가지고 Topic탭의 HTML코드를 생성한다.
	console.log('createTopicHTML');
	var i, j, topics_videos_length = 0;
	var topicHTML = "", id = "";
	for(i = topics.length; i-- ;) {
		topicHTML += 
			
			'<div class="panel panel-default" style="margin-top:0px; border-radius: 0px">' +
			'<div class="panel-heading" style="padding: 5px 0px 5px 5px;  border-radius: 0px">' +
			'<span class="panel-title" style="margin-top: 8px;">' +
			'<a data-toggle="collapse" href="#collapse_t' + 
			
			i + 
			
			'" onclick="arrowRotate(\'topicArrow' + 
			
			i + 
			
			'\')" style="font-size: 14px;">' + 
			'<span id="topicArrow' + 
			
			i + 
			
			'" class="arrow glyphicon glyphicon-plus-sign" style="font-size:15px;"></span>' + 
			
			topics[i].name +
			
			'<span class="label label-default label-as-badge" style="position: relative; top: -1px">' + 
			
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
				
				'<div class="row list-group-item list' + id + '" style="margin-right: 0px"><div class="col-sm-11"><div onclick="replaceAndLoadYoutubeByID(' + 
				
				id + 
				
				')">' +
				'<div class="row">' +
				'<div class="col-sm-4">' +
				'<img src="' + 
				
				videos[id].thumbnail + 
				
				'" class="img-responsive">' +
				'</div>' +
				'<div class="col-sm-8">' +
				'<div class="row" style="overflow: hidden; height: 45px; padding-top: 4px">' + 
				
				videos[id].title + 
				
				'</div>' +
				'<div class="row" style="font-size:13px;">' +
				
				convertPlayTime(videos[id].playtime) +
				
				'</div>' +
				'</div>' +
				'</div>' +
				'</div></div>' +
				'<div class="col-sm-1" style="padding-left: 0px; margin-left:0px;">' +
				'<input type="checkbox" class="checkbox checkbox' + 
				
				id + 
				
				'" onclick="toggleCheckList(' + 
				
				id + 
				
				', this.checked)" style="position: relative; top: 22px; float: right">' +
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
			'<div class="panel panel-default" style="margin-top:0px; border-radius: 0px">' +
			'<div class="panel-heading" style="padding: 5px 0px 5px 5px;  border-radius: 0px">' +
			'<span class="panel-title" style="margin-top: 8px;">' +
			'<a data-toggle="collapse" href="#collapse_s' + 
				
			i + 
			
			'" onclick="arrowRotate(\'searchArrow' + 
			
			i + 
			
			'\')" style="font-size: 14px;">' + 
			'<span id="searchArrow' + 
			
			i + 
			
			'" class="arrow glyphicon glyphicon-plus-sign" style="font-size:15px;"></span>' + 
			
			categories[i] +
				
			'<span class="label label-default label-as-badge" style="position: relative; top: -1px">';
		
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
								'<div class="row list-group-item list' + id + '" style="margin-right: 0px"><div class="col-sm-11"><div onclick="replaceAndLoadYoutubeByID(' + 
								
								id + 
								
								')">' +
								'<div class="row">' +
								'<div class="col-sm-4">' +
								'<img src="' + 
								
								videos[id].thumbnail + 
								
								'" class="img-responsive">' +
								'</div>' +
								'<div class="col-sm-8">' +
								'<div class="row" style="overflow: hidden; height: 45px; padding-top: 4px">' + 
								
								videos[id].title + 
								
								'</div>' +
								'<div class="row" style="font-size:13px;">' +
								
								convertPlayTime(videos[id].playtime) +
								
								'</div>' +
								'</div>' +
								'</div>' +
								'</div></div>' +
								'<div class="col-sm-1" style="padding-left: 0px; margin-left:0px;">' +
								'<input type="checkbox" class="checkbox checkbox' + 
								
								id + 
								
								'" onclick="toggleCheckList(' + 
								
								id + 
								
								', this.checked)" style="position: relative; top: 22px; float: right">' +
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
			'<div class="panel panel-default" style="margin-top:0px; border-radius: 0px">' +
			'<div class="panel-heading" style="padding: 5px 0px 5px 5px; border-radius: 0px">' +
			'<span class="panel-title" style="margin-top: 8px;">' +
			'<a data-toggle="collapse" href="#collapse_r' + 
				
			i + 
			
			'" onclick="arrowRotate(\'recommendArrow' + 
			
			i + 
			
			'\')" style="font-size: 14px;">' + 
			'<span id="recommendArrow' + 
			
			i + 
			
			'" class="arrow glyphicon glyphicon-plus-sign" style="font-size:15px;"></span>' + 
			
			categories[i] +
				
			'<span class="label label-default label-as-badge" style="position: relative; top: -1px">';
		
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
	return  '<div class="row list-group-item list' + id + '" style="margin-right: 0px"><div class="col-sm-11"><div onclick="replaceAndLoadYoutubeByID(' + 
	
	id + 
	
	')">' +
	'<div class="row">' +
	'<div class="col-sm-4">' +
	'<img src="' + 
	
	videos[id].thumbnail + 
	
	'" class="img-responsive">' +
	'</div>' +
	'<div class="col-sm-8">' +
	'<div class="row" style="overflow: hidden; height: 45px; padding-top: 4px; padding-right: 6px">' + 
	
	videos[id].title + 
	
	'</div>' +
	'<div class="row" style="font-size:13px;">' +
	
	convertPlayTime(videos[id].playtime) +
	
	'</div>' +
	'</div>' +
	'</div>' +
	
	'</div></div>' +
	
	'<div class="col-sm-1" style="padding-left: 0px; margin-left:0px;">' +
	'<input type="checkbox" class="checkbox checkbox' + 
	
	id + 
	
	'" onclick="toggleCheckList(' + 
	
	id + 
	
	', this.checked)" style="position: relative; top: 22px; float: right">' +
	'</div>' +
	'</div>';
}

function createMyListHTML() {
	console.log('createMyListHTML');
	var myListHTML = "", beforeLength = "", afterLength = "", subMyListHTML = "";
	var title = "", id = "";
	var count = 0, length = 0;
	var my_videos = [];
	for( var i = 1; i < myLists.length + 1; i++) {
		beforeLength = 
			'<div class="panel panel-default" style="margin-top:0px; border-radius: 0px">' +
			'<div class="panel-heading" style="padding: 5px 0px 5px 5px; border-radius: 0px">' +
			'<span class="panel-title" style="margin-top: 8px;">' +
			'<a data-toggle="collapse" href="#collapse_m' + 
				
			i + 
			
			'" onclick="arrowRotate(\'myListArrow' + 
			
			i + 
			
			'\')" style="font-size: 14px;">' + 
			'<span id="myListArrow' + 
			
			i + 
			
			'" class="arrow glyphicon glyphicon-plus-sign" style="font-size:15px;"></span>' + 
		
			myLists[i - 1].name +
				
			'<span class="label label-default label-as-badge" style="position: relative; top: -1px">';
		
			afterLength = 
				'</span>' +
				'</a>' +
				'<div class="drop-down">' +
				'<span class="glyphicon glyphicon-menu-hamburger my_list_menu" onclick="myListMenu(' + (i - 1) + ')"></span>' + 
				'<div id="myDropdown' + (i - 1) + '" class="drop-down-content">' +
				'<a data-toggle="modal" data-target="#modal_setting" onclick="modalChangeListName(' + (i - 1) + ')"><span class="glyphicon glyphicon-pencil"></span>&nbsp;이름 변경</a>'+
				'<a onclick="deleteList(' + (i - 1) + ')"><span class="glyphicon glyphicon-trash"></span>&nbsp;삭제</a>'+
				'<a data-toggle="modal" data-target="#modal_setting" onclick="modalEditList(' + (i - 1) + ')"><span class="glyphicon glyphicon-list"></span>&nbsp;편집</a>'+
				'<a onclick="playMyListYoutube(' + (i - 1) + ')"><span class="glyphicon glyphicon-play-circle"></span>&nbsp;반복 재생(Youtube)</a>'+
				'<a onclick="playMyListFlowPlayer(' + (i - 1) + ')"><span class="glyphicon glyphicon-play-circle"></span>&nbsp;반복 재생(FlowPlayer)</a>'+
				'</div>' +
				'</div>' +
				'</span>' +
				'</div>' +
				'<div id="collapse_m' +  
				
				i + 
				
				'" class="panel-collapse collapse">' + 
				'<div class="list-group">';
					my_videos = myLists[i - 1].videos;
					length = my_videos.length;
					for( var j = 0; j < length; j++) {
						count++;
						id = my_videos[j];
						subMyListHTML += 
							'<div class="row list-group-item list' + id + '" style="margin-right: 0px"><div class="col-sm-11"><div onclick="replaceAndLoadYoutubeByID(' + 
							
							id + 
							
							')">' +
							'<div class="row">' +
							'<div class="col-sm-4">' +
							'<img src="' + 
							
							videos[id].thumbnail + 
							
							'" class="img-responsive">' +
							'</div>' +
							'<div class="col-sm-8">' +
							'<div class="row" style="overflow: hidden; height: 45px; padding-top: 4px">' + 
							
							videos[id].title + 
							
							'</div>' +
							'<div class="row" style="font-size:13px;">' +
							
							convertPlayTime(videos[id].playtime) +
							
							'</div>' +
							'</div>' +
							'</div>' +
							'</div></div>' +
							'<div class="col-sm-1" style="padding-left: 0px; margin-left:0px;">' +
							'<input type="checkbox" class="checkbox checkbox' + 
							
							id + 
							
							'" onclick="toggleCheckList(' + 
							
							id + 
							
							', this.checked)" style="position: relative; top: 22px; float: right">' +
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
	$("#accordion_m").append(myListHTML);
}

function createBookMarkHTML() {
	console.log('createBookMarkHTML');
	var bookMarkHTML = "", beforeLength = "", afterLength = "", subBookMarkHTML = "";
	var title = "", id = "";
	var count = 0, length = 0;
	beforeLength = 
		'<div class="panel panel-default" style="margin-top:0px; border-radius: 0px">' +
		'<div class="panel-heading" style="padding: 5px 0px 5px 5px; border-radius: 0px">' +
		'<span class="panel-title" style="margin-top: 8px;">' +
		'<a data-toggle="collapse" href="#collapse_m0" onclick="arrowRotate(\'myListArrow0\')" style="font-size: 14px;">' + 
		'<span id="myListArrow0" class="arrow glyphicon glyphicon-plus-sign" style="font-size:15px;"></span>북마크<span class="label label-default label-as-badge" style="position: relative; top: -1px">';
		afterLength = 
			'</span>' +
			'</a>' + 
			'</span>' +
			'</div>' +
			'<div id="collapse_m0" class="panel-collapse collapse">' + 
			'<div class="list-group">';
				for( var i = 0; i < bookMarks.length; i++) {
					count++;
					id = bookMarks[i];
					subBookMarkHTML += 
						'<div class="row list-group-item list' + id + '" style="margin-right: 0px"><div class="col-sm-11"><div onclick="replaceAndLoadYoutubeByID(' + 
						
						id + 
						
						')">' +
						'<div class="row">' +
						'<div class="col-sm-4">' +
						'<img src="' + 
						
						videos[id].thumbnail + 
						
						'" class="img-responsive">' +
						'</div>' +
						'<div class="col-sm-8">' +
						'<div class="row" style="overflow: hidden; height: 45px; padding-top: 4px">' + 
						
						videos[id].title + 
						
						'</div>' +
						'<div class="row" style="font-size:13px;">' +
						
						convertPlayTime(videos[id].playtime) +
						
						'</div>' +
						'</div>' +
						'</div>' +
						'</div></div>' +
						'<div class="col-sm-1" style="padding-left: 0px; margin-left:0px;">' +
						'<input type="checkbox" class="checkbox checkbox' + 
						
						id + 
						
						'" onclick="toggleCheckList(' + 
						
						id + 
						
						', this.checked)" style="position: relative; top: 22px; float: right">' +
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