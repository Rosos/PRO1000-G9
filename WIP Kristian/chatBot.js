// <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js">
		var accessToken = "40d24283d3324f6e8294d648bd3b691a";
		var baseUrl = "https://api.api.ai/v1/";
		var yn = ["Ja", "Nei", "Yes", "No"];
		var meetingArray = ["Javascript", "JSON", "CSS", "Java", "C++", "Bootstrap", "JQuery", "Python", "Jørgenkode"];
		var kurs;
		var keyword;
		var language = "en";
		var input = document.getElementById('input');
		var sessionIdNumber;


		function randomNumberGen() {
			var min=111111; 
			var max=999999;  
			var random = Math.floor(Math.random() * (+max - +min)) + +min; 
			sessionIdNumber = random;  
		}

		function languageSelect(lang) { /* velger språk for samtalen */
			randomNumberGen();
			console.log(sessionIdNumber);
			var input = document.getElementById('input');
			var $chatBox = $('div.chatBox');
			language = lang;
			if ( language == "en" ) {
				send("wqoieoieowieowieo23232oi3oioioioi");
				input.placeholder = "Type here!";
			} else if ( language == "no" ) {
				send("wqoieoieowieowieo23232oi3oioioioi");
				input.placeholder = "Skriv her!";
			}
			input.style.backgroundColor = "#f4f4f4";
			input.disabled = true;
			document.getElementById('languageSelect').style.display = "none";
			// input.focus();
		}

		// function ValidateEmail(mail) {
		// 	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
		// 		return (true)
		// 	}
		// 	return (false)
		// }

		function CheckSpace(event) {
			var x = document.getElementById('input').value;
  			if(event.which ==32) {
  				if ( x == "" ) {
					event.preventDefault();
      				return false;
      			}
   			}
		}

		$(document).ready(function () { /* Funksjon for å sette opp brukerens inn-data */
			$("#input").keypress(function (event) {
				var x = document.getElementById('input').value;
				if (event.which == 13 && x != "") {
					var $chatBox = $('div.chatBox');
					var userInput = $('input').val();
					var $span = $('<div class="userInputContainer"><img class="userPic rightPic" src="css/img/userpicdark.png">'
							    + '<div class="lineBreakDiv"></div><span class="chatBubble userInput sb1">' 
							    + userInput 
							    + '</span></div> <br>');
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
					sessionId: sessionIdNumber
				}),
				success: function (data) {
					setResponse(data);
				}
			});
			// botIsTyping();
		}

		function clickRichMessage(reply) {
			var $chatBox = $('div.chatBox');
			var x = document.getElementsByClassName("richMessageContainer");
			var input = document.getElementById('input');
			let query = reply;
	
			send(query);
			input.disabled = false;
			input.style.opacity = "1.0";
			x[0].remove();
			$chatBox.append('<div class="userInputContainer"><img class="userPic rightPic" src="css/img/userpicdark.png">'
						  + '<div class="lineBreakDiv"> </div><span class="chatBubble userInput sb1">' 
						  + query 
						  + '</span></div><div class="lineBreakDiv"> </div>');
			input.focus();
		}

		function kursReg(course) {
			kurs = course;
		}

		function richMessageList() {
			var listeString = "";
			for ( i = 0; i < meetingArray.length; i++ ) {
				listeString += '<li class="richMessageStyle meetingListItem" onclick="clickRichMessage(meetingArray[' 
							 + i + ']), kursReg(meetingArray[' + i + '])">' + meetingArray[i] + '</li>';
			}
			console.log(listeString);
			return listeString;
		}

		function hideAnimatedBox() {
			var animatedBubbleContainer = document.getElementsByClassName("animatedIndex");
			animatedBubbleContainer[0].remove();
		}

		function botIsTyping() {
			var $chatBox = $('div.chatBox');
			$(".chatBox").append('<div class="replyContainer animatedIndex">'
				 	           + '<span class="responseData chatBubble animateBubble">'
				 	           + '<div class="dotContainer"><span class="dot"></span>'
				 	           + '<span class="dot"></span><span class="dot"></span></span></div></div>');
			// setTimeout(lol, 2500);
		}

		function botReply(val) {
			console.log(val.result.fulfillment);
			var $chatBox = $('div.chatBox');
			// botIsTyping();
			// $(".chatBox").append('<div class="replyContainer"><img class="userPic leftPic" src="css/img/botpic.png"><div class="lineBreakDiv"> </div><span class="chatBubble responseData">' + val.result.fulfillment.speech + '</span></div> ');
			$(".chatBox").append('<div class="replyContainer"><img class="userPic leftPic" src="css/img/botpic.png">'
									   + '<div class="lineBreakDiv"> </div><span class="chatBubble responseData">' 
									   + val.result.fulfillment.speech 
									   + '</span></div>');
			// hideAnimatedBox();
		}

		// $(document).ready(function() {
		function setResponse(val) {
			var replyVar = val;
			var input = document.getElementById('input');
			var $chatBox = $('div.chatBox');
			var richmessageInputX;
			//var richMessageContainer = ('<div class="richMessageContainer">' + richMessageInputX + '</div>');


			/* rich message html for Y/N */
			var richmessageInputynEN = ('<div class="richMessageContainer">'
									  + '<span id="yesInput" class="richMessageStyle" onclick="clickRichMessage(yn[2])">Yes</span>' 
									  + '<span id="noInput" class="richMessageStyle" onclick="clickRichMessage(yn[3])">No</span></div><br>');
			var richmessageInputynNO = ('<div class="richMessageContainer">'
									  + '<span id="yesInput" class="richMessageStyle" onclick="clickRichMessage(yn[0])">Ja</span>' 
									  + '<span id="noInput" class="richMessageStyle" onclick="clickRichMessage(yn[1])">Nei</span></div><br>');


			var richMessageInputList = ( '<div class="richMessageContainer"><ul class="meetingList">' 
									   + richMessageList() 
									   + '</ul></div><br>' );

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
					$(".chatBox").append('<div class="replyContainer">'
									   + '<img class="userPic leftPic" src="css/img/botpic.png">'
									   + '<div class="lineBreakDiv"></div>'
									   + '<span class="chatBubble responseData">' 
									   + replyLine 
									   + '</span></div> ');
					if ( language == "en" ) { /* if-setninger for å gi riktig språk på richmessages */
						richmessageInputX = richmessageInputynEN;
					} else {
						richmessageInputX = richmessageInputynNO;
					}
					var $richmessage = $(richmessageInputX);
					$chatBox.append($richmessage);
					input.disabled = true;
					input.style.opacity = "0.35";

					$(".chatBox").stop().animate({ /* Auto-scroll */
						scrollTop: $(".chatBox")[0].scrollHeight
					}, 1000);

				} else if (keyword === "#kurs") {
					$(".chatBox").append('<div class="replyContainer">'
									   + '<img class="userPic leftPic" src="css/img/botpic.png">'
									   + '<div class="lineBreakDiv"> </div><span class="chatBubble responseData">' 
									   + replyLine 
									   + '</span></div> ');
					richmessageInputX = richMessageInputList;
					var $richmessage = $('<div class="richMessageContainer">' 
									   + richmessageInputX 
									   + '</div>');
					$chatBox.append($richmessage);

					input.style.opacity = "0.35";
					input.disabled = true;

					$(".chatBox").stop().animate({ /* Auto-scroll */
						scrollTop: $(".chatBox")[0].scrollHeight
					}, 1000);

				} 
				else if (keyword === "#registrert") {
					if ( language == "en" )
						replyArray.push("Course: " + kurs);
					else
						replyArray.push("Kurs: " + kurs);

					replyLine = replyArray.join(' ');
					$(".chatBox").append('<div class="replyContainer"><img class="userPic leftPic" src="css/img/botpic.png">'
									   + '<div class="lineBreakDiv"> </div><span class="chatBubble responseData">' 
									   + replyLine 
									   + '</span></div>');
				} else {
					$(".chatBox").append('<div class="replyContainer"><img class="userPic leftPic" src="css/img/botpic.png">'
									   + '<div class="lineBreakDiv"> </div><span class="chatBubble responseData">' 
									   + replyLine 
									   + '</span></div>');
				}
			} else {
				botReply(replyVar);
			}

			$(".chatBox").stop().animate({ /* Auto-scroll */
				scrollTop: $(".chatBox")[0].scrollHeight
			}, 1000);

		}