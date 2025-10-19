
let db
let playlistIds=[]

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

    for (let i=0;i<document.getElementsByClassName('playlist-texts-title').length;i++){
        document.getElementsByClassName('playlist-texts-title')[i].style.width=document.body.clientWidth-24-document.getElementsByClassName('playlist-texts-title')[i].offsetLeft+'px'
    }

    if (document.getElementById('mp-img').clientHeight*16/9>document.getElementById('mp-img').clientWidth){
        document.getElementById('mp-img').style.width=document.getElementById('mp-img').clientHeight+'px'
        document.getElementById('mp-img').style.alignSelf='center'
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
        CLIENT_SECRET='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'

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

        this.addEventListener('click',()=>{
            if (playlistIds[indexMusic]==this.getAttribute('ytid')){
                document.getElementById('mp').show()
            }else{
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
        })
    }else{
        fetch(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelid}&maxResults=50&key=${ACCESS_TOKEN}`).then(res => res.json()).then(res => {
            after(res)
        })
    }
}

function getPlaylistItems(playlistid,mine=false,after){
    if (mine){
        fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet,status&maxResults=500&playlistId=${playlistid}&access_token=${ACCESS_TOKEN}`).then(res => res.json()).then(res => {
            after(res)
        })
    }else{
        fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet,status&maxResults=500&playlistId=${playlistid}&key=${ACCESS_TOKEN}`).then(res => res.json()).then(res => {
            after(res)
        })
    }
}


function ShowPlaylist(json){
    console.log(json)
    db=json
    for (let i in json['items']){
        playlistIds.push(json['items'][i]['snippet']['resourceId']['videoId'])
    }

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
            <yt-playlist-item text-author="${j['snippet']['videoOwnerChannelTitle']}" text-title="${j['snippet']['title']}" img='${url}' id='${i}' square='${'true'}' ytid='${j['snippet']['resourceId']['videoId']}'></yt-playlist-item>
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
        fetch(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=500&id=${json['items'][0]['snippet']['playlistId']}&key=${ACCESS_TOKEN}`).then(res => res.json()).then(res => {
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
        fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${json['items'][0]['snippet']['channelId']}&key=${ACCESS_TOKEN}`).then(res => res.json()).then(res => {
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
        console.log(spline(ti/duration)*100)
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
        this.style.transform='translateY('+a*100+'%)'
        let opa=1-(a*4)
        for (let i=0;i< document.getElementById('mp-container').children.length;i++){
            document.getElementById('mp-container').children[i].style.opacity=opa
            if (i!==0){
                document.getElementById('mp-container').children[i].style.transform='translateY(-'+a*250+'px)'
            }
        }
        
        let scale=(1-a)*(40/document.getElementById('mp-img').clientHeight+1)
        scale=Math.max(Math.min(scale,1),0)
        document.getElementById('mp-img').style.transform='translateY(-'+a*64+'px) scale('+scale+')'
        document.getElementById('mp-img').style.opacity=1

        if (a===1){
            this.style.display='none'
            document.body.style.overflow=''
        }else{
            this.style.display='block'
            document.body.style.overflow='hidden'
        }

        if (a===0 && reverse){
            document.getElementById('mp').style.pointerEvents=''
        }
    }
    show(){
        
        document.body.style.overflow='hidden'
        this.style.display='block'
        this.startAnim(duration,true,0)
        this.style.pointerEvents=''
        
        let json=db['items'][indexMusic]
        console.log(document.getElementsByTagName('yt-playlist-item')[indexMusic])
        document.getElementById('mp-img').style.backgroundImage=`url('${document.getElementsByTagName('yt-playlist-item')[indexMusic].getAttribute('img')}')`
        
        setTimeout(()=>{document.getElementById('mp-img').style.width=document.getElementById('mp-img').clientHeight+'px'},10)
        
        
        document.getElementById('mp-text-title').innerText=document.getElementsByTagName('yt-playlist-item')[indexMusic].getAttribute('text-title')
        document.getElementById('mp-text-author').innerText=document.getElementsByTagName('yt-playlist-item')[indexMusic].getAttribute('text-author')

        document.getElementById('mp-text-time').innerText=formatTime(player.duration)

        if (document.getElementsByClassName('plyr__control')[0].getAttribute('aria-label')==='Pause'){
            document.getElementById('mp-btn-play').children[0].style.display='none'
            document.getElementById('mp-btn-play').children[1].style.display='block'
        }else{
            document.getElementById('mp-btn-play').children[0].style.display='block'
            document.getElementById('mp-btn-play').children[1].style.display='none'
        }

        document.getElementById('mp-text-playlist').innerText=document.getElementById('playlist-title-items').innerText
    }
    hide(){
        document.body.style.overflow=''
        this.startAnim(duration,false,0)
        this.style.pointerEvents='none'
        setTimeout(() => {
            this.style.display='none'
        }, duration);
        
    }
    connectedCallback(){
        this.classList.add('mp')

        this.innerHTML=`
        <canvas class="mp-canvas" id="mp-canvas"></canvas>

        <div class="mp-container" id="mp-container">
            <svg onclick="document.getElementById('mp').hide()" style="color:white;scale:1.3; transform:translateY(-15px);flex-shrink:0;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 10l5 5l5-5"/></svg>
            <div class="mp-img" id="mp-img"></div>
            <div class='mp-box'>
                <h2 class='mp-text-title' id="mp-text-title"></h2>
                <h2 class='mp-text-author' id="mp-text-author"></h2>
            </div>
            <div class='mp-btn-box'>
                <div class='mp-btn' id="mp-btn-before">
                    <svg xmlns="http://www.w3.org/2000/svg" style="transform:rotate(180deg);width:40px;" color="white" viewBox="0 0 24 24"><path fill="currentColor" d="M16 18h2V6h-2M6 18l8.5-6L6 6z"/></svg>
                </div>
                <div class='mp-btn-center' id="mp-btn-play">
                    <svg xmlns="http://www.w3.org/2000/svg" style="width:40px;" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5.14v14l11-7z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" style="width:40px;display:none;" viewBox="0 0 24 24"><path fill="currentColor" d="M14 19h4V5h-4M6 19h4V5H6z"/></svg>
                </div>
                <div class='mp-btn' id="mp-btn-after"'>
                    <svg xmlns="http://www.w3.org/2000/svg" style="width:40px;" color="white" viewBox="0 0 24 24"><path fill="currentColor" d="M16 18h2V6h-2M6 18l8.5-6L6 6z"/></svg>
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

        document.getElementById('mp-btn-before').addEventListener('click',()=>{
            indexMusic--
            Load(playlistIds[indexMusic%playlistIds.length])
        })

        document.getElementById('mp-btn-play').addEventListener('click',()=>{
            if (document.getElementsByClassName('plyr__control')[0].getAttribute('aria-label')==='Play'){
                document.getElementById('mp-btn-play').children[0].style.display='none'
                document.getElementById('mp-btn-play').children[1].style.display='block'
            }else{
                document.getElementById('mp-btn-play').children[0].style.display='block'
                document.getElementById('mp-btn-play').children[1].style.display='none'
            }

            player.embed.setVolume(100)
            document.getElementsByClassName('plyr__control')[0].click()
            
        })

        document.getElementById('mp-btn-after').addEventListener('click',()=>{
            indexMusic++
            Load(playlistIds[indexMusic%playlistIds.length])
        })
        
        
        
        document.getElementById('mp-slider-box').addEventListener('mousedown',(e)=>{
            isclicking=true
            isSliding=true
            sliderValue=(e.clientX-document.getElementById('mp-slider').offsetLeft)/document.getElementById('mp-slider').clientWidth * player.duration
            sliderValue=Math.max(Math.min(sliderValue,player.duration),0)
            document.getElementById('mp-slider-bar').style.transform = 'scaleX('+(sliderValue / player.duration) * 100+'%)'
            document.getElementById('mp-text-ctime').innerText = formatTime(sliderValue)
        })
        document.getElementById('mp-slider-box').addEventListener('touchstart',(e)=>{
            isclicking=true
            isSliding=true
            sliderValue=(e.changedTouches[0].clientX-document.getElementById('mp-slider').offsetLeft)/document.getElementById('mp-slider').clientWidth * player.duration
            sliderValue=Math.max(Math.min(sliderValue,player.duration),0)
            document.getElementById('mp-slider-bar').style.transform = 'scaleX('+(sliderValue / player.duration) * 100+'%)'
            document.getElementById('mp-text-ctime').innerText = formatTime(sliderValue)
            document.getElementById('mp-text-time').style.color = 'white'
            document.getElementById('mp-text-ctime').style.color = 'white'
            document.getElementById('mp-slider').style.height = '9px'
        })

        document.getElementById('mp').addEventListener('mousedown',(e)=>{
            if (!isclicking){
                isclickingMp=true
                offsetXMp=e.clientY
                valueXMp=(e.clientY-offsetXMp)/document.getElementById('mp').clientHeight
                valueXMp=Math.max(Math.min(valueXMp,1),0)
                console.log(valueXMp)
            }
        })

        document.getElementById('mp').addEventListener('touchstart',(e)=>{
            if (!isclicking){
                isclickingMp=true
                offsetXMp=e.changedTouches[0].clientY
                valueXMp=(e.changedTouches[0].clientY-offsetXMp)/document.getElementById('mp').clientHeight
                valueXMp=Math.max(Math.min(valueXMp,1),0)
                console.log(valueXMp)
            }
        })
    }
}


