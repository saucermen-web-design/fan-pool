// *FILE LINK TEST*
    // alert('Reportin for duty');

// IIFE - Immediately Invoked Function Expression (protects global scope)
    $(function() {


// *--- CONSTANTS ---*

var $pagination = $('#pagination'),
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
            url:`https://api.discogs.com/database/search?q=${userInput}&token=${token}`
        })
        .then(
            (data) => {
            artistRlsData = data;
            console.log(artistRlsData);
            console.log(data);
            console.log(artistRlsData.pagination.items);
            totalRecords = artistRlsData.pagination.length;
            totalPages = Math.ceil(totalRecords / recPerPage);
            apply_pagination();
            },
            (error) => {
            console.log('bad request: ', error);
        });
    };
    
        // *--- POPULATES TABLE WITH RESULTS ---*
    function generateTable() {
        let tr;
        $('#renderedDataBody').html('');
        for(let i = 0; i <displayRecords.length; i++){
            console.log(displayRecords.length);
            tr = $('<tr/>');
            tr.append(`<td>${ displayRecords[i].results.id}</td>`)
            tr.append(`<td>${ displayRecords[i].results.title}</td>`)
            tr.append(`<td>${ displayRecords[i].results.title}</td>`)
            tr.append(`<td>${ displayRecords[i].results.uri}</td>`)
            $('#renderedDataBody').append(tr);
        }
    };

        // *--- SETS PAGINATION PARAMETERS AND PASSES THEM TO PLUG-IN ---*
    function apply_pagination() {
        $pagination.twbsPagination({
            totalPages: totalPages,
            visiblePages: 5,
            onPageClick: function(event, page) {
                artistRlsDataIndex = Math.max(page -1, 0) * recPerPage;
                endRec = (artistRlsDataIndex) + recPerPage;
                displayRecords = artistRlsData.slice(artistRlsDataIndex. endRec);
                generateTable();
            }
        })
    };

});




















// $('#pagination-demo').twbsPagination({
//     totalPages: 35,
//     visiblePages: 7,
//     onPageClick: function (event, page) {
//         $('#page-content').text('Page ' + page);
//     }
// });