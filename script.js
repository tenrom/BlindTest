let iconIndex=1
let svgs={
    "ic-play":[` viewBox="0 0 24 24"><path fill="currentColor" d="M8 5.14v14l11-7z"></path>`,` viewBox="0 0 36 36"><path d="M 17 8.6 L 10.89 4.99 C 9.39 4.11 7.5 5.19 7.5 6.93 C 7.5 6.93 7.5 6.93 7.5 6.93 L 7.5 29.06 C 7.5 30.8 9.39 31.88 10.89 31 C 10.89 31 10.89 31 10.89 31 L 17 27.4 C 17 27.4 17 27.4 17 27.4 C 17 27.4 17 27.4 17 27.4 L 17 8.6 C 17 8.6 17 8.6 17 8.6 C 17 8.6 17 8.6 17 8.6 Z M 17 8.6 L 17 8.6 C 17 8.6 17 8.6 17 8.6 C 17 8.6 17 8.6 17 8.6 V 27.4 C 17 27.4 17 27.4 17 27.4 C 17 27.4 17 27.4 17 27.4 L 33 18 C 33 18 33 18 33 18 C 33 18 33 18 33 18 V 18 L 17 8.6 C 17 8.6 17 8.6 17 8.6 C 17 8.6 17 8.6 17 8.6 Z" fill="currentColor"></path>`],
    "ic-pause":[` viewBox="0 0 24 24"><path fill="currentColor" d="M14 19h4V5h-4M6 19h4V5H6z"></path>`,` viewBox="0 0 36 36" width="36"><path d="M 12.75 4.5 L 9.75 4.5 C 9.15 4.5 8.58 4.73 8.15 5.15 C 7.73 5.58 7.5 6.15 7.5 6.75 L 7.5 29.25 C 7.5 29.84 7.73 30.41 8.15 30.84 C 8.58 31.26 9.15 31.5 9.75 31.5 L 12.75 31.5 C 13.34 31.5 13.91 31.26 14.34 30.84 C 14.76 30.41 15 29.84 15 29.25 L 15 6.75 C 15 6.15 14.76 5.58 14.34 5.15 C 13.91 4.73 13.34 4.5 12.75 4.5 Z M 26.25 4.5 L 23.25 4.5 C 22.65 4.5 22.08 4.73 21.65 5.15 C 21.23 5.58 21 6.15 21 6.75 V 29.25 C 21 29.84 21.23 30.41 21.65 30.84 C 22.08 31.26 22.65 31.5 23.25 31.5 L 26.25 31.5 C 26.84 31.5 27.41 31.26 27.84 30.84 C 28.26 30.41 28.5 29.84 28.5 29.25 V 6.75 L 28.5 6.75 C 28.5 6.15 28.26 5.58 27.84 5.15 C 27.41 4.73 26.84 4.5 26.25 4.5 Z" fill="currentColor"></path>`],
    "ic-before":[` width='40px' viewBox="0 0 24 24"><path fill="currentColor" d="M16 18h2V6h-2M6 18l8.5-6L6 6z"/>`,` width='35px' viewBox="0 0 24 24"><path d="M20 20C20.26 20 20.51 19.89 20.70 19.70C20.89 19.51 21 19.26 21 19V5C21 4.73 20.89 4.48 20.70 4.29C20.51 4.10 20.26 4 20 4C19.73 4 19.48 4.10 19.29 4.29C19.10 4.48 19 4.73 19 5V19C19 19.26 19.10 19.51 19.29 19.70C19.48 19.89 19.73 20 20 20ZM5.04 19.77L18 12L5.04 4.22C4.84 4.10 4.60 4.03 4.36 4.03C4.12 4.03 3.89 4.09 3.68 4.21C3.47 4.32 3.30 4.49 3.18 4.70C3.06 4.91 2.99 5.14 3 5.38V18.61C2.99 18.85 3.06 19.08 3.18 19.29C3.30 19.50 3.47 19.67 3.68 19.79C3.89 19.90 4.12 19.96 4.36 19.96C4.60 19.96 4.84 19.89 5.04 19.77Z" fill="currentColor"></path>`],
    "ic-after":[` width='40px' viewBox="0 0 24 24"><path fill="currentColor" d="M16 18h2V6h-2M6 18l8.5-6L6 6z"/>`,` width='35px' viewBox="0 0 24 24"><path d="M20 20C20.26 20 20.51 19.89 20.70 19.70C20.89 19.51 21 19.26 21 19V5C21 4.73 20.89 4.48 20.70 4.29C20.51 4.10 20.26 4 20 4C19.73 4 19.48 4.10 19.29 4.29C19.10 4.48 19 4.73 19 5V19C19 19.26 19.10 19.51 19.29 19.70C19.48 19.89 19.73 20 20 20ZM5.04 19.77L18 12L5.04 4.22C4.84 4.10 4.60 4.03 4.36 4.03C4.12 4.03 3.89 4.09 3.68 4.21C3.47 4.32 3.30 4.49 3.18 4.70C3.06 4.91 2.99 5.14 3 5.38V18.61C2.99 18.85 3.06 19.08 3.18 19.29C3.30 19.50 3.47 19.67 3.68 19.79C3.89 19.90 4.12 19.96 4.36 19.96C4.60 19.96 4.84 19.89 5.04 19.77Z" fill="currentColor"></path>`],
    "ic-loop":[` width="32px" height="32px" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a7.99 7.99 0 0 1 6.616 3.5H16v2h6v-6h-2V6a9.98 9.98 0 0 0-8-4C6.477 2 2 6.477 2 12h2a8 8 0 0 1 8-8m8 8a8 8 0 0 1-14.616 4.5H8v-2H2v6h2V18a9.98 9.98 0 0 0 8 4c5.523 0 10-4.477 10-10z"/>`,` width="25px" height="25px" viewBox="0 0 24 24"><path fill="currentColor" d="M17.293 1.293a1 1 0 000 1.415L18.586 4H7a5 5 0 00-5 5v4a1 1 0 102 0V9a3 3 0 013-3h11.586l-1.293 1.293a1 1 0 001.414 1.415L22.414 5l-3.707-3.707a1 1 0 00-1.414 0ZM21 10a1 1 0 00-1 1v4a3 3 0 01-3 3H5.414l1.293-1.292a1.001 1.001 0 00-1.414-1.415L1.586 19l3.707 3.707a1 1 0 101.414-1.413L5.414 20H17a5 5 0 005-5v-4a1 1 0 00-1-1Z"></path>`],
    "ic-loop2":[` width="32px" height="32px" viewBox="0 0 24 24"><path fill="currentColor" d="M17.293 1.293a1 1 0 000 1.415L18.586 4H7a5 5 0 00-5 5v4a1 1 0 102 0V9a3 3 0 013-3h11.586l-1.293 1.293a1 1 0 001.414 1.415L22.414 5l-3.707-3.707a1 1 0 00-1.414 0ZM13 15V8h-2.5a1 1 0 000 2h.5v5a1 1 0 002 0Zm8-5a1 1 0 00-1 1v4a3 3 0 01-3 3H5.414l1.293-1.292a1.001 1.001 0 00-1.414-1.415L1.586 19l3.707 3.707a1 1 0 101.414-1.413L5.414 20H17a5 5 0 005-5v-4a1 1 0 00-1-1Z"/>`,` width="25px" height="25px" viewBox="0 0 24 24"><path fill="currentColor" d="M17.293 1.293a1 1 0 000 1.415L18.586 4H7a5 5 0 00-5 5v4a1 1 0 102 0V9a3 3 0 013-3h11.586l-1.293 1.293a1 1 0 001.414 1.415L22.414 5l-3.707-3.707a1 1 0 00-1.414 0ZM13 15V8h-2.5a1 1 0 000 2h.5v5a1 1 0 002 0Zm8-5a1 1 0 00-1 1v4a3 3 0 01-3 3H5.414l1.293-1.292a1.001 1.001 0 00-1.414-1.415L1.586 19l3.707 3.707a1 1 0 101.414-1.413L5.414 20H17a5 5 0 005-5v-4a1 1 0 00-1-1Z"></path>`],
    "ic-random":[` width="32px" height="32px" viewBox="0 0 512 512"><path fill="currentColor" d="M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9S384 204.9 384 192v-32h-32c-10.1 0-19.6 4.7-25.6 12.8L294 216l-40-53.3l21.2-28.3C293.3 110.2 321.8 96 352 96h32V64c0-12.9 7.8-24.6 19.8-29.6M154 296l40 53.3l-21.2 28.3C154.7 401.8 126.2 416 96 416H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h64c10.1 0 19.6-4.7 25.6-12.8zm284.6 174.6c-9.2 9.2-22.9 11.9-34.9 6.9S384 460.9 384 448v-32h-32c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h64c30.2 0 58.7 14.2 76.8 38.4l153.6 204.8c6 8.1 15.5 12.8 25.6 12.8h32v-32c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z"/>`,` width="32px" height="32px" viewBox="0 0 24 24"><path fill="currentColor" d="M16.293 1.293a1 1 0 00-.001 1.415L18.585 5H17.21a7 7 0 00-5.823 3.118L6.95 14.774A5 5 0 012.79 17H2a1 1 0 000 2h.79a7 7 0 005.822-3.117l4.438-6.656A5 5 0 0117.21 7h1.376l-2.293 2.293a1 1 0 001.414 1.414L22.414 6l-4.707-4.707a1 1 0 00-1.414 0ZM2.789 5H2a1 1 0 000 2h.79a5 5 0 014.159 2.227l.647.97 1.202-1.802-.185-.277A7 7 0 002.789 5Zm13.504 8.293a1 1 0 00-.001 1.414L18.585 17H17.21a5 5 0 01-4.16-2.226l-.648-.972-1.202 1.803.186.278A7 7 0 0017.21 19h1.376l-2.293 2.294-.068.076a1 1 0 001.406 1.406l.076-.07L22.414 18l-4.707-4.707a1 1 0 00-1.414 0Z"></path>`],
    "ic-random2":[` width="32px" height="32px" viewBox="0 0 512 512"><path fill="currentColor" d="M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9S384 204.9 384 192v-32h-32c-10.1 0-19.6 4.7-25.6 12.8L294 216l-40-53.3l21.2-28.3C293.3 110.2 321.8 96 352 96h32V64c0-12.9 7.8-24.6 19.8-29.6M154 296l40 53.3l-21.2 28.3C154.7 401.8 126.2 416 96 416H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h64c10.1 0 19.6-4.7 25.6-12.8zm284.6 174.6c-9.2 9.2-22.9 11.9-34.9 6.9S384 460.9 384 448v-32h-32c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h64c30.2 0 58.7 14.2 76.8 38.4l153.6 204.8c6 8.1 15.5 12.8 25.6 12.8h32v-32c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z"/>`,` width="32px" height="32px" viewBox="0 0 24 24"><path fill="currentColor" d="M16.293 13.293a1 1 0 011.414 0L22.414 18l-4.707 4.707a1 1 0 01-1.414-1.413L18.586 19H17.21a7.001 7.001 0 01-5.824-3.117l-.186-.278 1.202-1.803.648.972A5.001 5.001 0 0017.21 17h1.375l-2.293-2.293a1 1 0 010-1.414Zm0-12a1 1 0 011.414 0L22.414 6l-4.707 4.707a1 1 0 01-1.414-1.414L18.586 7H17.21a5 5 0 00-4.16 2.227l-4.438 6.656A7 7 0 012.79 19H2a1 1 0 010-2h.79a5 5 0 004.16-2.226l4.437-6.656A7 7 0 0117.21 5h1.375l-2.293-2.292a1 1 0 010-1.415ZM3 10.001a2 2 0 110 4 2 2 0 010-4Zm-.21-5a7 7 0 015.823 3.117l.185.277-1.202 1.803-.647-.971A5 5 0 002.79 7H2a1 1 0 010-2h.79Z"></path>`]
}

