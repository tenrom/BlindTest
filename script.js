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
}else{
    urlParams = new URLSearchParams('')
}

fetch('client_secret.json')
    .then(res => res.json())
    .then(res => {
        
        CLIENT_ID=res["web"]["client_id"]
        CLIENT_SECRET=res['web']['client_secret']
        // CLIENT_SECRET=''

        TOKEN_URI=res["web"]["token_uri"]
        AUTH_URI=res["web"]["auth_uri"]
        REDIRECT_URI=res['web']['redirect_uris']

        SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

        initialization()
    }).catch(error => console.log(error))




function authenticate() {
    open(`${AUTH_URI}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPES}&access_type=offline&prompt=consent`,"_self")
}

function exchangeCodeForTokens(code,after) {
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

        REFRESH_TOKEN=tokenData.refresh_token
        ACCESS_TOKEN=tokenData.access_token

        after()
        // You would typically save the access and refresh tokens to a database here
        // and then send the access token to the client-side for API calls.
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch or in the .then() blocks
        console.error('Error during token exchange:', error);

        
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
        }
    }
}

window.customElements.define('yt-playlist',ytPlaylist)
window.customElements.define('yt-playlist-item',ytPlaylistItem)
window.customElements.define('playlist-img',playlistImg)

function getPlaylists(channelid='',mine=false,after){
    if (mine){
        fetch(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&maxResults=50&access_token=${ACCESS_TOKEN}`).then(res => res.json()).then(res => {
            after(res)
        })
    }else{
        fetch(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelid}&maxResults=50&access_token=${ACCESS_TOKEN}`).then(res => res.json()).then(res => {
            after(res)
        })
    }
}

function getPlaylistItems(playlistid,mine=false,after){
    if (mine){
        fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=500&playlistId=${playlistid}&access_token=${ACCESS_TOKEN}`).then(res => res.json()).then(res => {
            after(res)
        })
    }else{
        fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=500&playlistId=${playlistid}&access_token=${ACCESS_TOKEN}`).then(res => res.json()).then(res => {
            after(res)
        })
    }
}


function ShowPlaylist(json){
    console.log(json)
    document.getElementById('playlist-container').style.display='flex'

    let html=''
    for (let i in json['items']){
        let j=json['items'][i]
        let url=j['snippet']['thumbnails']['medium']['url']
        try{
            url=j['snippet']['thumbnails']['maxres']['url']
        }catch{

        }

        html+=`
            <yt-playlist-item text-author="${j['snippet']['videoOwnerChannelTitle']}" text-title="${j['snippet']['title']}" img='${url}' id='${i}' square='${'true'}'></yt-playlist-item>
        `
    }

    document.getElementById('div-playlists-items').innerHTML+=html
    
    if (json['items'].length!==1 && json['items'][0]['snippet']['playlistId']!=='LL'){
        for (let i=0;i<4;i++){
            let index=i%json['items'].length
            let c
            if (json['items'].length===2){
                c=(i-i%json['items'].length)/json['items'].length
                index=(i%json['items'].length-1*c)*(1-2*c)
            }

            let j=json['items'][index]
            let url=j['snippet']['thumbnails']['medium']['url']
            try{
                url=j['snippet']['thumbnails']['maxres']['url']
            }catch{

            }

            document.getElementsByTagName('playlist-img')[0].setAttribute('img'+i,url)
        }


        document.getElementsByTagName('playlist-img')[0].CreateImg()
    }else{
        let url=json['items'][0]['snippet']['thumbnails']['medium']['url']
        try{
            url=json['items'][0]['snippet']['thumbnails']['maxres']['url']
        }catch{

        }

        if (json['items'][0]['snippet']['playlistId']==='LL'){
            url='https://www.gstatic.com/youtube/media/ytm/images/pbg/liked-music-@1200.png'
        }

        document.getElementsByTagName('playlist-img')[0].setAttribute('img0',url)
        document.getElementsByTagName('playlist-img')[0].Create1Img()
    }

    document.getElementById('btn-play').style.display='flex'

    
    document.getElementById('playlist-author-items').innerText=json['items'][0]['snippet']['channelTitle']
    if (json['items'][0]['snippet']['playlistId']==='LL'){
        document.getElementById('playlist-author-items').innerText='Playlist automatique'
    }

    if (urlParams.get('mine')){
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
    }else{
        fetch(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=500&id=${json['items'][0]['snippet']['playlistId']}&access-token=${ACCESS_TOKEN}`).then(res => res.json()).then(res => {
            document.getElementById('playlist-title-items').innerText=res['items'][0]['snippet']['title']
            document.getElementById('playlist-banner-title').innerText=res['items'][0]['snippet']['title']
            
        })
    }

    if (!urlParams.get('mine')){
        let p=document.getElementsByTagName('playlist-img')[0]
        let blur=p.cloneNode(true)
        blur.style.filter='blur(40px)'
        blur.style.transform='scale(2,2) translate(0,-33px)'
        blur.style.opacity='0.9'
        blur.style.position='absolute'
        blur.style.zIndex='-1'

        p.parentNode.insertBefore(blur,p)
    }
}

function ShowPlaylists(json){
    console.log(json)
    document.getElementById('playlists-container').style.display='flex'

    let html=''
    if (urlParams.get('mine')){
        if (urlParams.get('mine')==='true'){
            html+=`
                <yt-playlist text-author="Playlist automatique" text-title="Liked videos" img='https://www.gstatic.com/youtube/media/ytm/images/pbg/liked-music-@1200.png' listid='LL' square='${'true'}'></yt-playlist>
            `
        }
    }
    
    
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

    

    document.getElementById('div-playlists').innerHTML+=html

    document.getElementById('playlist-author').innerText=json['items'][0]['snippet']['channelTitle']

    if (urlParams.get('mine')){
        fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&mine=true&access_token=${ACCESS_TOKEN}`).then(res => res.json()).then(res => {
            console.log(res)
            document.getElementById('channel-img').src=res['items'][0]['snippet']['thumbnails']['high']['url']
            
        })
    }else{
        fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${json['items'][0]['snippet']['channelId']}&access-token=${ACCESS_TOKEN}`).then(res => res.json()).then(res => {
            console.log(res)
            document.getElementById('channel-img').src=res['items'][0]['snippet']['thumbnails']['high']['url']
            
        })
    }

}

function initialization(){
    if (urlParams.get('code')){
        CLIENT_SECRET=prompt('Password')
        exchangeCodeForTokens(urlParams.get('code'),()=>{
            urlParams.delete('code',urlParams.get('code'))
            urlParams.set('token',ACCESS_TOKEN)
            open(location.href.replace(location.search,'')+'?'+urlParams.toString(),'_self')
        })
    }else{
        if (!urlParams.get('token')){
            document.getElementById('btn-signin').style.display='block'
        }
    }
    if (urlParams.get('token')){
        ACCESS_TOKEN=urlParams.get('token')
    }
    if (urlParams.get('mine')){
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
                })
            }else{
                getPlaylistItems(urlParams.get('list'),false,ShowPlaylist)
            }
        }
        if (urlParams.get('channel')){
            getPlaylists(channelid=urlParams.get('channel'),false,ShowPlaylists)
        }
    }
}


function Back(){
    urlParams.delete('list',urlParams.get('list'))
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


