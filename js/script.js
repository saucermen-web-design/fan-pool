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

let $input = $('input[type="text"]'), //user input field variable
artistRlsData, // "artist release data" - data received from AJAX request
userInput; //

// *--- CACHED ELEMENT REFERENCES(HTML DOM) ---*

const $artist = $('#artist');  // Artist name column DOM element
const $thumbImg = $('#thumbImg');  // Album cover photo column DOM element
const $releaseTitle = $('#releaseTitle');  // Album title column DOM element
const $releaseLink = $('#releaseLink');  // Marketplace link column DOM element

// *--- EVENT LISTENERS ---*

$('form').on('submit', handleGetData); // Listens for form submission

// *--- FUNCTIONS ---*

        // *--- TAKES USER INPUT, HANDLES CLICK, HANDLES PAGINATION OF RESULTS ---*
    function handleGetData(e) {
        e.preventDefault();  // prevents page refresh caused by form submission
        userInput = $input.val(); // assigns input field value to userInput variable
        $.ajax({
            url:`https://api.discogs.com/database/search?q=${userInput}&token=${token}`
        }) //AJAX request
        .then(
            (data) => {
            artistRlsData = data; // Assigns received data to variable
            // console.log(artistRlsData); 
            // console.log(data);
            // console.log(artistRlsData.pagination.items);
            totalRecords = artistRlsData.pagination.length;  // Assigns number of results to variable
            totalPages = Math.ceil(totalRecords / recPerPage);  // Divides number of results variable by number of items per page variable which is set statically.
            apply_pagination(); // Runs function that paginates data
            },
            (error) => {
            console.log('bad request: ', error);
        });
    };
    
        // *--- POPULATES TABLE WITH RESULTS ---*
    function generateTable() {
        let tr;  // Defines table tow variable
        $('#renderedDataBody').html(''); // sets content of table body
        for(let i = 0; i < displayRecords.length; i++){  // loops through data and appends to table
            console.log(displayRecords.length);
            tr = $('<tr/>');
            tr.append(`<td>${displayRecords[i].id}</td>`)
            tr.append(`<td>${displayRecords[i].title}</td>`)
            tr.append(`<td>${displayRecords[i].title}</td>`)
            tr.append(`<td>${displayRecords[i].uri}</td>`)
            $('#renderedDataBody').append(tr);
        }
    };

        // *--- SETS PAGINATION PARAMETERS AND PASSES THEM TO PLUG-IN ---*
    function apply_pagination() {
        $pagination.twbsPagination({ // Calls plugin
            totalPages: 10, // Sets total number of available pages
            visiblePages: 5,  // Sets how many pages displayed at a time
            onPageClick: function(event, page) {  
                artistRlsDataIndex = Math.max(page - 1, 0) * recPerPage;  // 
                endRec = (artistRlsDataIndex) + recPerPage;
                displayRecords = artistRlsData.results.slice(artistRlsDataIndex, endRec);  // Assigns 
                console.log(artistRlsDataIndex);
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