document.getElementById('btn-play').innerHTML=`
    <svg xmlns="http://www.w3.org/2000/svg"${svgs['ic-random'][iconIndex]}</svg>
`

const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));

let bodyOverflow='visible'

let db
let channelId
let currentPlaylist=[]
let playlistIds=[]
let playlistSongs=[]
let playlistSongsInfo={}
let loop=false
let randomize=false
let randomPlaylist=[]

let CLIENT_ID
let CLIENT_SECRET

let TOKEN_URI
let AUTH_URI
let REDIRECT_URI

let SCOPES
let ACCESS_TOKEN
let REFRESH_TOKEN


let urlParams
if (window.location.search){
    urlParams = new URLSearchParams(window.location.search);

    if (location.search){
        if (location.search.includes('token') && !location.search.includes('mine')){
            open(window.location+'&mine=true','_self') 
        }
    }
}else{
    urlParams = new URLSearchParams('')
}

function resize(){
    document.getElementById('playlist-container').style.width=document.body.clientWidth+'px'

    for (let i=0;i<document.getElementsByClassName('playlist-texts-author').length;i++){
        document.getElementsByClassName('playlist-texts-author')[i].style.width=document.body.clientWidth-24-document.getElementsByClassName('playlist-texts-author')[i].offsetLeft+'px'
    }

    for (let i=0;i<document.getElementsByClassName('playlist-texts-title').length;i++){
        document.getElementsByClassName('playlist-texts-title')[i].style.width=document.body.clientWidth-24-document.getElementsByClassName('playlist-texts-title')[i].offsetLeft+'px'
    }

    

    if (document.getElementById('mp-img').clientHeight*16/9>document.getElementById('mp-img').clientWidth){
        document.getElementById('mp-img').style.width=document.getElementById('mp-img').clientHeight+'px'
        document.getElementById('mp-img').style.alignSelf='center'
    }

    if (issmall){
        document.getElementById('mp').animState(1)
    }

    if (bt_visible){
        document.getElementById('bt').animState(0)
        document.getElementById('bt-text-author').style.width='0px'
        document.getElementById('bt-text-title').style.width='0px'
        document.getElementById('bt-text-author').style.width=document.getElementById('bt-img').clientWidth-1+'px'
        document.getElementById('bt-text-title').style.width=document.getElementById('bt-img').clientWidth-1+'px'
    }
}
window.addEventListener('resize',()=>{
    resize()
})

window.addEventListener('load',resize)

fetch('client_secret.json')
    .then(res => res.json())
    .then(res => {
        
        CLIENT_ID=res["web"]["client_id"]
        CLIENT_SECRET=res['web']['client_secret']

        TOKEN_URI=res["web"]["token_uri"]
        AUTH_URI=res["web"]["auth_uri"]
        REDIRECT_URI=res['web']['redirect_uris']

        SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

        initialization()
    }).catch(error => console.log(error))




function authenticate() {
    open(`${AUTH_URI}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPES}&access_type=offline&prompt=select_account`,"_self")
}

function refresh(){
    try {
        if ((JSON.parse(localStorage.getItem('refresh'))['refresh_token'])){
            exchangeCodeForTokens(JSON.parse(localStorage.getItem('refresh'))['refresh_token'] ,()=>{
                urlParams.set('token',ACCESS_TOKEN)
                open(location.href.replace(location.search,'')+'?'+urlParams.toString(),'_self')
            },true) 
        }else{
            open(location.href.replace(location.search,''),'_self')
        }
    }catch{
        open(location.href.replace(location.search,''),'_self')
    }
}

