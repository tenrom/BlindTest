let stateObj = { id: "100" };

function LoadIndexUrl(){
    indexMusic=Number(new URLSearchParams(window.location.search).get("indexMusic"))
}

function UpdateIndexUrl(){
    let up=new URLSearchParams(window.location.search)
    up.set("indexMusic",indexMusic)
    window.history.replaceState(stateObj,location.pathname+location.search,location.pathname+"?"+up.toString())
}

function AddIndexMusic(){
    console.log('Before +',indexMusic)
    LoadIndexUrl()
    indexMusic+=1
    indexMusic=clamp(indexMusic,0,currentPlaylist.length-1)
    UpdateIndexUrl()
    console.log('After +',indexMusic)
}
function SubIndexMusic(){
    console.log('Before -',indexMusic)
    LoadIndexUrl()
    indexMusic-=1
    indexMusic=clamp(indexMusic,0,currentPlaylist.length-1)
    UpdateIndexUrl()
    console.log('After -',indexMusic)
}

function Load(id){
    player.source = {
        type: 'video',
        sources: [{
            src: id,
            provider: 'youtube'
        }]
    };

    player.once('ready',()=>{
        player.embed.setVolume(100) 
        document.getElementsByClassName('plyr__control')[0].click()

        document.getElementById('mp').show()

        setTimeout(()=>{
            justchange=false
        },100)
    })

    player.once('ended',()=>{
        console.log('end')
        if (id===currentPlaylist[indexMusic]){
            if (!loop){
                AddIndexMusic()
                justchange=true
                Load(currentPlaylist[indexMusic])
            }else{
                justchange=true
                Load(id)
            }
        }else{
            console.log('end catch')
        }
        
    })
}

let indexMusic

/////////////////////////////////////////////////////////
// Configure video
/////////////////////////////////////////////////////////

// Create player
let ytid='KGM_2z4GW-8'
let adspassed=false

document.getElementById('player').setAttribute('data-plyr-embed-id',ytid)
let player = new Plyr('#player',{
    muted:false,
    autoplay:false,
    youtube: {
            modestbranding: 1,  // Removes YouTube branding from the player
            rel: 0,              // Prevents showing related videos at the end
            controls:0,
            showinfo: 0,
            hl:'fr',
            persist_hl:1
    },
    fullscreen: { 
        enabled: false, 
    }
});

window.player = player

player.on('statechange',(e)=>{
    if (e.detail.code===1 && !adspassed){
        //Video is loaded
        console.log('Video loaded')
        
        adspassed=true
    }   
}) 

function formatTime(t){
    t=Math.round(t)
    let h=Math.floor(t/60/60)
    let m=Math.floor(t/60%60)
    let s=t%60
    return (h===0?'':(String(h).length===1?'0'+h:h)+":")+(String(m).length===1?'0'+m:m)+":"+(String(s).length===1?'0'+s:s)
}

function parseLyrics(lyrics) {
    const lines = lyrics.trim().split("\n")

    return lines.map(line => {
        const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/)
        if (!match) return null

        const minutes = parseInt(match[1])
        const seconds = parseFloat(match[2])
        const time = minutes * 60 + seconds

        return {
        time: time,
        text: match[3].trim()
        }
    }).filter(Boolean)
}

function getLastNewRowLyrics(lrc,time){
    if (lrc){
        for (let i in lrc){
            if (lrc[i].time>time){
                try{
                    lrc[i-1].text
                    return i-1
                }catch{
                    return null
                }
            }
        }
        return lrc.length-1
    }
}

class LyricsRow extends HTMLElement{
    constructor(){
        super()
    }
    connectedCallback(){
        this.style=`
        width: 100%;
        height: 100%;
        `

        this.innerHTML=`
        <div class="lrc-item-div">
            <h2 class="lrc-item-text">${currentLyrics[this.getAttribute('index')].text!=="" ?currentLyrics[this.getAttribute('index')].text:"♪"}</h2>
        </div>
        `

        this.addEventListener('click',()=>{
            player.embed.seekTo(currentLyrics[this.getAttribute('index')].time)
        })
    }
}

window.customElements.define('lrc-item',LyricsRow)

