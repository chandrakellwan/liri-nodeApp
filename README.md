# LIRI Bot Node App
LIRI Bot (Language Interpretation and Recognition Interface) is a command line interpreter that takes in parameters and returns results from the Spotify music service API, the Open Movie Database API and the Bands In Town service API. LIRI Bot solves the problem of searching for information from a command line setup or in computer systems without a GUI (graphical user interface) browser.

<strong>Technologies Used</strong>

LIRI Bot is built using javascript and runs in the node.js engine. Its dependencies are as follows
	•	npm package 'env' for handling the API keys as environment variables.
	•	npm package 'fs' for file system operations. Needed for reading and writing the random.txt and log.txt files.
	•	npm pakcage 'axiom' for http GET calls to the API's.
	•	npm package 'node-spotify-api' for accessing the Spotify service's APIs.
	•	npm package 'moment.js' for handling and formatting Date() objects.

<strong>LIRI Bot command line commands</strong>

node liri.js concert-this [<artist name>]
	
The command above will search the Bands in Town Artist Events API for the artist name entered and render the name and location of the venue and the date of future events and concerts by that artist.
	
node liri.js spotify-this-song [<song name>]
	
Running this command will show information about the song name entered: the artist(s), a preview link of the song from Spotify and the album name. If no parameter for a song is passed in, LIRI Bot will respond with information about the song "The Sign" by Ace of Base (by default). 
	
node liri.js movie-this [<movie name>]
	
Entering the command along with a movie name will output the following information
	•	Title of the movie.
	•	Year the movie came out.
	•	IMDB Rating of the movie.
	•	Rotten Tomatoes Rating of the movie.
	•	Country where the movie was produced.
	•	Language of the movie.
	•	Plot of the movie.
	•	Actors in the movie.

If no movie parameter is passed, LIRI Bot will print out the details of movie Mr. Nobody (by default). 
	
node liri.js do-what-it-says 
	
This will make LIRI Bot run the commands already saved in file 'random.txt' in the current working directory.
