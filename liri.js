//my-tweets

//spotify-this-song

//movie-this

//do-what-it-says


var liriKeys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require('request');
var fs = require('fs');



function writeToLog (data) {
  fs.appendFile("log.txt", '\n', {

  	'flag': 'a'
  }, function(err) {
  		if (err) {
  			return console.error(err);
  	}
    
  });
  	console.log(data);
}


var spotify = new Spotify({
    id: liriKeys.spotifyKeys.client_id,
    secret: liriKeys.spotifyKeys.client_secret
});

var client = new Twitter({
    consumer_key: liriKeys.twitterKeys.consumer_key,
    consumer_secret: liriKeys.twitterKeys.consumer_secret,
    access_token_key: liriKeys.twitterKeys.access_token_key,
    access_token_secret: liriKeys.twitterKeys.access_token_secret
});

function getMeSong(trackName) {
    spotify.search({
        type: 'track',
        query: trackName,
        limit: 1
    }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }


        writeToLog("Spotify search results: ");


		var songs = data.tracks.items[0];
		songs.album.artists.forEach(function(artist, index) {
			writeToLog("Artist(s): \n" + (index + 1) + artist.name);
		})
        console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
		    console.log("Album Name: " + data.tracks.items[0].album.name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Preview URL: " + data.tracks.items[0].preview_url);

    })

};
        
		
		
function getMeTweets() {
			client.get('search/tweets', { 
        screen_name: 'mitumchakrabati', 
			count: 20 
		}, function(error, tweets, response) {

    		console.log("My Tweets!");
    		tweets.statuses.forEach(function(tweet, index) {
    			console.log((index + 1) + ") " + tweet.txt);
    		
  			});

    		logWriter("Ending Tweets!");

	});
}

function getMeMovie (data) {

  request ("http://www.omdbapi.com/?t=" + data + '&apikey=40e9cece&tomatoes=true', function(error, response, body) {

        if (error) {
            console.log('error:', error);
        } else {
            var jsonData = JSON.parse(body);

  

      var movieObject= {
      'Title: ' : jsonData.Title,
      'Year: ' : jsonData.Year,
      'Rated: ' : jsonData.Rated,
      'IMDB Rating: ' : jsonData.imdbRating,
      'Country: ' : jsonData.Country,
      'Language: ' : jsonData.Language,
      'Plot: ' : jsonData.Plot,
      'Actors: ' : jsonData.Actors,
      'Rotten Tomatoes Rating: ' : jsonData.tomatoRating,
      'Rotton Tomatoes URL: ' : jsonData.tomatoURL,
  };
      console.log(movieObject);
      writeToLog(movieObject);
}
  });

}

 function doWhatItSays(data) {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);
    writeToLog(data);
    var dataArr = data.split(',')

    if (dataArr.length == 2) {
      pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length == 1) {
      pick(dataArr[0]);
    }

  });
}

var pick = function(caseData, functionData) {
  switch (caseData) {
    case 'my-tweets':
      getMeTweets();
      break;
    case 'spotify-this-song':
      getMeSong(functionData);
      break;
    case 'movie-this':
      getMeMovie(functionData);
      break;
    case 'do-what-it-says':
      doWhatItSays();
      break;
    default:
      console.log('LIRI didn\'t get that');
  }
}


var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);

		












