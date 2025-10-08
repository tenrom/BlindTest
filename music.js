
function Load(id){
    player.embed.loadVideoById(id) 
}

function checkVideoData(n) {
    const videoData = player.embed.getVideoData()
    if (videoData.author) {
        document.getElementsByClassName('plyr__control')[1].click()
    } else {
        if (n===20){
            return 0
        }
        setTimeout(()=>{checkVideoData(n+1)}, 500)
    }
}

/////////////////////////////////////////////////////////
// Configure video
/////////////////////////////////////////////////////////

// Create player
let ytid='KGM_2z4GW-8'
let adspassed=false

document.getElementById('player').setAttribute('data-plyr-embed-id',ytid)
const player = new Plyr('#player',{
    muted:false,
    autoplay:false,
    youtube: {
            modestbranding: 1,  // Removes YouTube branding from the player
            rel: 0,              // Prevents showing related videos at the end
    }
});

window.player = player


// Add events
player.on('ready', () => {
    player.restart()
    checkVideoData(0)
})

player.on('statechange',(e)=>{
    if (e.detail.code===1 && !adspassed){
        //Video is loaded
        console.log('Video loaded')

        

        adspassed=true
    }   
}) 

player.on('ended',(e)=>{
    console.log('end')
})

document.getElementById('btn-play').addEventListener('click',()=>{
    
    document.getElementsByClassName('plyr__control')[1].click()
    player.embed.setVolume(100) 
    document.getElementsByClassName('plyr__control')[0].click()
})

