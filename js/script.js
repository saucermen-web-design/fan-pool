// *FILE LINK TEST*
    alert('Reportin for duty');

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

    function handleGetData(e) {
        e.preventDefault();
        userInput = $input.val();
        $.ajax({
            url:`https://api.discogs.com/database/search?q=${$artist}&token=${token}`
        })
        .then(
            (data) => {
            $artist.text(data.name);
            $releaseTitle.text(data.main.temp);
            $thumbImg.text(data.main.feels_like);
            $releaseLink.text(data.weather.main);
            },
            (error) => {
            console.log('bad request: ', error);
            alert('No such artist')
            });
    };
