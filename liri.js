require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var keys = require("./keys.js");
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
    }
}

var runThis = function(){
    runLiri(process.argv[2], process.argv[3]);
};

runThis();