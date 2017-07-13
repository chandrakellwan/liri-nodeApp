//my-tweets

//spotify-this-song

//movie-this

//do-what-it-says


var liriKeys = require("./keys.js");
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('require');
var fs = require('fs');



var writeToLog = function(data) {
  fs.appendFile("log.txt", '\r\n\r\n');

  fs.appendFile("log.txt", JSON.stringify(data), function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("log.txt was updated!");
  });
}	

var getArtistNames = function(artist) {
  return artist.name;
};

var getMeSong = function(songName) {
	if (songName === undefined) {
		songName = 'The Sign - Ace of Base';

	}
};


	spotify.search({ type: 'track', query: songName }, function(err, data) {
		if (err) {
			console.log( 'Error occured: ' + err);
		}
	
	}

		var songs = data.tracks.items;
		var data = []; 

		for (var i = 0; i < songs.length; i++) {
			data.push({
				'artist(s)': songs[i].artists.map(getArtistNames),
				'song name: ': songs[i].name,
				'preview song: ': songs[i].preview_url,
				'album: ': songs[i].album.name,
			});
		}
		
var getMeTweets = function() {
			var client = new twitter(liriKeys.twitterKeys);

			var params = { screen_name: 'mitum', count: 20 };
			 client.get('statuses/user_timeline', params, function(error, tweets, response) {

    			if (!error) {
      				var data = []; 
      				for (var i = 0; i < tweets.length; i++) {
        			data.push({
            			'created at: ' : tweets[i].created_at,
            			'Tweets: ' : tweets[i].text,
        });
      }
      console.log(data);
      writeToLog(data);
    }
  });
};


var getMeMovie = function(movieName) {

  if (movieName === undefined) {
    movieName = 'Mr Nobody';
  }

  var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&r=json";

  request(urlHit, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = [];
      var jsonData = JSON.parse(body);

      data.push({
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
  });
      console.log(data);
      writeToLog(data);
}
  });

}

var doWhatItSays = function() {
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
      console.log('LIRI doesn\'t know that');
  }
}


var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);

		












