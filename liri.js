//import twitter & spotify keys
var keys = require('./keys.js');
//import twitter, spotify and request node packages
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
//set variable for the argument after node.js
var command = process.argv[2];
//set variable for the value to be passed through command
var value = process.argv[3];
//create twitter function to run in swith
function liriTwitter()
	{
		var client = twitter(keys.twitterKeys);
		var params = {screen_name: 'mjdbootcamptest', count: 20};
		client.get('statuses/user_timeline', params, function(error, tweets, response) 
			{
  				if (!error) 
  					{
    					var tweetArray = [];
    					for (i =0; i<tweets.length; i++)
    					{
    						tweetArray.push({
    							'Tweet: ' : tweets[i].text,
    							'created at: ' : tweets[i].created_at,
    						});
    					};
    					console.log(tweetArray);
    				}
			}
		)
	};
function liriSpotify(value)
	{
		spotify.search({
			type: 'track', 
			query: value },
			function(err, data) 
				{
					if (err) 
					{
						console.log('Error occurred: ' + err);
						return;
					}

					else 
					{console.log(data)}
				})
	};

function liriOMDB (value)
	{
		request('http://www.omdbapi.com/?apikey=25d02559&t='+value, function (error, response, body) {
			console.log('error: ', error);
			console.log('statusCode: ', response && response.statusCode);
			var result = [];
			var movie = JSON.parse(body);

			result.push({
				'Title: ' : movie.Title,
				'Year: ' : movie.Year,
				'IMDB Rating: ' : movie.Ratings[0],
				'Rotten Tomatoes Rating: ' : movie.Ratings[1],
				'Country: ' : movie.Country,
				'Language: ' : movie.Language,
				'Plot: ' : movie.Plot,
				'Actors: ' : movie.Actors,
			});
			console.log(result);
	})};

	var liriDoIt = function(){
		fs.readFile('./random.txt', function(error, data)
		{
			console.log(data);
			var dataArray = data.split(',')

			if (dataArray.length == 2) 
			{
				pick(dataArray[0], dataArray[1]);
			}
			else if (dataArray.length == 1) 
			{
				pick(dataArray[0]);
			}
		})};

switch(command) 
	{
	case 'my-tweets':
	liriTwitter();
	break;

	case 'spotify-this-song':
	liriSpotify(value);
	break;

	case 'movie-this':
	liriOMDB(value);
	break;

 	case 'do-what-it-says':
 	liriDoIt();
 	break;
	
	default:
	console.log("Sorry, I don't understand.  Please use 'my-tweets', 'spotify-this-song', 'movie-this' or 'do what it says' as a command.");
}