// *FILE LINK TEST*
    // alert('Reportin for duty');

// IIFE - Immediately Invoked Function Expression (protects global scope)
    $(function() {


// *--- CONSTANTS ---*

const token = 'GmScquIpMgYfKWDslkeqkFtIcLJhzXHURtxForyC';

// *--- APP'S STATE (VARIABLES) ---*

let $input = $('input[type="text"]');
let artistRlsData;

// *--- CACHED ELEMENT REFERENCES(HTML DOM) ---*

const $artist = $('#artist');
const $thumbImg = $('#thumbImg');
const $releaseTitle = $('#releaseTitle');
const $releaseLink = $('#releaseLink');

// *--- EVENT LISTENERS ---*

$('form').on('submit', handleGetData);

// *--- FUNCTIONS ---*

    function init() {

    };

    function handleGetData(e) {
        e.preventDefault();
        userInput = $input.val();
        $.ajax(`https://api.discogs.com/database/search?q=${$artist}&token=${token}`)
        .then(
            (data) => {
            $artist.text('Artist: ' + data.results.id);
            // $releaseTitle.text('Album Title: ' + data.main.temp);
            // $thumbImg.text('Cover: ' + data.main.feels_like);
            // $releaseLink.text('Link to release: ' + data.weather.main);
            },
            (error) => {
            console.log('bad request: ', error);
            alert('No such artist')
        });
    };

    function render() {

    };

});