function exchangeCodeForTokens(code,after,refresh) {
    // The parameters must be sent in a URL-encoded format
    let payload
    if (!refresh){
        payload = new URLSearchParams({
            'code': code,
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'redirect_uri': REDIRECT_URI,
            'grant_type': 'authorization_code'
        })
    }else{
        CLIENT_SECRET=localStorage.getItem('client_secret')
        payload = new URLSearchParams({
            'refresh_token': code,
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'redirect_uri': REDIRECT_URI,
            'grant_type': 'refresh_token'
        })
        console.log(payload)
    }
    

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

        REFRESH_TOKEN=tokenData.refresh_token
        localStorage.setItem('refresh',JSON.stringify({'refresh_token':tokenData.refresh_token,'expires_in':tokenData.expires_in})) 
        ACCESS_TOKEN=tokenData.access_token

        after()
        // You would typically save the access and refresh tokens to a database here
        // and then send the access token to the client-side for API calls.
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch or in the .then() blocks
        console.error('Error during token exchange:', error);
        localStorage.removeItem('client_secret')

        open(location.href,'_self')
        
    });
}

class playlistImg extends HTMLElement{
    constructor(){
        super()
    }
    CreateImg(){
        for (let i=0; i<4;i++){
            this.innerHTML+=`
                <div class='playlist-img-tile' style='background-image: url(${this.getAttribute('img'+i)});'></div>
            `
        }
    }
    Create1Img(){
        this.innerHTML+=`
            <div class='playlist-img-tile' style='background-image: url(${this.getAttribute('img0')});grid-column:span 2;grid-row:span 2;'></div>
        `
    }
    connectedCallback(){
        this.classList.add('playlist-img')

    }
}

class ytPlaylist extends HTMLElement{
    constructor(){
        super()
    }
    connectedCallback(){
        this.style.width='100%'
        this.innerHTML=`
            <div class="playlist-div"> 
                <div style='background-image: url(${this.getAttribute('img')});' class="playlist-imgs"></div>
                <div class='playlist-box'>
                    <h2 class='playlist-texts-title'>${this.getAttribute('text-title')}</h2>
                    <h2 class='playlist-texts-author'>${this.getAttribute('text-author')}</h2>
                </div>
            </div>
        `
        if (this.getAttribute('square')==="true"){
            this.getElementsByClassName('playlist-imgs')[0].style.backgroundSize='cover'
        }else{
            this.getElementsByClassName('playlist-imgs')[0].style.backgroundSize='contain'
        }

        this.addEventListener('click',()=>{
            urlParams.set('list',this.getAttribute('listid'))
            if (urlParams.get('channel')){
                urlParams.delete('channel',urlParams.get('channel'))
            }
            open(location.href.replace(location.search,'')+'?'+urlParams.toString(),'_self')
        })
    }
}



class ytPlaylistItem extends HTMLElement{
    constructor(){
        super()
    }
    connectedCallback(){
        this.style.width='100%'
        this.innerHTML=`
            <div class="playlist-div-item"> 
                <div style='background-image: url(${this.getAttribute('img')});' class="playlist-imgs"></div>
                <div class='playlist-box'>
                    <h2 class='playlist-texts-title'>${this.getAttribute('text-title')}</h2>
                    <h2 class='playlist-texts-author'>${this.getAttribute('text-author')}</h2>
                </div>
            </div>
        `
        if (this.getAttribute('square')==="true"){
            this.getElementsByClassName('playlist-imgs')[0].style.backgroundSize='cover'
        }else{
            this.getElementsByClassName('playlist-imgs')[0].style.backgroundSize='contain'
        }

        this.addEventListener('click',()=>{
            if (playlistSongs[indexMusic]==this.getAttribute('ytid')){
                document.getElementById('mp').show()
            }else{
                loopIconUpdate(false)
                randomIconUpdate(false)
                Load(this.getAttribute('ytid'))
            }
        })
    }
}

window.customElements.define('yt-playlist',ytPlaylist)
window.customElements.define('yt-playlist-item',ytPlaylistItem)
window.customElements.define('playlist-img',playlistImg)

function getPlaylists(channelid='',mine=false,after){
    if (mine){
        fetch(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&maxResults=50&access_token=${ACCESS_TOKEN}`).then(res => res.json()).then(res => {
            after(res)
        }).catch(refresh)
    }else{
        fetch(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelid}&maxResults=50&access_token=${ACCESS_TOKEN}`).then(res => res.json()).then(res => {
            after(res)
        }).catch(refresh)
    }
}

function getPlaylistItems(playlistid,mine=false,after){
    if (mine){
        fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet,status,contentDetails&maxResults=500&playlistId=${playlistid}&access_token=${ACCESS_TOKEN}`).then(res => res.json()).then(res => {
            after(res)
        }).catch(refresh)
    }else{
        fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet,status,contentDetails&maxResults=500&playlistId=${playlistid}&access_token=${ACCESS_TOKEN}`).then(res => res.json()).then(res => {
            after(res)
        }).catch(refresh)
    }
}


