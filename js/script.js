// *FILE LINK TEST*
    // alert('Reportin for duty');

// IIFE - Immediately Invoked Function Expression (protects global scope)
    $(function() {


// *--- CONSTANTS ---*

var $pagination = $('#pagination'),
totalRecords = 0,  // totalt records fetched from DB
records = [], // total of records object array
displayRecords = [], // object array that is pushed to HTML table
recPerPage = 25, // Count of records displayed per page
page = 1, // current page number
totalPages = 0; // total pages made from fetched records
const token = 'GmScquIpMgYfKWDslkeqkFtIcLJhzXHURtxForyC'; // API KEY

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
        // *--- TAKES USER INPUT, HANDLES CLICK, HANDLES PAGINATION OF RESULTS ---*
    function handleGetData(e) {
        e.preventDefault();
        userInput = $input.val();
        $.ajax({
            url:`https://api.discogs.com/database/search?q=${$input}&token=${token}`
        })
        .then(
            (data) => {
            // $artist.text('Artist: ' + data.results.id);
            // $releaseTitle.text('Album Title: ' + data.results.title);
            // $thumbImg.text('Cover: ' + data.results.thumb);
            // $releaseLink.text('Link to release: ' + data.results.uri);
            artistRlsData = data;
            console.log(artistRlsData);
            totalRecords = artistRlsData.items;
            totalPages = Math.ceil(totalRecords / recPerPage);
            apply_pagination();
            },
            (error) => {
            console.log('bad request: ', error);
            alert('No such artist')
        });
    };

    // function render() {
    //     $artist.text(artistRlsData.results.id);
    //     $releaseTitle.text(artistRlsData.results.title);
    //     $thumbImg.text(artistRlsData.results.title);   
    //     $releaseLink.text(artistRlsData.results.uri);   
    // };
    // render();
    
        // *--- POPULATES TABLE WITH RESULTS ---*
    function generateTable() {
        let tr;
        $('#renderedDataBody').html('');
        for(let i = 0; i <artistRlsData.length; i++){
            tr = $('<tr/>');
            tr.append(`<td>${artistRlsData[i].results.id}</td>`)
            tr.append(`<td>${artistRlsData[i].results.title}</td>`)
            tr.append(`<td>${artistRlsData[i].results.title}</td>`)
            tr.append(`<td>${artistRlsData[i].results.uri}</td>`)
            $('#renderedDataBody').append(tr);
        }
    }
        // *--- SETS PAGINATION PARAMETERS AND PASSES THEM TO PLUG-IN ---*
    function apply_pagination() {
        $pagination.twbsPagination({
            totalPages: totalPages,
            visiblePages: 5,
            onPageClick: function(event, page) {
                artistRlsDataIndex = Math.max(page -1, 0) * recPerPage;
                endRec = (artistRlsDataIndex) + recPerPage;
                artistRlsData = records.slice(artistRlsDataIndex. endRec);
                generateTable();
            }
        })
    }

});




















// $('#pagination-demo').twbsPagination({
//     totalPages: 35,
//     visiblePages: 7,
//     onPageClick: function (event, page) {
//         $('#page-content').text('Page ' + page);
//     }
// });