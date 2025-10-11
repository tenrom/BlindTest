
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
        showNotificationWithButtons('Video Started', 'Click a button to control the video.');
    })

    player.once('ended',()=>{
        console.log('end')
        indexMusic++
        Load(playlistIds[indexMusic])
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



document.getElementById('btn-play').addEventListener('click',()=>{
    player.embed.setVolume(100) 
    document.getElementsByClassName('plyr__control')[0].click()
})


// Check if the browser supports notifications

// Request permission to show notifications
if (Notification.permission !== 'granted') {
    Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
            console.log('Notification permission granted');
        }
    });
}


// Function to show notification with buttons
function showNotificationWithButtons(title, body) {
    if (Notification.permission === 'granted') {
        const notification = new Notification(title, {
            body: body,
            icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZjAwIiBkPSJtMTAuMjc1IDE2bDUuNTc1LTMuNTc1cS4yMjUtLjE1LjIyNS0uNDI1dC0uMjI1LS40MjVMMTAuMjc1IDhxLS4yNS0uMTc1LS41MTMtLjAyNXQtLjI2Mi40NXY3LjE1cTAgLjMuMjYzLjQ1dC41MTItLjAyNU00IDIwcS0uODI1IDAtMS40MTItLjU4N1QyIDE4VjZxMC0uODI1LjU4OC0xLjQxMlQ0IDRoMTZxLjgyNSAwIDEuNDEzLjU4OFQyMiA2djEycTAgLjgyNS0uNTg3IDEuNDEzVDIwIDIweiIvPjwvc3ZnPg==', // Optional icon
            actions: [
                {
                    action: 'play-video',
                    title: 'Play Video'
                },
                {
                    action: 'pause-video',
                    title: 'Pause Video'
                }
            ]
        });

        // Handle button actions when clicked
        notification.addEventListener('notificationclick', function(event) {
            if (event.action === 'play-video') {
                player.play();
            } else if (event.action === 'pause-video') {
                player.pause();
            }
        })
    }
}

