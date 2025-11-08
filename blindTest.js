class BlindTestButton extends HTMLElement{
    constructor(){
        super()
    }
    setAnswer(text){
        this.children[0].innerText=text
        this.children[0].style.backgroundColor=''
    }
    connectedCallback(){
        this.classList.add('bt-btn')

        this.innerHTML=`
        <div class="bt-btn-div" id="bt-btn-div"></div>
        `

        this.addEventListener('click',()=>{
            this.children[0].style.backgroundColor='#1DB954'
        })
    }
}

window.customElements.define('yt-bt-button',BlindTestButton)




let bt_t
let bt_duration=500
let bt_startAlpha
let bt_reverse
let bt_visible=false
let bt_player
let bt_playlist=[]
let bt_number_song=10
let bt_duration_song=10
let bt_title_song
let bt_author_song
let getRandomInt=(rng,min, max)=>{
    return Math.floor(rng() * (max - min + 1)) + min;
}

function bt_animate(){
    let time=performance.now()
    let ti=time-bt_t+(Inversespline(bt_startAlpha)*bt_startAlpha)

    if (ti<=bt_duration){
        
        let a=ti/bt_duration
        if (bt_reverse){a=1-a}
        document.getElementById('bt').animState(spline(a))
        requestAnimationFrame(bt_animate)
    }else{
        let a=1
        if (bt_reverse){a=1-a}
        document.getElementById('bt').animState(a)
    }
}

