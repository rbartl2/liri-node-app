require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var keys = require("./keys.js");

// Function to look up concert
var concert = function(){
    var nodeArgs = process.argv;
    var artist = "";
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            artist = artist + "+" + nodeArgs[i];
        } else{
            artist += nodeArgs[i];
        }
    }
var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(function(response){
        console.log('------------------------');
        console.log('Venue: ' + response.data[0].venue.name);
        console.log('Location: ' + response.data[0].venue.city + ', ' + response.data[0].venue.country);
        var date = response.data[0].datetime;
        var convertedDate = moment(date).format('l');
        console.log('Date: ' + convertedDate);
        console.log('------------------------');
    });
}



// Function to look up movie

var movie = function(){
    var nodeArgs = process.argv;
    var movieName = "";
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
        movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName += nodeArgs[i];
        }
    }
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

axios.get(queryUrl).then(function(response){
    console.log('------------------------');
    console.log('Title: ' + response.data.Title);
    console.log('Year: ' + response.data.Year);
    console.log('IMDB Rating: ' + response.data.Ratings[0].Value);
    console.log('Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value);
    console.log('Country Produced: ' + response.data.Country);
    console.log('Language: ' + response.data.Language);
    console.log('Plot: ' + response.data.Plot);
    console.log('Actors: ' + response.data.Actors);
    console.log('------------------------');
})
.catch(function(error){
    console.log(error);
});
}

// Function to look up song

var spotify = new Spotify(keys.spotify);

var getArtistName = function(artist){
    return artist.name;
}
var getSongName = function(songName){
    spotify.search({ type: 'track', query: songName}, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
        var songs = data.tracks.items;
        for(var i = 0; i < songs.length; i++){
            console.log('------------------------');
            console.log('Artist(s): ' + songs[i].artists.map(getArtistName));
            console.log('Song Name: ' + songs[i].name);
            console.log('Preview Song: ' + songs[i].preview_url);
            console.log('Album: ' + songs[i].album.name);
            console.log('------------------------');
        }
    });
}

var runLiri = function(caseData, functionData){
    switch(caseData){
        case 'spotify-this-song':
            getSongName(functionData);
            break;
        case 'movie-this':
            movie(functionData);
            break;
        case 'concert-this':
            concert(functionData);
            break;
    }
}

var runThis = function(){
    runLiri(process.argv[2], process.argv[3]);
};

runThis();