class LyricsPanel extends HTMLElement{
    constructor(){
        super()
    }  
    updateLrc(i){
        let row=this.getElementsByClassName('lrc-list')[0].getElementsByClassName('lrc-item-text')
        for (let index in currentLyrics){
            if (Number(index)===i){
                row[index].style.opacity=1
            }else{
                row[index].style.opacity=0.3
            }
        }

        try{
            this.getElementsByClassName('lrc-list')[0].scrollTo({behavior: "smooth",left:0,top:this.getElementsByClassName('lrc-list')[0].getElementsByTagName('lrc-item')[i].offsetTop-Math.round(this.getElementsByClassName('lrc-list')[0].offsetHeight/2)+Math.round(this.getElementsByClassName('lrc-list')[0].getElementsByTagName('lrc-item')[i].offsetHeight/2)})
        }catch{}
    }
    show(){
        this.style.display="flex"
        document.body.style.overflow='hidden'
        bodyOverflow='hidden'
        
        document.getElementsByClassName('lrc-spinner')[0].style.display="flex"
        document.getElementsByClassName('lrc-notFound')[0].style.display="none"

        this.getElementsByClassName('lrc-list')[0].innerHTML=""

        for (let i in db.items){
            if (db.items[i].snippet.resourceId.videoId==currentPlaylist[indexMusic]){
                let j=db.items[i]
                let after=(res)=>{
                    document.getElementsByClassName('lrc-spinner')[0].style.display="none"
                    currentLyrics=parseLyrics("[00:00.00]  \n"+res.syncedLyrics)

                    for (let i in currentLyrics){
                        this.getElementsByClassName('lrc-list')[0].innerHTML+=`
                        <lrc-item index="${i}"></lrc-item>
                        `
                    }
                }
                fetch(`https://lrclib.net/api/get?artist_name=${j.snippet.videoOwnerChannelTitle.replace(' - Topic','')}&track_name=${j.snippet.title}&album_name=${j.snippet.description.match(/[^\n]+/g)[2]}&duration=${player.duration}`).then(res => res.json()).then((res)=>{
                    console.log(res.syncedLyrics)
                    if (res.syncedLyrics){
                        after(res)
                    }else{
                        fetch(`https://lrclib.net/api/get?artist_name=${j.snippet.videoOwnerChannelTitle.replace(' - Topic','')}&track_name=${j.snippet.title}`).then(res => res.json()).then((res)=>{
                            console.log(res.syncedLyrics)
                            if (res.syncedLyrics){
                                after(res)
                            }else{
                                document.getElementsByClassName('lrc-notFound')[0].style.display="flex"
                                document.getElementsByClassName('lrc-spinner')[0].style.display="none"
                            }
                        })
                    }
                })

                let url=j['snippet']['thumbnails']['medium']['url']
                try{
                    url=j['snippet']['thumbnails']['maxres']['url']
                }catch{

                }

                this.getElementsByClassName('lrc-background')[0].style.backgroundImage=`url(${url})`
                document.getElementById('lrc-title').innerText="Lyrics of "+playlistSongsInfo[j.snippet.resourceId.videoId][0]
            }
        }
    }
    hide(){
        this.style.display="none"
        document.body.style.overflow='visible'
        bodyOverflow='visible'  
    }
    connectedCallback(){
        this.style=`
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index:3;
        display:none;
        `

        this.innerHTML=`
        <div class="lrc-div">
            <div class="lrc-background"></div>
            <div style="width:100%;height:100%;position:absolute;top:0;background-color: rgba(0, 0, 0, 0.4);"></div>
            <div class="lrc-content">
                <div class="lrc-banner">
                    <h2 class="lrc-title" id="lrc-title"></h2>
                    <svg xmlns="http://www.w3.org/2000/svg" id="lrc-cross" style="cursor:pointer;display: flex;color:white;justify-content:center;" width="26px" height="26px" viewBox="0 0 24 24"><path fill="currentColor" d="M17.293 5.293 12 10.586 6.707 5.293a1 1 0 10-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 001.414 1.414L12 13.414l5.293 5.293a1 1 0 001.414-1.414L13.414 12l5.293-5.293a1 1 0 10-1.414-1.414Z"></path></svg>
                </div>
                <div class="lrc-spinner"><icon-spinner></icon-spinner></div>
                <div class="lrc-notFound" style="display:none;"><h2>No lyrics found...</h2></div>
                <div class="lrc-list"></div>
            </div>
        </div>
        `

        document.getElementById('lrc-cross').addEventListener('click',()=>{
            this.hide()
        })

    }
}

window.customElements.define('lrc-',LyricsPanel)