function ShowPlaylist(json){
    console.log(json)
    db=json
    for (let i in json['items']){
        if (json['items'][i]['status']['privacyStatus']==='public'){
            let j=json['items'][i]
            let id=j['snippet']['resourceId']['videoId']
            let title=j['snippet']['title']
            let author=j['snippet']['videoOwnerChannelTitle']
            if (author.includes(' - Topic')){
                let arr=j['snippet']['description'].match(/[^\n]+/g)[1].split(" · ") 
                title=arr.splice(0,1)[0]
                if (arr.length>1){
                    last=arr.splice(-1,1)[0]
                    author=arr.join(', ')+' et '+last
                }else{
                    author=arr.splice(-1,1)[0]
                }
            }

            playlistIds.push(id)
            playlistSongs.push([id,title,author])
            playlistSongsInfo[id]=[title,author]
        }
    }
    currentPlaylist=playlistIds

    document.getElementById('playlist-container').style.display='flex'

    let html=''
    let len=0
    for (let i in json['items']){
        let j=json['items'][i]
        if (j['status']['privacyStatus']==='public'){
            let url=j['snippet']['thumbnails']['medium']['url']
            try{
                url=j['snippet']['thumbnails']['maxres']['url']
            }catch{

            }
            let square='false'
            let title=j['snippet']['title']
            let author=j['snippet']['videoOwnerChannelTitle']
            if (author.includes(' - Topic')){
                let arr=j['snippet']['description'].match(/[^\n]+/g)[1].split(" · ") 
                title=arr.splice(0,1)[0]
                if (arr.length>1){
                    last=arr.splice(-1,1)[0]
                    author=arr.join(', ')+' et '+last
                }else{
                    author=arr.splice(-1,1)[0]
                }
                square='true'
            }

            html+=`
                <yt-playlist-item text-author="${author}" text-title="${title}" img='${url}' id='${i}' square='${square}' ytid='${j['snippet']['resourceId']['videoId']}'></yt-playlist-item>
            `
            len++
        }
    }

    document.getElementById('div-playlists-items').innerHTML+=html
    let offset=0
    if (len!==1 && json['items'][0]['snippet']['playlistId']!=='LL'){
        for (let i=0;i<4;i++){
            let index=i%len
            let c
            if (len===2){
                c=(i-i%len)/len
                index=(i%len-1*c)*(1-2*c)
            }

            let j=json['items'][index+offset]

            if (j['status']['privacyStatus']==='public'){
                let url=j['snippet']['thumbnails']['medium']['url']
                try{
                    url=j['snippet']['thumbnails']['maxres']['url']
                }catch{

                }

                document.getElementsByTagName('playlist-img')[0].setAttribute('img'+i,url)
            }else{
                offset++
                i--
            }
        }


        document.getElementsByTagName('playlist-img')[0].CreateImg()
    }else{
        let url=json['items'][0]['snippet']['thumbnails']['medium']['url']
        try{
            url=json['items'][0]['snippet']['thumbnails']['maxres']['url']
        }catch{

        }

        if (json['items'][0]['snippet']['playlistId']==='LL'){
            url='https://www.gstatic.com/youtube/media/ytm/images/pbg/liked-songs-delhi-1200.png' // 'https://www.gstatic.com/youtube/media/ytm/images/pbg/liked-music-@1200.png'
        }

        document.getElementsByTagName('playlist-img')[0].setAttribute('img0',url)
        document.getElementsByTagName('playlist-img')[0].Create1Img()
    }

    document.getElementById('btn-play').style.display='flex'

    
    document.getElementById('playlist-author-items').innerText=json['items'][0]['snippet']['channelTitle']
    if (json['items'][0]['snippet']['playlistId']==='LL'){
        document.getElementById('playlist-author-items').innerText='Playlist automatique'
    }

    fetch(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=500&id=${json['items'][0]['snippet']['playlistId']}&access_token=${ACCESS_TOKEN}`).then(res => res.json()).then(res => {
        console.log(res)
        document.getElementById('playlist-title-items').innerText=res['items'][0]['snippet']['title']
        document.getElementById('playlist-banner-title').innerText=res['items'][0]['snippet']['title']

        let url=res['items'][0]['snippet']['thumbnails']['medium']['url']
        try{
            url=res['items'][0]['snippet']['thumbnails']['maxres']['url']
        }catch{}

        if (new URL(url).hostname!=='i.ytimg.com'){
            document.getElementsByTagName('playlist-img')[0].innerHTML=''
            document.getElementsByTagName('playlist-img')[0].setAttribute('img0',url)
            document.getElementsByTagName('playlist-img')[0].Create1Img()
        }
        
        let p=document.getElementsByTagName('playlist-img')[0]
        let blur=p.cloneNode(true)
        blur.style.filter='blur(60px)'
        blur.style.transform='scale(2,2) translate(0,-33px)'
        blur.style.opacity='0.9'
        blur.style.position='absolute'
        blur.style.zIndex='-1'

        p.parentNode.insertBefore(blur,p)
    })
}

function ShowPlaylists(json){
    console.log(json)
    document.getElementById('playlists-container').style.display='flex'

    let html=''
    if (urlParams.get('mine')==='true'){
        html+=`
            <yt-playlist text-author="Playlist automatique" text-title="Liked videos" img='https://www.gstatic.com/youtube/media/ytm/images/pbg/liked-songs-delhi-1200.png' listid='LL' square='${'true'}'></yt-playlist>
        `
    }
    
    if (json['items'].length>0){
    
        for (let i in json['items']){
            let j=json['items'][i]
            let url=j['snippet']['thumbnails']['medium']['url']
            try{
                url=j['snippet']['thumbnails']['maxres']['url']
            }catch{

            }
            
            html+=`
                <yt-playlist text-author="${j['snippet']['channelTitle']}" text-title="${j['snippet']['title']}" img='${url}' listid='${j['id']}' square='${'true'}'></yt-playlist>
            `
        }

        

        document.getElementById('div-playlists').innerHTML=html

        
            
    }

    if (urlParams.get('mine')==='true'){
        fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&mine=true&access_token=${ACCESS_TOKEN}`).then(res => res.json()).then(res => {
            console.log(res)
            document.getElementById('channel-img').src=res['items'][0]['snippet']['thumbnails']['high']['url']
            document.getElementById('playlist-author').innerText=res['items'][0]['snippet']['title']
            channelId=res['items'][0]['id']
        })  
    }else{
        fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${urlParams.get('channel')}&access_token=${ACCESS_TOKEN}`).then(res => res.json()).then(res => {
            console.log(res)
            document.getElementById('channel-img').src=res['items'][0]['snippet']['thumbnails']['high']['url']
            document.getElementById('playlist-author').innerText=res['items'][0]['snippet']['title']
        })
    }

}

function ShowSearch(){
    document.getElementById('explore-search-container').style.display='flex'
}

function initialization(){
    if (urlParams.get('code')){
        if (localStorage.getItem('client_secret')){
            CLIENT_SECRET=localStorage.getItem('client_secret')
        }else{
            CLIENT_SECRET=prompt('Password')
            localStorage.setItem('client_secret',CLIENT_SECRET)
        }

        exchangeCodeForTokens(urlParams.get('code'),()=>{
            urlParams.delete('code',urlParams.get('code'))
            urlParams.set('token',ACCESS_TOKEN)
            open(location.href.replace(location.search,'')+'?'+urlParams.toString(),'_self')
        },false)
    }else{
        if (!urlParams.get('token')){
            document.getElementById('btn-signin').style.display='block'
        }
    }
    if (urlParams.get('token')){
        ACCESS_TOKEN=urlParams.get('token')
    }
    if (window.parent.location.search.includes('explore=1')){
        ShowSearch()
    }else if (window.parent.location.search.includes('welcome=1')){

    }else{
        if (urlParams.get('mine')==='true'){
            if (urlParams.get('mine')==='true'){
                console.log('Mine')
                if (urlParams.get('list')){
                    getPlaylistItems(urlParams.get('list'),mine=true,ShowPlaylist)
                }else{
                    getPlaylists(channelid='',mine=true,ShowPlaylists)
                }
            }
        }else{
            if (urlParams.get('list')){
                if (urlParams.get('code')){
                    exchangeCodeForTokens(urlParams.get('code'),()=>{
                        getPlaylistItems(urlParams.get('list'),mine=true,ShowPlaylist)
                    },false)
                }else{
                    getPlaylistItems(urlParams.get('list'),false,ShowPlaylist)
                }
            }
            if (urlParams.get('channel')){
                getPlaylists(channelid=urlParams.get('channel'),false,ShowPlaylists)
            }
        }
    }
}


function Back(){
    urlParams.delete('list',urlParams.get('list'))
    if (db['items']){
        urlParams.set('channel',db['items'][0]['snippet']['channelId'])
    }
    open(location.href.replace(location.search,'')+'?'+urlParams.toString(),'_self')
}


let bannerShow=false
window.addEventListener('scroll',(e)=>{
    if (bannerShow){
        if (window.scrollY<420){
            document.getElementById('playlist-banner').classList.remove('playlist-banner-filled')
            document.getElementById('playlist-banner-title').style.opacity='0'
            bannerShow=false
        }
    }else{
        if (window.scrollY>420){
            document.getElementById('playlist-banner').classList.add('playlist-banner-filled')
            document.getElementById('playlist-banner-title').style.opacity='1'
            bannerShow=true
        }
    }
    
})


window.addEventListener('pagehide',  (e)=>{ 
    console.log('hide')
    e.preventDefault();
})



let isclicking=false
let isSliding=false
let sliderValue

let isclickingMp=false
let offsetXMp
let valueXMp
let spline=BezierEasing.css["ease-in"]
let Inversespline=BezierEasing(0, 0.42, 1, 1)
let issmall=true
let issmallclick=false
let smalloffset
let smalldirection
let smallsValueH
let justchange=false

let t
let duration=500
let startAlpha
let reverse

function animate(){
    let time=performance.now()
    let ti=time-t+(Inversespline(startAlpha)*duration)

    if (ti<=duration){
        
        let a=ti/duration
        if (reverse){a=1-a}
        document.getElementById('mp').animState(spline(a))
        requestAnimationFrame(animate)
    }else{
        let a=1
        if (reverse){a=1-a}
        document.getElementById('mp').animState(a)
    }
}
class musicPlayer extends HTMLElement{
    constructor(){
        super()
    }
    startAnim(dura,re,a){
        t=performance.now()
        duration=dura
        startAlpha=a
        reverse=re
        animate(duration)
    }
    animState(a){

        this.style.translate='0px calc(100% - '+clamp(((1-a)*this.clientHeight),110+20,this.clientHeight)+'px)'
        let opa=1-(a*4)
        for (let i=0;i< document.getElementById('mp-container').children.length;i++){
            document.getElementById('mp-container').children[i].style.opacity=opa
            if (i!==0){
                document.getElementById('mp-container').children[i].style.transform='translateY(-'+a*250+'px)'
            }
        }
        
        let scale=(1-clamp(a*1.05))
        scale=clamp(scale,40/document.getElementById('mp-img').clientHeight,1)
        document.getElementById('mp-img').style.transform='translateY(-'+(clamp(a*1.5)*(64-10))+'px) scale('+scale+')'
        document.getElementById('mp-img').style.opacity=1
        document.getElementById('mp-img').style.translate='calc(-'+50*a+'vw + '+(document.getElementById('mp-img').clientWidth + 36)/2*a+'px'

        
        document.getElementById('mp-img').style.borderRadius=lerp(10,document.getElementById('mp-img').clientHeight/8,a)+"px"

        document.getElementById('nav').style.transform='translateY('+(clamp(1-a-0.5)*document.getElementById('nav').clientHeight*2)+'px)'
        
        if (a>=0.75){
            document.getElementById('mp-small-box').style.opacity=clamp((a-0.65)*4)
            document.getElementById('mp-small-box').style.display=''
        }else{
            document.getElementById('mp-small-box').style.opacity=0
            document.getElementById('mp-small-box').style.display='none'
        }
        

        const canvas = document.getElementById('mp-canvas')
        const ctx=canvas.getContext('2d')
        
        if (a===1){
            ctx.fillStyle = '#212121ff'; // Darker color for contrast
            // ctx.fillStyle = '#ff0000ff'; // Darker color for contrast
            ctx.fillRect(0,0,canvas.width,canvas.height)

            if (!bt_visible){
                document.body.style.overflow='visible'
                bodyOverflow='visible'
            }
            
            this.style.pointerEvents=''

            issmall=true

        }else{
            ctx.fillStyle = '#000000ff'; // Darker color for contrast
            ctx.fillRect(0,0,canvas.width,canvas.height)
            
            this.style.display='block'
            document.body.style.overflow='hidden'
            bodyOverflow='hidden'

            issmall=false
            
        }

        if (a===0 && reverse){
            document.getElementById('mp').style.pointerEvents=''
        }

        if (a===0){
            this.style.translate='0px 0px'
        }
    }
    show(){
        if (!issmall){
            document.body.style.overflow='hidden'
            bodyOverflow='hidden'
        }
        if (issmall && !justchange){
            this.style.display='block'
            this.startAnim(duration,true,0)
            this.style.pointerEvents=''
        }
        
        document.getElementById('mp-img').style.backgroundImage=`url('${document.getElementsByTagName('yt-playlist-item')[playlistIds.indexOf(currentPlaylist[indexMusic])].getAttribute('img')}')`
        document.getElementById('mp-img').style.backgroundSize=document.getElementsByTagName('yt-playlist-item')[playlistIds.indexOf(currentPlaylist[indexMusic])].getElementsByClassName('playlist-imgs')[0].style.backgroundSize

        setTimeout(()=>{document.getElementById('mp-img').style.width=document.getElementById('mp-img').clientHeight+'px'},10)
        
        let title=document.getElementsByTagName('yt-playlist-item')[playlistIds.indexOf(currentPlaylist[indexMusic])].getAttribute('text-title')
        let author=document.getElementsByTagName('yt-playlist-item')[playlistIds.indexOf(currentPlaylist[indexMusic])].getAttribute('text-author')
        document.getElementById('mp-text-title').innerText=title
        document.getElementById('mp-text-author').innerText=author
        document.getElementById('mp-song-text-title').innerText=title
        document.getElementById('mp-song-text-author').innerText=author

        document.getElementById('mp-text-time').innerText=formatTime(player.duration)

        if (document.getElementsByClassName('plyr__control')[0].getAttribute('aria-label')==='Pause'){
            document.getElementById('mp-btn-play').children[0].style.display='none'
            document.getElementById('mp-btn-play').children[1].style.display='block'
            document.getElementById('mp-small-btn-play').children[0].style.display='none'
            document.getElementById('mp-small-btn-play').children[1].style.display='block'
        }else{
            document.getElementById('mp-btn-play').children[0].style.display='block'
            document.getElementById('mp-btn-play').children[1].style.display='none'
            document.getElementById('mp-small-btn-play').children[0].style.display='block'
            document.getElementById('mp-small-btn-play').children[1].style.display='none'
        }

        document.getElementById('mp-text-playlist').innerText=document.getElementById('playlist-title-items').innerText

        document.getElementById('playlist-container').style.paddingBottom='72px'
        document.getElementById('div-videos').style.paddingBottom='52px'
        document.getElementById('div-shorts').style.paddingBottom='52px'
    }
    hide(){
        
        this.startAnim(duration,false,0)
        this.style.pointerEvents='none'
    }
    connectedCallback(){
        this.classList.add('mp')

        this.innerHTML=`
        <canvas class="mp-canvas" id="mp-canvas"></canvas>
        <div class="mp-small-box" id="mp-small-box">
            <div class="mp-song-box" id="mp-song-box">
                <h2 class="mp-song-text-title" id="mp-song-text-title"></h2>
                <h2 class="mp-song-text-author" id="mp-song-text-author"></h2>
            </div>
            <div class="mp-small-btn-play" id="mp-small-btn-play">
                <svg xmlns="http://www.w3.org/2000/svg" style="width: 30px; display: none;color:white;"${svgs['ic-play'][iconIndex]}</svg>
                <svg xmlns="http://www.w3.org/2000/svg" style="width: 30px; display: block;color:white;"${svgs['ic-pause'][iconIndex]}</svg>
            </div>
        </div>
        <div class="mp-container" id="mp-container">
            <svg onclick="document.getElementById('mp').hide()" style="color:white;scale:1.3; transform:translateY(-15px);flex-shrink:0;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 10l5 5l5-5"/></svg>
            <div class="mp-img" id="mp-img"></div>
            <div class='mp-box'>
                <h2 class='mp-text-title' id="mp-text-title"></h2>
                <h2 class='mp-text-author' id="mp-text-author"></h2>
            </div>
            <div class='mp-btn-box'>
                <div class='mp-btn' id="mp-btn-random" style="margin-right: 5px;">
                    <svg xmlns="http://www.w3.org/2000/svg" color="white" width="25px" height="25px"${svgs['ic-random'][iconIndex]}</svg>
                </div>
                <div class='mp-btn' id="mp-btn-before">
                    <svg xmlns="http://www.w3.org/2000/svg" style="transform:rotate(180deg);" color="white"${svgs['ic-before'][iconIndex]}</svg>
                </div>
                <div class='mp-btn-center' id="mp-btn-play">
                    <svg xmlns="http://www.w3.org/2000/svg" style="width:40px;"${svgs['ic-play'][iconIndex]}</svg>
                    <svg xmlns="http://www.w3.org/2000/svg" style="width:40px;display:none;"${svgs['ic-pause'][iconIndex]}</svg>
                </div>
                <div class='mp-btn' id="mp-btn-after">
                    <svg xmlns="http://www.w3.org/2000/svg" color="white"${svgs['ic-after'][iconIndex]}</svg>
                </div>
                <div class='mp-btn' id="mp-btn-loop" style="margin-left: 5px;">
                    <svg xmlns="http://www.w3.org/2000/svg" color="white"${svgs['ic-loop'][iconIndex]}</svg>
                </div>
            </div>
            <div class="mp-slider-box" id="mp-slider-box">
                <div class="mp-slider" id='mp-slider'>
                    <div class="mp-slider-bar" id="mp-slider-bar"></div>
                </div>
                <div style="display:flex;flex-direction:row;width:100%;justify-content:space-between;margin-top:8px;">
                    <h2 class="mp-text-ctime" id="mp-text-ctime">0:00</h2>
                    <h2 class="mp-text-time" id="mp-text-time">2:52</h2>
                </div>
            </div>
            
            
        </div>

        <div class="mp-playlist-bar"></div>
        <h2 class="mp-text-playlist" id="mp-text-playlist"></h2>
        
        `

        const canvas = document.getElementById('mp-canvas')
        const ctx=canvas.getContext('2d')
        canvas.width=window.innerWidth
        canvas.height=window.innerHeight
        
        ctx.fillStyle = '#000000ff'; // Darker color for contrast
        ctx.fillRect(0,0,canvas.width,canvas.height)

        document.getElementById('mp-btn-before').addEventListener('click',(e)=>{
            if (player.currentTime<5){
                loopIconUpdate(false)
                SubIndexMusic()
                justchange=true
                Load(currentPlaylist[indexMusic])
            }else{
                player.embed.seekTo(0)
            }
        })

        let play=(e)=>{
            e.stopPropagation()
            if (document.getElementsByClassName('plyr__control')[0].getAttribute('aria-label')==='Play'){
                document.getElementById('mp-btn-play').children[0].style.display='none'
                document.getElementById('mp-btn-play').children[1].style.display='block'
                document.getElementById('mp-small-btn-play').children[0].style.display='none'
                document.getElementById('mp-small-btn-play').children[1].style.display='block'
            }else{
                document.getElementById('mp-btn-play').children[0].style.display='block'
                document.getElementById('mp-btn-play').children[1].style.display='none'
                document.getElementById('mp-small-btn-play').children[0].style.display='block'
                document.getElementById('mp-small-btn-play').children[1].style.display='none'
            }

            player.embed.setVolume(100)
            document.getElementsByClassName('plyr__control')[0].click()
        }

        document.getElementById('mp-btn-play').addEventListener('click',play)
        document.getElementById('mp-small-btn-play').addEventListener('click',play)
        document.getElementById('mp-small-btn-play').addEventListener('click',()=>{
            issmallclick=false
        })

        document.getElementById('mp-btn-after').addEventListener('click',()=>{
            loopIconUpdate(false)
            AddIndexMusic()
            justchange=true
            Load(currentPlaylist[indexMusic])
        })
        
        
        document.getElementById('mp-slider-box').addEventListener('mousedown',(e)=>{
            isclicking=true
            isSliding=true
            sliderValue=(e.clientX-document.getElementById('mp-slider').getBoundingClientRect().x)/document.getElementById('mp-slider').clientWidth * player.duration
            sliderValue=Math.max(Math.min(sliderValue,player.duration),0)
            document.getElementById('mp-slider-bar').style.transform = 'scaleX('+(sliderValue / player.duration) * 100+'%)'
            document.getElementById('mp-text-ctime').innerText = formatTime(sliderValue)
        })
        document.getElementById('mp-slider-box').addEventListener('touchstart',(e)=>{
            isclicking=true
            isSliding=true
            sliderValue=(e.changedTouches[0].clientX-document.getElementById('mp-slider').getBoundingClientRect().x)/document.getElementById('mp-slider').clientWidth * player.duration
            sliderValue=Math.max(Math.min(sliderValue,player.duration),0)
            document.getElementById('mp-slider-bar').style.transform = 'scaleX('+(sliderValue / player.duration) * 100+'%)'
            document.getElementById('mp-text-ctime').innerText = formatTime(sliderValue)
            document.getElementById('mp-text-time').style.color = 'white'
            document.getElementById('mp-text-ctime').style.color = 'white'
            document.getElementById('mp-slider').style.height = '9px'
        })

        document.getElementById('mp').addEventListener('mousedown',(e)=>{
            if (!isclicking && !issmall){
                isclickingMp=true
                offsetXMp=e.clientY
                valueXMp=(e.clientY-offsetXMp)/document.getElementById('mp').clientHeight
                valueXMp=Math.max(Math.min(valueXMp,1),0)
            }
        })

        document.getElementById('mp').addEventListener('touchstart',(e)=>{
            if (!isclicking && !issmall){
                isclickingMp=true
                offsetXMp=e.changedTouches[0].clientY
                valueXMp=(e.changedTouches[0].clientY-offsetXMp)/document.getElementById('mp').clientHeight
                valueXMp=Math.max(Math.min(valueXMp,1),0)
            }
        })

        document.getElementById('mp').addEventListener('click',(e)=>{
            if (!isclicking && issmall && smalldirection!=='no'){
                document.getElementById('mp').show()
            }
            
            if (issmallclick){
                issmallclick=false
                smalldirection=null
            }
        })

        document.getElementById('mp-small-box').addEventListener('mousedown',(e)=>{
            e.stopPropagation()
            issmallclick=true
            smalloffset=[e.clientX,e.clientY,e.clientY-document.getElementById('mp-small-box').getBoundingClientRect().y]
            
        })

        document.getElementById('mp-small-box').addEventListener('touchstart',(e)=>{
            issmallclick=true
            document.body.style.overflow='hidden'
            bodyOverflow='hidden'
            smalloffset=[e.changedTouches[0].clientX,e.changedTouches[0].clientY,e.changedTouches[0].clientY-document.getElementById('mp-small-box').getBoundingClientRect().y]
        })

        document.getElementById('mp-btn-loop').addEventListener('click',()=>{
            loopIconUpdate(!loop)
        })
        document.getElementById('mp-btn-random').addEventListener('click',()=>{
            randomIconUpdate(!randomize)
        })
    }
}


window.customElements.define('yt-music-player',musicPlayer)

document.addEventListener('mousemove',(e)=>{
    if (isclicking && !issmallclick){
        sliderValue=(e.clientX-document.getElementById('mp-slider').getBoundingClientRect().x)/document.getElementById('mp-slider').clientWidth * player.duration
        sliderValue=Math.max(Math.min(sliderValue,player.duration),0)
        document.getElementById('mp-slider-bar').style.transform = 'scaleX('+(sliderValue / player.duration) * 100+'%)'
        document.getElementById('mp-text-ctime').innerText = formatTime(sliderValue)
    }else{
        if (isclickingMp){
            valueXMp=(e.clientY-offsetXMp)/document.getElementById('mp').clientHeight
            valueXMp=Math.max(Math.min(valueXMp,1),0)

            document.getElementById('mp').animState(valueXMp)
        }
    }

    if (issmallclick){
        let value=[e.clientX-smalloffset[0],e.clientY-smalloffset[1]]   
        if (!smalldirection || smalldirection==='no'){
            if (Math.abs(value[1])>Math.abs(value[0])){
                smalldirection='v'
            }else{
                smalldirection='h'
            }
        }else{
            if (smalldirection==='v'){
                console.log(smalloffset[2])
                valueXMp=(e.clientY-smalloffset[2])/document.getElementById('mp').clientHeight
                valueXMp=Math.max(Math.min(valueXMp,1),0)

                document.getElementById('mp').animState(valueXMp)
            }else if(smalldirection==='h'){
                
                document.getElementById('mp-song-box').style.translate=(e.clientX-74)-(smalloffset[0]-74)+'px'
                document.getElementById('mp-img').style.translate='calc('+((document.getElementById('mp-img').clientWidth + 36)/2+value[0])+'px - 50vw)'

                smallsValueH=0
                if (value[0]<-50){
                    smallsValueH=1
                }
                if (value[0]>50){
                    smallsValueH=-1
                }
            }
        }
    }
})

let mouseup=(e)=>{
    if (isclicking && !issmallclick){
        player.embed.seekTo(sliderValue)
        isclicking=false

        player.once('statechange',()=>{
            isSliding=false
        })
    }else{
        if (isclickingMp){
            isclickingMp=false
            document.getElementById('mp').style.pointerEvents='none'
            valueXMp=(e.clientY-offsetXMp)/document.getElementById('mp').clientHeight
            valueXMp=Math.max(Math.min(valueXMp,1),0)

            if (valueXMp>0.1){
                document.getElementById('mp').startAnim(duration,false,valueXMp)
            }else{
                document.getElementById('mp').startAnim(duration,true,1-valueXMp)
            }   
        }
    }

    if (issmallclick){
        if (smalldirection==='v'){
            smalldirection=null
            issmallclick=false
            document.getElementById('mp').style.pointerEvents='none'
            valueXMp=(e.clientY-smalloffset[2])/document.getElementById('mp').clientHeight
            valueXMp=Math.max(Math.min(valueXMp,1),0)

            if (valueXMp>0.75){
                document.getElementById('mp').startAnim(duration,false,valueXMp)
            }else{
                document.getElementById('mp').startAnim(duration,true,1-valueXMp)
            }
        }else if (smalldirection==='h'){
            smalldirection='no'
            issmallclick=false

            document.getElementById('mp-song-box').style.translate='0px'
            document.getElementById('mp-img').style.translate='calc('+(document.getElementById('mp-img').clientWidth + 36)/2+'px - 50vw)'
            console.log(smallsValueH)
            if (smallsValueH>0){
                AddIndexMusic()
                justchange=true
                Load(currentPlaylist[indexMusic])
            }
            if (smallsValueH<0){
                SubIndexMusic()
                justchange=true
                Load(currentPlaylist[indexMusic])
            }
            
        }
    }
}

document.addEventListener('mouseup',mouseup)
document.getElementById('nav').addEventListener('load',()=>{
    document.getElementById('nav').contentDocument.body.getElementsByClassName('nav')[0].addEventListener('mouseup',mouseup)
})

document.addEventListener('touchmove',(e)=>{
    if (isclicking){
        sliderValue=(e.changedTouches[0].clientX-document.getElementById('mp-slider').getBoundingClientRect().x)/document.getElementById('mp-slider').clientWidth * player.duration
        sliderValue=Math.max(Math.min(sliderValue,player.duration),0)
        document.getElementById('mp-slider-bar').style.transform = 'scaleX('+(sliderValue / player.duration) * 100+'%)'
        document.getElementById('mp-text-ctime').innerText = formatTime(sliderValue)
    }else{
        if (isclickingMp){
            valueXMp=(e.changedTouches[0].clientY-offsetXMp)/document.getElementById('mp').clientHeight
            valueXMp=Math.max(Math.min(valueXMp,1),0)

            document.getElementById('mp').animState(valueXMp)
        }
    }

    if (issmallclick){
        let value=[e.changedTouches[0].clientX-smalloffset[0],e.changedTouches[0].clientY-smalloffset[1]]   

        if (Math.abs(value[1])<20 && Math.abs(value[0])<20){
        }else if (!smalldirection || smalldirection==='no'){
            if (Math.abs(value[1])>Math.abs(value[0])){
                smalldirection='v'
            }else{
                smalldirection='h'
            }
        }else{
            if (smalldirection==='v'){
                console.log(smalloffset[2])
                valueXMp=(e.changedTouches[0].clientY-smalloffset[2])/document.getElementById('mp').clientHeight
                valueXMp=Math.max(Math.min(valueXMp,1),0)

                document.getElementById('mp').animState(valueXMp)
            }else if(smalldirection==='h'){
                
                document.getElementById('mp-song-box').style.translate=(e.changedTouches[0].clientX-74)-(smalloffset[0]-74)+'px'
                document.getElementById('mp-img').style.translate='calc('+((document.getElementById('mp-img').clientWidth + 36)/2+value[0])+'px - 50vw)'

                smallsValueH=0
                if (value[0]<-50){
                    smallsValueH=1
                }
                if (value[0]>50){
                    smallsValueH=-1
                }
            }
        }
    }
})

document.addEventListener('touchend',(e)=>{
    if (isclicking){
        player.embed.seekTo(sliderValue)
        isclicking=false

        document.getElementById('mp-text-time').style.color = ''
        document.getElementById('mp-text-ctime').style.color = ''
        document.getElementById('mp-slider').style.height = ''

        player.once('statechange',()=>{
            isSliding=false
        })
    }else{
        if (isclickingMp){
            isclickingMp=false
            document.getElementById('mp').style.pointerEvents='none'
            valueXMp=(e.changedTouches[0].clientY-offsetXMp)/document.getElementById('mp').clientHeight
            valueXMp=Math.max(Math.min(valueXMp,1),0)

            if (valueXMp>0.1){
                document.getElementById('mp').startAnim(duration,false,valueXMp)
            }else{
                document.getElementById('mp').startAnim(duration,true,1-valueXMp)
            }   
        }
    }

    if (issmallclick){
        if (smalldirection==='v'){
            document.getElementById('mp').style.pointerEvents='none'
            valueXMp=(e.changedTouches[0].clientY-smalloffset[2])/document.getElementById('mp').clientHeight
            valueXMp=Math.max(Math.min(valueXMp,1),0)

            if (valueXMp>0.75){
                document.getElementById('mp').startAnim(duration,false,valueXMp)
            }else{
                document.getElementById('mp').startAnim(duration,true,1-valueXMp)
            }
        }else if (smalldirection==='h'){

            document.getElementById('mp-song-box').style.translate='0px'
            document.getElementById('mp-img').style.translate='calc('+(document.getElementById('mp-img').clientWidth + 36)/2+'px - 50vw)'
            
            if (smallsValueH>0){
                AddIndexMusic()
                justchange=true
                Load(currentPlaylist[indexMusic])
            }
            if (smallsValueH<0){
                SubIndexMusic()
                justchange=true
                Load(currentPlaylist[indexMusic])
            }
            console.log(smallsValueH)
        }
        smalldirection=null
        issmallclick=false
        if (!bt_visible){
            document.body.style.overflow='visible'
            bodyOverflow='visible'
        }
    }
})

function isoDurationToArray(isoDuration) {
    let hours = 0, minutes = 0, seconds = 0;
    
    const hoursMatch = isoDuration.match(/(\d+)H/);
    const minutesMatch = isoDuration.match(/(\d+)M/);
    const secondsMatch = isoDuration.match(/(\d+)S/);
    
    if (hoursMatch) hours = parseInt(hoursMatch[1], 10);
    if (minutesMatch) minutes = parseInt(minutesMatch[1], 10);
    if (secondsMatch) seconds = parseInt(secondsMatch[1], 10);
    
    return [hours, minutes, seconds];
}


function convert_time(duration) {
    if (duration.includes('PT')){
        let a = isoDurationToArray(duration)
        let d = 0

        if(a.length == 3) {
            d = d + parseInt(a[0]) * 3600;
            d = d + parseInt(a[1]) * 60;
            d = d + parseInt(a[2]);
        }
        if(a.length == 2) {
            d = d + parseInt(a[0]) * 60;
            d = d + parseInt(a[1]);
        }
        if(a.length == 1) {
            d = d + parseInt(a[0]);
        }
        return formatTime(d)
    }else{
        console.error('Invalid ISO 8601 time.')
    }
}



document.getElementById('search-bar').addEventListener('click',()=>{
    document.getElementById('search-bar-input').focus()
})

document.getElementById('btn-search-bar').addEventListener('click',()=>{
    search()
})

document.getElementById('search-bar-input').addEventListener('submit',()=>{
    search()
})


function ExtractChannelFromURI(url){
    try {
        const parts = new URL(url).pathname.split('/').filter(Boolean)
        if (parts[0] === 'channel') {
            return parts[1]
        } else if (parts[0] === 'c' || parts[0] === 'user') {
            return parts[1]
        } else if (parts[0].includes('@')){
            return parts[0]
        }else{
            return null
        }
    } catch (e) {
        return null
    }
}

function ExtractVideoFromURI(url){
    try {
        const parsedUrl = new URL(url)
        if (parsedUrl.hostname.includes('youtube.com')) {
            return parsedUrl.searchParams.get('v')
        }
        if (parsedUrl.hostname === 'youtu.be') {
            return parsedUrl.pathname.slice(1)
        }
        return null
    } catch (e) {
        return null
    }
}

function SearchAnim(){
    document.getElementById('search-bar').style.animation='SearchAnim 1000ms ease-in-out forwards'
    document.getElementById('explore-search-container').click()
    setTimeout(()=>{
        document.getElementById('search-bar').addEventListener('click',()=>{
            document.getElementById('search-bar').style.animation='SearchAnimReverse 600ms ease-in-out forwards reverse'
        },{once:true})
    },100)
}

function search(){
    let url
    let t
    let value=document.getElementById('search-bar-input').value
    if (value.includes('https://')){
        if (value.includes('@')){
            value=ExtractChannelFromURI(value)
            url=`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,id,contentDetails,status&forHandle=${value}&maxResults=50&access_token=${ACCESS_TOKEN}`
            t='c'
        }else if(value.includes('https://www.youtube.com/channel')){
            value=ExtractChannelFromURI(value)
            url=`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,id,contentDetails,status&id=${value}&maxResults=50&access_token=${ACCESS_TOKEN}`
            t='c'
        }else if(value.includes('https://www.youtube.com/user') || value.includes('https://www.youtube.com/c')){
            value='@'+ExtractChannelFromURI(value)
            url=`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,id,contentDetails,status&forHandle=${value}&maxResults=50&access_token=${ACCESS_TOKEN}`
            t='c'
        }else{
            up=new URLSearchParams(new URL(value).search)
            if (ExtractVideoFromURI(value)===null && up.get('list')){
                value=up.get('list')
                t='l'
            } else {
                value=ExtractVideoFromURI(value)
                t='v'
            }
        }
        
    }else{
        if (value.includes('@')){
            url=`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,id,contentDetails,status&forHandle=${value}&maxResults=50&access_token=${ACCESS_TOKEN}`
            t='c'
        }else{
            if (value.slice(0,2)==='UC'){
                url=`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,id,contentDetails,status&id=${value}&maxResults=50&access_token=${ACCESS_TOKEN}`
                t='c'
            }else if(value.slice(0,2)==='PL' || value.length>=24){
                t='l'
            }else{
                t='v'
            }
        }
    }

    if (t==='c'){
        SearchAnim()
        fetch(url).then(res => res.json()).then(res => {
            if (res['items'].length>0){
                urlParams.set('channel',res['items'][0]['id'])
                urlParams.set('mine','false')
                urlParams.delete('explore',urlParams.get('explore'))
                urlParams.delete('list',urlParams.get('list'))
                open(location.href.replace(location.search,'')+'?'+urlParams.toString(),'_self')
            }
        }).catch(refresh)
    }
    else if (t==='l'){
        SearchAnim()
        urlParams.set('list',value)
        urlParams.set('mine','false')
        urlParams.delete('explore',urlParams.get('explore'))
        urlParams.delete('channel',urlParams.get('channel'))
        open(location.href.replace(location.search,'')+'?'+urlParams.toString(),'_self')
    }

    else if (t==='v'){
        SearchAnim()
        console.log(value)
    }

}

function ResetChannelNav(){
    document.getElementById('div-playlists').style.display='none'
    document.getElementById('div-videos').style.display='none'
    document.getElementById('div-shorts').style.display='none'
    document.getElementById('btn-channel-l').setAttribute('select','false')
    document.getElementById('btn-channel-v').setAttribute('select','false')
    document.getElementById('btn-channel-s').setAttribute('select','false')
}

document.getElementById('btn-channel-l').addEventListener('click',()=>{
    ResetChannelNav()
    document.getElementById('div-playlists').style.display='flex'
    document.getElementById('btn-channel-l').setAttribute('select','true')
})

document.getElementById('btn-channel-v').addEventListener('click',()=>{
    ResetChannelNav()
    document.getElementById('div-videos').style.display='flex'
    document.getElementById('btn-channel-v').setAttribute('select','true')
    
    let playlistid
    if (urlParams.get('mine')!==true && urlParams.get('channel')){
        playlistid='UULF'+urlParams.get('channel').slice(2)
    }else{
        playlistid='UULF'+channelId
    }
    fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet,status,contentDetails&maxResults=500&playlistId=${playlistid}&access_token=${ACCESS_TOKEN}`).then(res => res.json()).then(res => {
        ShowChannelUploads(res,'Videos')
    }).catch(refresh)
})

