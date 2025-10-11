
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

player.on('ended',(e)=>{
    console.log('end')
    indexMusic++
    Load(playlistIds[indexMusic])
})

document.getElementById('btn-play').addEventListener('click',()=>{
    player.embed.setVolume(100) 
    document.getElementsByClassName('plyr__control')[0].click()
})

