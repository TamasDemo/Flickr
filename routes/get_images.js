
module.exports = function($){

	$.app.post('/getimages', function(req, res){

		var tag = req.body.tag;

		log('Tag arrived: ' + tag);

		getImagesFromFlickr(tag, res);
	});

	function log(string) {

		var dateTime = new Date(),
		time = dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds();

		console.log(' ' + time + ' - ' + string);
	};

	function getImagesFromFlickr(tag, res){

		log('Crawling started...');
		url = 'http://www.flickr.com/search/?q=' + tag;

		$.request({ uri: url, }, function(error, response, html) {

			if (!error && response.statusCode == 200) {
			
				var cheerio = $.cheerio.load(html),
					photos = {};

				cheerio('img.pc_img').each(function(i) {
		
					var photo = cheerio(this);

					var link = photo.attr('data-defer-src'),
						width = photo.attr('width'),
						height = photo.attr('height'),
						desc = photo.attr('alt');

					photos[i] = {

						link: link,
						width: width,
						height: height,
						desc: desc
					};

					log('Image found: ' + i + ' - ' + link);
				});

				res.send(photos);
			};
		});
	};
};