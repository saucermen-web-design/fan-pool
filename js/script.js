// *FILE LINK TEST*
    alert('Reportin for duty');

// *--- CONSTANTS ---*

// *--- APP'S STATE (VARIABLES) ---*

// *--- CACHED ELEMENT REFERENCES ---*

// *--- EVENT LISTENERS ---*

// *--- FUNCTIONS ---*

    function handleGetData(e) {
        e.preventDefault();
        userInput = $input.val();
        $.ajax({
            url:`https://api.discogs.com//marketplace/stats/release_id=14889823&curr_abbr=usd&token=GmScquIpMgYfKWDslkeqkFtIcLJhzXHURtxForyC`
        })
        .then(
            (data) => {
            $location.text(data.name);
            $temperature.text(data.main.temp);
            $feelsLike.text(data.main.feels_like);
            $weather.text(data.weather.main);
            },
            (error) => {
            console.log('bad request: ', error);
            alert('No such city.  Try again please.')
            });
    };