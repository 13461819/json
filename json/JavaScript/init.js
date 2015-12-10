var categories = [
                  '환자 안내 시리즈',
                  '기타',
                  '의료 기기 사용',
                  '행정 교육',
                  '식이',
                  '자가 치료',
                  '운동/재활',
                  '의약품',
                  '입원/퇴원',
                  '치료적 술기',
                  '진단적 술기',
                  '질병증상'
                  ];
var videos_length = 12; // 카테고리의 갯수
var videos = []; // 처음 12개의 배열은 2차원 배열이며 각각의 배열은 카테고리별 비디오 리스트가 있다.
				 // 나머지 배열은 비디오 ID를 이용하여 HashMap으로 사용
var topics = []; // 21개의 소주제 객체 리스트
				 // 각각의 소주제 객체는 자체적으로 비디오 리스트를 가지고 있다.
var selectedVideos = []; // 체크박스에서 선택 된 비디오의 배열

function getVideos() {	//비디오 API를 이용해서 videos[] 배열에 값을 할당한다.
	$.getJSON("https://hbreeze4ani.appspot.com/api/v1/videos",
					function(json) {
						createVideos(); // 카테고리의 갯수만큼 첫 12개의 리스트들을 2차원 배열로 만든다.
						categorizeVideos(json); // 첫 12개의 인덱스에는 카테고리에 맞게 비디오를 분류해서 2차원 배열을 채운다.
												// 나머지 인덱스에는 비디오 ID값을 이용해 배열의 인덱스에 [Key: ID] = Value: 비디오 값으로 채운다.
						sortVideos(); // 첫 12개의 인덱스에 들어있는 카테고리별 비디오만 각각 정렬한다.
						createRecommendHTML(); //정렬 된 배열을 가지고 HTML코드를 생성한다.
						getTopics(); // 비디오 배열이 완성 되었으면 소주제 API를 받아온다.
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

function getTopics() {
	$.getJSON("https://hbreeze4ani.appspot.com/api/v1/topics",
					function(json) {
						createTopics(json); // 소주제별은 받아 온 API대로 각각의 객체를 그냥 배열에 넣는다. 
						sortTopics(); // 객체의 순서를 정렬한다.
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


function createVideos() { // 카테고리의 갯수만큼 첫 12개의 인덱스를 2차원으로 만든다.
	console.log('createVideos');
	for( var i = videos_length; i-- ; ) {
		videos[i] = [];
	}
}

function createTopics(json) { // "자신만의 비디오 리스트"를 가지고 있는 소주제 객체를 배열에 할당한다.
	console.log('createTopics');
	for( var i = json.length; i-- ; ) {
		topics.push(json[i]);
	}
}


function categorizeVideos(json) { // 전체 비디오의 크기만큼 루프를 돈다.
								  // 루프를 돌며 하나의 비디오는 자기에게 맞는 카테고리에(0~11번 인덱스), 
								  // 자신의 ID를 key값으로 하는 HashMap에 총 2번 저장된다.(배열[ID]=비디오)
	console.log('categorizeVideos');
	var category_index = 0;
	for( var i = json.length; i-- ; ) {
		
		// 각각의 비디오는 자신만의 code값을 가지고 있으며 코드값의 첫번째 알파벳으로 카테고리를 식별한다.
		category_index = findIndexFromCode(json[i]);
		
		videos[category_index].push(json[i]); // 해당하는 카테고리에 할당받고,
		videos[json[i].id] = json[i];		  // 자신의 ID값에도 할당받는다.
	}
}

function findIndexFromCode(value) { // A = 11, B = 10, ..., L = 0
	return 11-(value.code.charCodeAt(0) - 97);
}

function sortVideos() { // 분류 된 배열을 오름차순 정렬한다.
	console.log('sortVideos');
	for(var i = videos_length; i -- ; ) { // videos_length는 카테고리의 수, 총 12개의 배열을 각각 정렬한다.
		videos[i].sort(function(a, b) {
			return (a.title < b.title) ? 1 : -1;
		});
	}
}

function sortTopics() { // 분류 된 배열을 오름차순 정렬한다.
	console.log('sortTopics');
	topics.sort( function (a, b) {
		return (a.name > b.name) ? 1 : -1;
	});
}
