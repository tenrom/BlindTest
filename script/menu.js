
/* Differents actions fot a title:
-Lire ensuite
-Partager
-Ajouter à la file d'attente
-Supprimer de la file d'attente
-Accéder à la page de l'artiste
-Prendre le lien yt 
-Prendre le lien yt music

SVGs:
*/

SVGsMenu={
    "Play next":"M6 2.86V5H3a1 1 0 00-1 1v12a1 1 0 102 0V7h2v2.137a.5.5 0 00.748.434L13 5.998 6.748 2.426A.5.5 0 006 2.86ZM21 5h-5a1 1 0 100 2h5a1 1 0 100-2Zm0 6H9a1 1 0 000 2h12a1 1 0 000-2Zm0 6H9a1 1 0 000 2h12a1 1 0 000-2Z",
    "Share":"M7.5 2.369v3.263c-4.394.18-6.529 3.25-6.733 9.795-.011.354.433.513.659.24 2.347-2.838 3.262-3.258 6.074-3.291v3.259a.75.75 0 001.235.572l8.515-7.205-8.515-7.205a.75.75 0 00-1.235.572ZM9 7.07V3.986l5.928 5.016L9 14.017v-3.159l-1.517.018c-1.452.017-2.69.127-3.898.768-.35.186-.683.41-1.01.67.266-1.46.687-2.543 1.222-3.32.797-1.156 1.956-1.789 3.765-1.863L9 7.07Z",
    "Add to queue":"M21 6.998a1 1 0 100-2H9a1 1 0 000 2h12ZM6 21.138a.5.5 0 00.748.434L13 18l-6.252-3.573A.5.5 0 006 14.86V17H4V6a1 1 0 00-2 0v12a1 1 0 001 1h3v2.138Zm15-8.14a1 1 0 000-2H9a1 1 0 000 2h12Zm0 6a1 1 0 000-2h-5a1 1 0 000 2h5Z",
    "Remove from queue":"M9 .75a8.25 8.25 0 100 16.5A8.25 8.25 0 009 .75Zm0 1.5a6.75 6.75 0 110 13.5 6.75 6.75 0 010-13.5Zm3 6H6a.75.75 0 000 1.5h6a.75.75 0 100-1.5Z",
    "Go to artist":"M9 1.5A3.75 3.75 0 109 9a3.75 3.75 0 000-7.5ZM9 3a2.25 2.25 0 110 4.5A2.25 2.25 0 019 3Zm5.25 6.665v3.216a2.244 2.244 0 00-3 2.119 2.25 2.25 0 004.5 0v-3.226l1.96 1.177a.192.192 0 00.29-.164V11.48a.38.38 0 00-.18-.32l-3-1.815a.375.375 0 00-.57.32ZM9 9.75a6 6 0 00-6 6 .75.75 0 101.5 0 4.5 4.5 0 016.84-3.842l1.084-1.083A6 6 0 009 9.75Zm4.5 4.5a.75.75 0 110 1.5.75.75 0 010-1.5Z",
    "Get YtMusic Link":"M10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20ZM10 15.769C6.812 15.769 4.231 13.188 4.231 10C4.231 6.812 6.812 4.231 10 4.231C13.188 4.231 15.769 6.812 15.769 10C15.769 13.188 13.188 15.769 10 15.769ZM10 14.936C12.705 14.936 14.936 12.705 14.936 10C14.936 7.295 12.705 5.064 10 5.064C7.295 5.064 5.064 7.295 5.064 10C5.064 12.705 7.295 14.936 10 14.936ZM13.654 10L7.885 6.731V13.269Z",
    "Get Yt Link":"M9.9892 13.7931C9.9892 13.7931 16.2553 13.7931 17.8099 13.3793C18.6843 13.1448 19.3423 12.4689 19.5733 11.6344C20 10.1034 20 6.8827 20 6.8827C20 6.8827 20 3.6827 19.5733 2.1655C19.3423 1.3103 18.6843 0.6482 17.8099 0.4206C16.2553 0 9.9892 0 9.9892 0C9.9892 0 3.7381 0 2.1911 0.4206C1.33 0.6482 0.658 1.3103 0.313 2.1655C0 3.6827 0 6.8827 0 6.8827C0 6.8827 0 10.1034 0.313 11.6344C0.658 12.4689 1.33 13.1448 2.1911 13.3793C3.7381 13.7931 9.9892 13.7931 9.9892 13.7931Z M13.1034 6.8965L7.931 3.9655V9.8275L13.1034 6.8965Z"
}