player.on('timeupdate', () => {
    if (!isSliding){
        document.getElementById('mp-slider-bar').style.transform = 'scaleX('+(player.currentTime / player.duration) * 100+'%)'
        document.getElementById('mp-text-ctime').innerText = formatTime(player.currentTime)
    }

    document.getElementById('lrc').updateLrc(getLastNewRowLyrics(currentLyrics,player.currentTime))
})



//player.on('paused',()=>{
//    player.play()
//    navigator.mediaSession.playbackState = 'playing'; 
//})


document.getElementById('btn-play').addEventListener('click',()=>{
    document.getElementById('bt').show()
})



// let currentTime
// if ('mediaSession' in navigator) {

//     function updateMediaSessionMetadata(){
//         if ('mediaSession' in navigator) {
//             navigator.mediaSession.metadata = new MediaMetadata({
//                 title: 'Sample Video',
//                 artist: 'W3Schools',
//                 album: 'HTML5 Media',
//                 artwork: [
//                     {
//                         src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZjAwIiBkPSJtMTAuMjc1IDE2bDUuNTc1LTMuNTc1cS4yMjUtLjE1LjIyNS0uNDI1dC0uMjI1LS40MjVMMTAuMjc1IDhxLS4yNS0uMTc1LS41MTMtLjAyNXQtLjI2Mi40NXY3LjE1cTAgLjMuMjYzLjQ1dC41MTItLjAyNU00IDIwcS0uODI1IDAtMS40MTItLjU4N1QyIDE4VjZxMC0uODI1LjU4OC0xLjQxMlQ0IDRoMTZxLjgyNSAwIDEuNDEzLjU4OFQyMiA2djEycTAgLjgyNS0uNTg3IDEuNDEzVDIwIDIweiIvPjwvc3ZnPg==',
//                         sizes: '96x96',
//                         type: 'image/gif'
//                     }
//                 ]
//             });

//             navigator.mediaSession.setActionHandler('play', function () {
//                 player.play();
//                 console.log('Media Play');
//             });
//             navigator.mediaSession.setActionHandler('pause', function () {
//                 player.pause();
//                 console.log('Media Pause');
//             });
//             navigator.mediaSession.setActionHandler('seekbackward', function () {
//                 currentTime -= 10;
//                 console.log('Seek Backward');
//             });
//             navigator.mediaSession.setActionHandler('seekforward', function () {
//                 currentTime += 10;
//                 console.log('Seek Forward');
//             });
//         }
//     }
    

//     // Update metadata and handle actions when video is played
//     player.on('play', function () {
//         setTimeout(()=>{
//             updateMediaSessionMetadata();
//             navigator.mediaSession.playbackState = 'playing';    // Update playback state
//         },500)
//     });

//     // Update playback state when paused
//     player.on('pause', function () {
//         navigator.mediaSession.playbackState = 'paused';    // Update playback state
//     });

//     // Handle ended event (e.g., reset media session)
//     player.on('ended', function () {
//         navigator.mediaSession.playbackState = 'none';    // Reset playback state
//     });

// }

if ('mediaSession' in navigator) {
    // 1. Set the playback state to 'playing' or 'paused' to let the OS know
    // it should route media control events to your page.
    navigator.mediaSession.playbackState = 'playing';

    // 2. Define the action handlers
    try {
        navigator.mediaSession.setActionHandler('play', () => {
            // Logic for playing the audio/video
            console.log('▶️ Headset Play button pressed.');
            // Example: audioElement.play();
            navigator.mediaSession.playbackState = 'playing';
        });
    } catch (error) {
        console.log(`The play action is not supported: ${error}`);
    }

    try {
        navigator.mediaSession.setActionHandler('pause', () => {
            // Logic for pausing the audio/video
            console.log('⏸️ Headset Pause button pressed.');
            // Example: audioElement.pause();
            navigator.mediaSession.playbackState = 'paused';
        });
    } catch (error) {
        console.log(`The pause action is not supported: ${error}`);
    }

    try {
        navigator.mediaSession.setActionHandler('nexttrack', () => {
            // Logic for skipping to the next track/item
            console.log('⏭️ Headset Next Track button pressed (Double-click).');
            // Example: playNextTrack();
        });
    } catch (error) {
        console.log(`The nexttrack action is not supported: ${error}`);
    }
}


player.on('ready', () => {
    document.body.style.overflow =  bodyOverflow

})