class BlindTest extends HTMLElement{
    constructor(){
        super()
    }
    startAnim(dura,re,a){
        bt_t=performance.now()
        bt_duration=dura
        bt_startAlpha=a
        bt_reverse=re
        bt_animate(bt_duration)
    }
    animState(a){

        this.style.translate='0px calc(100% - '+clamp(((1-a)*this.clientHeight),70,this.clientHeight)+'px)'
        let opa=1-(a*4)
        for (let i=0;i< document.getElementById('bt-container').children.length;i++){
            document.getElementById('bt-container').children[i].style.opacity=opa
            if (i!==0){
                document.getElementById('bt-container').children[i].style.transform='translateY(-'+a*250+'px)'
            }
        }

        document.getElementById('nav').style.transform='translateY('+(clamp(1-a-0.5)*document.getElementById('nav').clientHeight*4)+'px)'
        document.getElementById('mp').style.transform='translateY('+(clamp(1-a-0.5)*document.getElementById('nav').clientHeight*4)+'px)'

        if (a===1){
            document.body.style.overflow=''
            this.style.pointerEvents=''
            this.style.display='none'

            bt_visible=false
        }else{
            this.style.display='block'
            document.body.style.overflow='hidden'

            bt_visible=true
        }

        if (a===0 && reverse){
            document.getElementById('bt').style.pointerEvents=''
        }

        if (a===0){
            this.style.translate='0px 0px'
        }
    }
    SetAnswerAuthor(id,rng){
        let playlist=playlistSongs.map(e => e[2]);
        playlist=playlist.filter((value, index, self) => self.indexOf(value) === index);
        
        let answers=[playlistSongsInfo[id][1]]
        playlist.splice(playlist.indexOf(playlistSongsInfo[id][1]),1)
        for (let i=0;i<3;i++){
            answers.push(playlist.splice(getRandomInt(rng,0,playlist.length-1),1)[0])
        }

        document.getElementById('bt-answer1').setAnswer(answers.splice(getRandomInt(rng,0,answers.length-1),1)[0])
        document.getElementById('bt-answer2').setAnswer(answers.splice(getRandomInt(rng,0,answers.length-1),1)[0])
        document.getElementById('bt-answer3').setAnswer(answers.splice(getRandomInt(rng,0,answers.length-1),1)[0])
        document.getElementById('bt-answer4').setAnswer(answers.splice(getRandomInt(rng,0,answers.length-1),1)[0])
    }
    SetAnswerTitle(id,rng){
        let playlist=playlistSongs.map(e => e[1]);
        playlist=playlist.filter((value, index, self) => self.indexOf(value) === index);
        
        let answers=[playlistSongsInfo[id][0]]
        playlist.splice(playlist.indexOf(playlistSongsInfo[id][0]),1)
        for (let i=0;i<3;i++){
            answers.push(playlist.splice(getRandomInt(rng,0,playlist.length-1),1)[0])
        }

        document.getElementById('bt-answer1').setAnswer(answers.splice(getRandomInt(rng,0,answers.length-1),1)[0])
        document.getElementById('bt-answer2').setAnswer(answers.splice(getRandomInt(rng,0,answers.length-1),1)[0])
        document.getElementById('bt-answer3').setAnswer(answers.splice(getRandomInt(rng,0,answers.length-1),1)[0])
        document.getElementById('bt-answer4').setAnswer(answers.splice(getRandomInt(rng,0,answers.length-1),1)[0])
    }
    LoadSong(id,rng){
        bt_player.source = {
            type: 'video',
            sources: [{
                src: id,
                provider: 'youtube'
            }]
        };

        document.getElementById('countdownCircle').style.transition='none'
        document.getElementById('countdownCircle').style.strokeDashoffset='282.7px'
        document.getElementById('bt-question-counter').innerText='Question '+(bt_number_song-bt_playlist.length+1)+' of '+bt_number_song

        bt_player.once('ready',()=>{
            bt_player.embed.setVolume(100) 
            document.getElementsByClassName('plyr__control')[19].click()

            this.SetAnswerTitle(id,rng)
        })

        bt_player.once('play',()=>{
            document.getElementById('countdownCircle').style.transition='stroke-dashoffset '+bt_duration_song+'s linear'
            document.getElementById('countdownCircle').style.strokeDashoffset='0px'

            setTimeout(()=>{
                bt_playlist.splice(0,1)
                this.LoadSong(bt_playlist[0],rng)
            },bt_duration_song*1000)
        })
    }
    show(){
        document.body.style.overflow='hidden'
        this.style.display='block'
        this.startAnim(duration,true,0)
        this.style.pointerEvents=''
        
        document.getElementById('bt-img').style.backgroundImage=`url('${document.getElementsByTagName('yt-playlist-item')[0].getAttribute('img')}')`
        
        setTimeout(()=>{document.getElementById('bt-img').style.width=document.getElementById('bt-img').clientHeight+'px'},10)
        
        let title=document.getElementsByTagName('yt-playlist-item')[0].getAttribute('text-title')
        let author=document.getElementsByTagName('yt-playlist-item')[0].getAttribute('text-author')
        document.getElementById('bt-text-title').innerText=title
        document.getElementById('bt-text-author').innerText=author
        document.getElementById('bt-title').innerText='Blind Test: '+document.getElementById('playlist-title-items').innerText

        let next=()=>{
            document.getElementById('countdownCircle').style.transition='stroke-dashoffset '+bt_duration_song+'s linear'
            document.getElementById('countdownCircle').style.strokeDashoffset='282.7px'
            
            let seed='hello'
            let rng = new Math.seedrandom(seed)
            

            bt_playlist=[]
            let playlist=playlistIds
            for (let i=0;i<bt_number_song;i++){
                let index=getRandomInt(rng,0,playlist.length-1)
                bt_playlist.push(playlist.splice(index,1)[0])
            }
            console.log(bt_playlist)
            document.getElementsByClassName('plyr__control')[19].click()
            document.getElementById('bt').LoadSong(bt_playlist[0],rng) 
        }
        if (document.getElementById('bt-player')){
            document.getElementById('bt-player').setAttribute('data-plyr-embed-id','KGM_2z4GW-8')
            bt_player = new Plyr('#bt-player',{
                muted:false,
                autoplay:false,
                youtube: {
                        modestbranding: 1,  // Removes YouTube branding from the player
                        rel: 0,              // Prevents showing related videos at the end
                        controls:0,
                        showinfo: 0,
                        hl:'en',
                        persist_hl:1
                }
            });

            window.bt_player = bt_player

            bt_player.once('ready',()=>{
                console.log('Yes')
                next()
            })

            bt_player.on('timeupdate',()=>{
                document.getElementById('timerDisplay').innerHTML=Math.round(bt_duration_song-bt_player.currentTime)
            })
        }else{
            next()
        }

        
    }
    hide(){
        document.body.style.overflow=''
        this.startAnim(duration,false,0)
        this.style.pointerEvents='none'
    }
    connectedCallback(){
        this.classList.add('bt')

        this.innerHTML=`
        
        <canvas class="bt-canvas" id="bt-canvas"></canvas>
        
        <div class="bt-container" id="bt-container">
            <div class="bt-player-container" style="display: none;">
                <div id="bt-player" data-plyr-provider="youtube" data-plyr-embed-id=""></div>
            </div>
            <div class="bt-separator"></div>
            <div style="display:flex;width:100%;margin-top:16px;">
                <svg onclick="document.getElementById('bt').hide()" style="color:white;scale:1.3;padding:2px;z-index:3;width:24px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m11.25 4.75-6.5 6.5m0-6.5 6.5 6.5"/></svg>
                <div class="bt-info-text">CHOOSE THE ARTIST</div>
            </div>
            <div class='bt-title' id='bt-title'>Blind Test: French Rap Hits</div>
            <div class='bt-question-counter' id="bt-question-counter">Question 1 of 5</div>

            <svg onclick="Test()" id="countdownSVG" class='countdownSVG' class="w-60 h-60" viewBox="0 0 100 100">
                <defs>
                    <linearGradient id="countdownGradient" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color: #FFA500; stop-opacity: 1"></stop> 
                        <stop offset="30%" style="stop-color: #FFA500; stop-opacity: 1"></stop> 
                        <stop offset="100%" style="stop-color: #FF0000; stop-opacity: 1"></stop> 
                    </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="none" stroke="#333333" stroke-width="8"></circle>
                <circle id="countdownCircle" cx="50" cy="50" r="45" fill="none" stroke="url(#countdownGradient)" stroke-width="8" stroke-dashoffset="282.7px" style="transition: stroke-dashoffset 5s linear;stroke-dasharray: 282.7;transform: rotate(-90deg);transform: rotate(-90deg);transform-origin: 50% 50%;"></circle> 
                <text x="50" y="50" id="timerDisplay" text-anchor="middle" dominant-baseline="middle" fill="#FFFFFF" style="font-family:'Inter',sans-serif;font-size:30px;font-weight:800;">0</text>
            </svg>

            <div class='bt-question'>WHAT IS THE TITLE?</div>

            <div style='display:flex;flex-direction:column;gap:0.75rem;justify-content:center;align-items:center;width:100%;'>
                <yt-bt-button id="bt-answer1"></yt-bt-button>
                <yt-bt-button id="bt-answer2"></yt-bt-button>
                <yt-bt-button id="bt-answer3"></yt-bt-button>
                <yt-bt-button id="bt-answer4"></yt-bt-button>
            </div>

            <div class='bt-info-text-bottom'>Song info revealed after answer...</div>

            <div style="display:none;">
                <div class="bt-img" id="bt-img"></div>
                <div class='bt-box'>
                    <h2 class='bt-text-title' id="bt-text-title"></h2>
                    <h2 class='bt-text-author' id="bt-text-author"></h2>
                </div>
            </div>
        </div>
        `

        const canvas = document.getElementById('bt-canvas')
        const ctx=canvas.getContext('2d')
        canvas.width=window.innerWidth
        canvas.height=window.innerHeight
        
        ctx.fillStyle = '#000000ff'; // Darker color for contrast
        ctx.fillRect(0,0,canvas.width,canvas.height)

        
    }
}

window.customElements.define('yt-blind-test',BlindTest)


function Test(){
    document.getElementsByClassName('plyr__control')[19].click()
}