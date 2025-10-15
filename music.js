
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

        indexMusic=playlistIds.indexOf(id)
    })

    player.once('ended',()=>{
        console.log('end')
        indexMusic++
        Load(playlistIds[indexMusic%playlistIds.length])
        if (document.getElementById('mp').style.display!=='none'){
              document.getElementById('mp').show()
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
            controls:1,
            showinfo: 0
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

player.on('timeupdate', () => {
    document.getElementById('mp-slider-bar').style.transform = 'scaleX('+(player.currentTime / player.duration) * 100+'%)'
    document.getElementById('mp-text-ctime').innerText = formatTime(player.currentTime)
})

//player.on('paused',()=>{
//    player.play()
//    navigator.mediaSession.playbackState = 'playing'; 
//})



document.getElementById('btn-play').addEventListener('click',()=>{
    player.embed.setVolume(100) 
    document.getElementsByClassName('plyr__control')[0].click()

    // updateMediaSessionMetadata();
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

