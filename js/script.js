// *FILE LINK TEST*
    // alert('Reportin for duty');

// IIFE - Immediately Invoked Function Expression (protects global scope)
    $(function() {


// *--- CONSTANTS ---*

const token = 'GmScquIpMgYfKWDslkeqkFtIcLJhzXHURtxForyC';

// *--- APP'S STATE (VARIABLES) ---*

let $input = $('input[type="text"]');
let artistRlsData, userInput;

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
        $.ajax({
            url:`https://api.discogs.com/database/search?q=${$input.val}&token=${token}`
        })
        .then(
            (data) => {
            $artist.text('Artist: ' + data.results.id);
            $releaseTitle.text('Album Title: ' + data.results.title);
            $thumbImg.text('Cover: ' + data.results.thumb);
            // $releaseLink.text('Link to release: ' + data.);
            },
            (error) => {
            console.log('bad request: ', error);
            alert('No such artist')
        });
    };

    function render() {
        $artist.text(artistRlsData.results.id);
        $releaseTitle.text(artistRlsData.results.title);
        $thumbImg.text(artistRlsData.results.title);   
        $weather.text(artistRlsData.results.uri);   
    };

});

$('#pagination-demo').twbsPagination({
    totalPages: 35,
    visiblePages: 7,
    onPageClick: function (event, page) {
        $('#page-content').text('Page ' + page);
    }
});