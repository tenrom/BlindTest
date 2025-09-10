let CLIENT_ID
let CLIENT_SECRET

let TOKEN_URI
let AUTH_URI
let REDIRECT_URI

let SCOPES
let ACCESS_TOKEN

fetch('client_secret.json')
    .then(res => res.json())
    .then(res => {
        
        CLIENT_ID=res["web"]["client_id"]
        CLIENT_SECRET=res['web']['client_secret']

        TOKEN_URI=res["web"]["token_uri"]
        AUTH_URI=res["web"]["auth_uri"]
        REDIRECT_URI=res['web']['redirect_uris']

        SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';
    }).catch(error => console.log(error))




function authenticate() {
    open(`${AUTH_URI}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPES}&access_type=offline&prompt=consent`,"_self")
}

function exchangeCodeForTokens(code) {
    // The parameters must be sent in a URL-encoded format
    const payload = new URLSearchParams({
        'code': code,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'redirect_uri': REDIRECT_URI,
        'grant_type': 'authorization_code'
    });

    fetch(TOKEN_URI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload.toString(), // Send the URL-encoded payload as the body
    })
    .then(response => {
        if (!response.ok) {
            // If the response is not OK, we'll get the error details from the JSON body
            return response.json().then(errorData => {
                throw new Error(`Token exchange failed: ${response.status} - ${JSON.stringify(errorData)}`);
            });
        }
        // If the response is OK, parse the JSON data
        return response.json();
    })
    .then(tokenData => {
        // This is the data you need to store and use!
        console.log('Successfully received tokens:');
        console.log('Access Token:', tokenData.access_token);
        console.log('Refresh Token:', tokenData.refresh_token);
        console.log('Expires In:', tokenData.expires_in);
        console.log('Scope:', tokenData.scope);

        ACCESS_TOKEN=tokenData.access_token

        // You would typically save the access and refresh tokens to a database here
        // and then send the access token to the client-side for API calls.
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch or in the .then() blocks
        console.error('Error during token exchange:', error);
    });
}

function getPlaylists(){
    fetch(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&maxResults=50&access_token=${ACCESS_TOKEN}`).then(res => {console.log(res.json())}) 
}

function getPlaylistItems(playlistid,after){
    fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=500&playlistId=${playlistid}&access_token=${ACCESS_TOKEN}`).then(res => {console.log(res.json)}) 
}