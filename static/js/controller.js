
log('JS controller loaded!');

window.onload = function() {

	// Button click listeners
	about_button = document.querySelector('#about_button');
	if (about_button != null) about_button.addEventListener('click', aboutButtonClick);

	back_button = document.querySelector('#back_button');
	if (back_button != null) back_button.addEventListener('click', backButtonClick);

	function aboutButtonClick() {

		$('#jumbotron').html('<h1>Powered by</h1>\
			<p>Server side: NodeJS, Express, Cheerio</p>\
			<p>Client side: jQuery, Bootstrap</p>\
			<p><a id="back_button" class="btn btn-primary btn-lg" role="button">Back &laquo;</a></p>');

		back_button = document.querySelector('#back_button');
		back_button.addEventListener('click', backButtonClick);
	};

	function backButtonClick() {

		$('#jumbotron').html('<h1>Welcome!</h1>\
			<p>This is a simple application to search images on flickr.</p>\
			<p>Just type terms into the search box and click on the search button or hit enter.</p>\
			<p><a id="about_button" class="btn btn-primary btn-lg" role="button">About &raquo;</a></p>');

		about_button = document.querySelector('#about_button');
		about_button.addEventListener('click', aboutButtonClick);
	};

	$('#search_button').click(function(e) {

		e.preventDefault();

		log('search_button clicked');

		var tag = $('#search_input').val();

		if (tag != undefined && tag != null && tag != '') {

			log(tag);

			$('#jumbotron').css({'text-align': 'center'})
			$('#jumbotron').html('<h1>Loading images...</h1>');

			// Post
			$.post("/getimages", { tag: tag },
			function(data, status){
				
				log("Data arrived with status: " + status);

				if (data) {

					$('#jumbotron').html('<h1>"' + tag + '" images from flickr:</h1>');

					$.each(data, function(i, photo){

						// Add image
						$('#jumbotron').append('<div id="image_container_' + i + '" class="image_container">\
								<a href="' + photo.link + '" target="new">\
								<img id="image_' + i + '" src="' + photo.link + '" width="' + photo.width + '" height="' + photo.height + '"></img>\
								<p id="image_hover_' + i + '" class="image_hover">' + photo.desc + '</p>\
								</a>\
							</div>');

						$('#image_container_' + i).css({'width': photo.width, 'height': photo.height});

						// Add hover action to image
						mouseHover('#image_' + i, '#image_hover_' + i);
					});

				} else { log("Error with status: " + status); };
			});
			
		} else { log('Tag not defined'); };
	});
};

function log(string) {

	var dateTime = new Date(),
		time = dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds();

	console.log(time + ' - ' + string);
};

function mouseHover(item1, item2) {

	$(item1)
	.mouseenter(function() { $(item2).animate({'opacity':'1'}); })
	.mouseleave(function() { $(item2).animate({'opacity':'0'}); });
};