
// function loadClient(token) {
//     gapi.client.setApiKey(token);
//     return gapi.client.load("https://youtube.googleapis.com/$discovery/rest?version=v3")
//             .then(function() { console.log("GAPI client loaded for API"); execute()},
//                         function(err) { console.error("Error loading GAPI client for API", err); });
// }

// function execute() {
//     return gapi.client.youtube.playlist.list({
//         "part": [
//             "contentDetails"
//         ],
//         "maxResults":5,
//         "playlistId": "PLM6cqxaNHNQ9pxBPXOwNJJdq43WeWzfmP"
//     })
//     .then(function(response) {
//         // Handle the results here (response.result has the parsed body).
//         console.log("Response", response);
//         document.getElementById('result').innerText=JSON.stringify(response)
//     },
//     function(err) { console.error("Execute error", err); });
// }

// gapi.load("client");




  /**
   * Sample JavaScript code for youtube.playlists.list
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/code-samples#javascript
   */

    const CLIENT_ID = '437287763989-02qlp26c13mfh5pkufrf5s2ic7l3b63h.apps.googleusercontent.com'; // From Google Cloud Console
    const API_KEY = 'AIzaSyBoyo1LVl1ik-bNKqVrFx1McgVF5Fjh0MI';     // From Google Cloud Console

    const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';
    const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

    function authenticate() {
      open("https://accounts.google.com/o/oauth2/v2/auth?client_id=437287763989-02qlp26c13mfh5pkufrf5s2ic7l3b63h.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Ftenrom.github.io&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly&access_type=offline&prompt=consent","_self")
    }

    function loadClient() {
      gapi.client.setApiKey(API_KEY);
      return gapi.client.load(DISCOVERY_DOC)
        .then(() => {
          console.log('GAPI client loaded for API');
        })
        .catch(err => console.error('Error loading GAPI client', err));
    }

    function execute() {
      return gapi.client.youtube.playlists.list({
        part: 'snippet',
        mine: true,
        maxResults: 10
      })
      .then(response => {
        console.log('Playlists:', response.result);
      })
      .catch(err => console.error('Execute error', err));
    }

    // Load the client and auth2 libraries
    gapi.load('client:auth2', () => {
      gapi.auth2.init({ client_id: CLIENT_ID }).then(() => {
        console.log('gapi client initialized');
        loadClient();
      });
    });