SVGsTranslate={
    "Play next":0,
    "Share":20,
    "Add to queue":0,
    "Remove from queue":20,
    "Go to artist":20,
    "Get YtMusic Link":20,
    "Get Yt Link":30
}

ActionsMenu={
    "Play next":()=>{
        currentPlaylist=currentPlaylist.slice(0,indexMusic+1).concat([menuSongID]).concat(currentPlaylist.slice(indexMusic+1))
    },
    "Share":(e)=>{
        navigator.clipboard.writeText("https://tenrom.github.io/BlindTest/main.html")
    },
    "Add to queue":()=>{
        currentPlaylist=currentPlaylist.concat([menuSongID])
    },
    "Remove from queue":()=>{
        if(menuSongID===currentPlaylist[indexMusic]){
            currentPlaylist=currentPlaylist.filter(e => e!==menuSongID)
            loopIconUpdate(false)
            justchange=true
            Load(currentPlaylist[indexMusic])
        }else{
            currentPlaylist=currentPlaylist.filter(e => e!==menuSongID)
        }
    },
    "Go to artist":()=>{
        for (let i in db.items){
            if (db.items[i].snippet.resourceId.videoId===menuSongID){
                urlParams.set('channel', db.items[i].snippet.videoOwnerChannelId)
                urlParams.set('mine', 'false')
                urlParams.delete('explore', urlParams.get('explore'))
                urlParams.delete('list', urlParams.get('list'))
                open(location.href.replace(location.search, '') + '?' + urlParams.toString(), '_self')
            }
        }
    },
    "Get YtMusic Link":()=>{
        navigator.clipboard.writeText("https://music.youtube.com/watch?v="+menuSongID)
    },
    "Get Yt Link":()=>{
        navigator.clipboard.writeText("https://www.youtube.com/watch?v="+menuSongID)
    }
}

class menuItem extends HTMLElement{
    constructor(){
        super()
    }
    HandleAction(){
        ActionsMenu[this.getAttribute('name')]()
    }
    connectedCallback(){
        this.style.width='100%'
        this.style=`
        width:100%;
        `
        this.innerHTML=`
            <div class="menuItem-div"> 
                <svg xmlns="http://www.w3.org/2000/svg" style="display: flex;color:white;justify-content:center;" width="32px" height="32px" viewBox="0 0 24 24"><path style="transform-box: fill-box;transform-origin: center;transform: translate(0, ${SVGsTranslate[this.getAttribute('name')]}%);" fill="currentColor"${this.getAttribute('name').includes("Get Yt") ? "fill-rule='evenodd'":""} d="${SVGsMenu[this.getAttribute('name')]}"/></svg>
                <div class='menuItem-box'>
                    <h2 class='menuItem-name'>${this.getAttribute('name')}</h2>
                </div>
            </div>
        `

        this.addEventListener('click',()=>{
            this.HandleAction()
        })
    }
}

window.customElements.define('menu-item',menuItem)

let menuSongID=""

class menu extends HTMLElement{
    constructor(){
        super()
    }
    hide(){
        document.body.style.overflow='visible'
        bodyOverflow='visible'
        this.style.display='none'
    }
    show(id){
        document.body.style.overflow='hidden'
        bodyOverflow='hidden'
        this.style.display='flex'
        menuSongID=id
    }
    connectedCallback(){
        this.style.width='100%'
        this.style=`
        position:fixed;
        top:0;
        z-index:4;
        width:100%;
        height:100vh;
        background-color:rgba(0,0,0,0.5);
        display:none;
        flex-direction:column;
        align-items:center;
        justify-content:end;
        animation:MenuBlackFade 200ms ease-in-out both;
        user-select:none;
        `
        this.innerHTML=`
            <div class="menu-div">
                <div class="menu-header">
                    <h2 class="menu-title"></h2>
                </div>
            </div>
        `
        let l={
            "song":["Play next","Add to queue","Remove from queue","Go to artist","Get YtMusic Link","Get Yt Link","Share"]
        }

        for (let i in l[this.getAttribute('type')]){
            this.getElementsByClassName('menu-div')[0].innerHTML+=`<menu-item name="${l[this.getAttribute('type')][i]}"></menu-item>`
        }

        this.addEventListener('click',()=>{
            this.hide()
        })

    }
}

window.customElements.define('yt-menu',menu)
