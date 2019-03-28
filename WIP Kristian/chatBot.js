// <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js">
		var meetingArray = ["Pilates", "Yoga", "Aerobics", "Spinning"];
		var accessToken = "40d24283d3324f6e8294d648bd3b691a";
		var baseUrl = "https://api.api.ai/v1/";
		var kurs;
		var language = "en";
		var input = document.getElementById('input');


		function languageSelect(lang) {
			var input = document.getElementById('input');
			language = lang;
			if ( language == "en" ) {
				input.placeholder = "Say hello!";
			}
			else if ( language == "no" ) {
				input.placeholder = "Si hei!";
			}
			input.disabled = false;
			document.getElementById('languageSelect').style.display = "none";
		}

		$(document).ready(function () { /* Funksjon for å sette opp brukerens inn-data */
			$("#input").keypress(function (event) {
				if (event.which == 13) {
					var $chatBox = $('div.chatBox');
					var userInput = $('input').val();
					var $span = $('<span class="chatBubble userInput sb1">' + userInput + '</span><br><br>');
					var userInputSpans = $('span.userInput');
					console.log('data-js-reply-' + userInputSpans.length, userInput);
					// $chatBox.attr('data-js-reply-'+userInputSpans.length, userInput);
					$chatBox.data('js-reply-' + userInputSpans.length, userInput);
					$chatBox.append($span);
					// $chatBox.append($richmessage);
					event.preventDefault();
					let query = $('input').val();
					$('input').val('');
					send(query);
					console.log('data-js-reply-' + userInputSpans.length, userInput);

					$(".chatBox").stop().animate({ /* Auto-scroll */
						scrollTop: $(".chatBox")[0].scrollHeight
					}, 1000);
				}
			});
		});

		function send(query) { /* Funksjon for å sende data til dialogflow */
			var text = query;
			$.ajax({
				type: "POST",
				url: baseUrl + "query?v=20180101",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				headers: {
					"Authorization": "Bearer " + accessToken
				},
				data: JSON.stringify({
					query: text,
					lang: language,
					sessionId: "somerandomthing"
				}),
				success: function (data) {
					setResponse(data);
				}
			});
		}

		function clickRichMessage(reply) {
			var input = document.getElementById('input');
			let query = reply;
			// id.innerHTML = reply;
			send(query);
			input.disabled = false;
		}

		function kursReg(course) {
			kurs = course;
		}

		function richMessageList() {
			var listeString;
			for ( i = 0; i < meetingArray.length; i++ ) {
				listeString += '<li class="richMessageStyle meetingListItem" onclick="clickRichMessage(meetingArray[' +
								 i + ']), kursReg(meetingArray[' + i + '])">' + meetingArray[i] + '</li>';
			}
			console.log(listeString);
			return listeString;
		}

		var Ja = "Yes";
		var Nei = "No";
		// $(document).ready(function() {
		function setResponse(val) {
			var input = document.getElementById('input');

			var $chatBox = $('div.chatBox');
			var richmessageInputX;
			var keyword;

			//var richMessageContainer = ('<div class="richMessageContainer">' + richMessageInputX + '</div>');


			// rich message html for Y/N
			var richmessageInputYN = ('<div class="richMessageContainer"><span id="yesInput" class="richMessageStyle" onclick="clickRichMessage(Ja)">Yes</span>' +
				'<span id="noInput" class="richMessageStyle" onclick="clickRichMessage(Nei)">No</span></div><br><br>');

			// rich message html for lists
			// var richMessageInputList = (
			// 	'<div class="richMessageContainer"><ul class="meetingList"><li class="meetingListItem" onclick="clickRichMessage(meetingArray[0]), kursReg(meetingArray[0])">' +
			// 	meetingArray[0] +
			// 	'</li><li class="richMessageStyle meetingListItem" onclick="clickRichMessage(meetingArray[1]), kursReg(meetingArray[1])">' +
			// 	meetingArray[1] +
			// 	'</li><li class="meetingListItem" onclick="clickRichMessage(meetingArray[2]), kursReg(meetingArray[2])">' +
			// 	meetingArray[2] +
			// 	'</li><li class="meetingListItem meetingListItemLast" onclick="clickRichMessage(meetingArray[3]), kursReg(meetingArray[3])">' +
			// 	meetingArray[3] + '</li></ul></div>'
			// );

			var richMessageInputList = ( '<div class="richMessageContainer"><ul class="meetingList">' + richMessageList() + '</ul></div>' );

			console.log(val.result.fulfillment);
			var reply = val.result.fulfillment.speech.toString();
			var replyArray = reply.split(' ');
			console.log(replyArray[1]);

			/* if-setninger som sjekker om botens fraser inkluderer et nøkkelord
			 * som også blir fjernet og legger inn støtte for rich messages basert på 
			 * nøkkelordet
			 */
			if (replyArray[(replyArray.length) - 1].includes('#')) {
				keyword = replyArray[(replyArray.length) - 1];
				console.log(keyword);
				replyArray.length = (replyArray.length) - 1;
				var replyLine = replyArray.join(' ');

				if (keyword === "#melde") {
					$(".chatBox").append('<span class="chatBubble responseData">' + replyLine + '</span><br><br><br>');
					richmessageInputX = richmessageInputYN;
					var $richmessage = $(richmessageInputX);
					$chatBox.append($richmessage);
					// input.disabled = true;
				} 
				else if (keyword === "#kurs") {
					$(".chatBox").append('<span class="chatBubble responseData">' + replyLine + '</span><br><br><br><br>');
					richmessageInputX = richMessageInputList;
					var $richmessage = $('<div class="richMessage">' + richmessageInputX +
						'</div><br><br><br><br><br><br><br>');
					$chatBox.append($richmessage);

					// input.disabled = true;

					$(".chatBox").stop().animate({ /* Auto-scroll */
						scrollTop: $(".chatBox")[0].scrollHeight
					}, 1000);

				} 
				else if (keyword === "#registrert") {
					replyArray.push("for the course " + kurs + ".");
					replyLine = replyArray.join(' ');
					$(".chatBox").append('<span class="chatBubble responseData">' + replyLine + '</span><br><br><br><br>');
				} 
				else {
					$(".chatBox").append('<span class="chatBubble responseData">' + replyLine + '</span><br><br><br><br>');
				}
			} 
			else {
				$(".chatBox").append('<span class="chatBubble responseData">' + val.result.fulfillment.speech +
					'</span><br><br><br><br>');
			}

			$(".chatBox").stop().animate({ /* Auto-scroll */
				scrollTop: $(".chatBox")[0].scrollHeight
			}, 1000);

		}