window.customElements.define('yt-music-player',musicPlayer)

document.addEventListener('mousemove',(e)=>{
    if (isclicking){
        sliderValue=(e.clientX-document.getElementById('mp-slider').offsetLeft)/document.getElementById('mp-slider').clientWidth * player.duration
        sliderValue=Math.max(Math.min(sliderValue,player.duration),0)
        document.getElementById('mp-slider-bar').style.transform = 'scaleX('+(sliderValue / player.duration) * 100+'%)'
        document.getElementById('mp-text-ctime').innerText = formatTime(sliderValue)
    }else{
        if (isclickingMp){
            valueXMp=(e.clientY-offsetXMp)/document.getElementById('mp').clientHeight
            valueXMp=Math.max(Math.min(valueXMp,1),0)
            console.log(valueXMp)

            document.getElementById('mp').animState(valueXMp)
        }
    }
})

document.addEventListener('mouseup',(e)=>{
    if (isclicking){
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
})

document.addEventListener('touchmove',(e)=>{
    if (isclicking){
        sliderValue=(e.changedTouches[0].clientX-document.getElementById('mp-slider').offsetLeft)/document.getElementById('mp-slider').clientWidth * player.duration
        sliderValue=Math.max(Math.min(sliderValue,player.duration),0)
        document.getElementById('mp-slider-bar').style.transform = 'scaleX('+(sliderValue / player.duration) * 100+'%)'
        document.getElementById('mp-text-ctime').innerText = formatTime(sliderValue)
    }else{
        if (isclickingMp){
            valueXMp=(e.changedTouches[0].clientY-offsetXMp)/document.getElementById('mp').clientHeight
            valueXMp=Math.max(Math.min(valueXMp,1),0)
            console.log(valueXMp)

            document.getElementById('mp').animState(valueXMp)
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
})
