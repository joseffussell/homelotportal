const sheetsApi = AIzaSyCkdAgqNq_XEphsNDij7k5n3FWvm-AVf6k;
const clientId = 581584795377-4cubktckoqklttna6ij1ehjam4n9m5df.apps.googleusercontent.com;
const spreadsheetId = 1jZCsVbsy89h6NBs1vSMqeXvPWZXpiVx3OQQJenzxSrs;


// Load the Google API client library
gapi.load('client:auth2', function() {
    // Initialize the client with API key
    gapi.client.init({
        apiKey: 'sheetsApi',
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        clientId: 'clientId',
        scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
        redirectUri: 'http://localhost:8000', // The same URL you specified earlier
    })
        .then(function() {
            // Sign in the user
            return gapi.auth2.getAuthInstance().signIn();
        })
        .then(function() {
            // Get the access token
            const accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;

            // Get the values from the spreadsheet
            return gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: 'spreadsheetId',
                range: 'Sheet1!A1:N427',
                access_token: accessToken // Use the access token instead of the API key
            });
        })
        .then(function(response) {
            var range = response.result;
            console.log(range.values);
        }, function(reason) {
            console.error('Error: ' + reason.result.error.message);
        });
});