document.getElementById('btn-channel-s').addEventListener('click',()=>{
    ResetChannelNav()
    document.getElementById('div-shorts').style.display='flex'
    document.getElementById('btn-channel-s').setAttribute('select','true')

    let playlistid
    if (urlParams.get('mine')!==true && urlParams.get('channel')){
        playlistid='UUSH'+urlParams.get('channel').slice(2)
    }else{
        playlistid='UUSH'+channelId
    }
    

    fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet,status,contentDetails&maxResults=500&playlistId=${playlistid}&access_token=${ACCESS_TOKEN}`).then(res => res.json()).then(res => {
        ShowChannelUploads(res,'Shorts')
    }).catch(refresh)
})



function ShowChannelUploads(json,type){
    if (json['items']){
        console.log(json)
        db=json
        for (let i in json['items']){
            if (json['items'][i]['status']['privacyStatus']==='public'){
                let j=json['items'][i]
                let id=j['snippet']['resourceId']['videoId']
                let title=j['snippet']['title']
                let author=j['snippet']['videoOwnerChannelTitle']
                if (author.includes(' - Topic')){
                    let arr=j['snippet']['description'].match(/[^\n]+/g)[1].split(" · ") 
                    title=arr.splice(0,1)[0]
                    if (arr.length>1){
                        last=arr.splice(-1,1)[0]
                        author=arr.join(', ')+' et '+last
                    }else{
                        author=arr.splice(-1,1)[0]
                    }
                }

                playlistIds.push(id)
                playlistSongs.push([id,title,author])
                playlistSongsInfo[id]=[title,author]
            }
        }
        currentPlaylist=playlistIds

        let html=''

        document.getElementById('playlist-title-items').innerText=type

        for (let i in json['items']){
            let j=json['items'][i]
            if (j['status']['privacyStatus']==='public'){
                let url=j['snippet']['thumbnails']['medium']['url']
                try{
                    url=j['snippet']['thumbnails']['maxres']['url']
                }catch{

                }
                let square='false'
                let title=j['snippet']['title']
                let author=j['snippet']['videoOwnerChannelTitle']
                if (author.includes(' - Topic')){
                    let arr=j['snippet']['description'].match(/[^\n]+/g)[1].split(" · ") 
                    title=arr.splice(0,1)[0]
                    if (arr.length>1){
                        last=arr.splice(-1,1)[0]
                        author=arr.join(', ')+' et '+last
                    }else{
                        author=arr.splice(-1,1)[0]
                    }
                    square='true'
                }
            
                html+=`
                    <yt-playlist-item text-author="${author}" text-title="${title}" img='${url}' id='${i}' square='${square}' ytid='${j['snippet']['resourceId']['videoId']}'></yt-playlist-item>
                `
            }
        }

        document.getElementById('div-'+type.toLowerCase()).innerHTML=html
    }

}


function loopIconUpdate(v){
    loop=v

    if (loop){
        document.getElementById('mp-btn-loop').innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" color="white"${svgs['ic-loop2'][iconIndex]}</svg>`
    }else{
        document.getElementById('mp-btn-loop').innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" color="white"${svgs['ic-loop'][iconIndex]}</svg>`
    }
}



function shuffle(array,rng){
    a=array.slice()
    for (let i = a.length - 1; i > 0; i--){
        const j = Math.floor(rng() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a
}

function randomIconUpdate(v){
    randomize=v

    if (randomize){
        document.getElementById('mp-btn-random').innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" color="white" width="25px" height="25px"${svgs['ic-random2'][iconIndex]}</svg>`
        currentPlaylist=[playlistIds[indexMusic]].concat(shuffle(playlistIds.filter(item => item !== playlistIds[indexMusic]),new Math.seedrandom(CryptoJS.SHA3(String(Date.now())).toString().slice(0,15))))
        indexMusic=currentPlaylist.indexOf(player.embed.getVideoData()['video_id'])
    }else{
        document.getElementById('mp-btn-random').innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" color="white" width="25px" height="25px"${svgs['ic-random'][iconIndex]}</svg>`
        currentPlaylist=playlistIds
        indexMusic=currentPlaylist.indexOf(player.embed.getVideoData()['video_id'])
    }
}