
/* Differents actions fot a title:
-Lire ensuite
-Partager
-Ajouter à la file d'attente
-Supprimer de la file d'attente
-Accéder à la page de l'artiste

SVGs:
*/

SVGsMenu={
    "Play next":"M6 2.86V5H3a1 1 0 00-1 1v12a1 1 0 102 0V7h2v2.137a.5.5 0 00.748.434L13 5.998 6.748 2.426A.5.5 0 006 2.86ZM21 5h-5a1 1 0 100 2h5a1 1 0 100-2Zm0 6H9a1 1 0 000 2h12a1 1 0 000-2Zm0 6H9a1 1 0 000 2h12a1 1 0 000-2Z",
    "Share":"M7.5 2.369v3.263c-4.394.18-6.529 3.25-6.733 9.795-.011.354.433.513.659.24 2.347-2.838 3.262-3.258 6.074-3.291v3.259a.75.75 0 001.235.572l8.515-7.205-8.515-7.205a.75.75 0 00-1.235.572ZM9 7.07V3.986l5.928 5.016L9 14.017v-3.159l-1.517.018c-1.452.017-2.69.127-3.898.768-.35.186-.683.41-1.01.67.266-1.46.687-2.543 1.222-3.32.797-1.156 1.956-1.789 3.765-1.863L9 7.07Z",
    "Add to queue":"M21 6.998a1 1 0 100-2H9a1 1 0 000 2h12ZM6 21.138a.5.5 0 00.748.434L13 18l-6.252-3.573A.5.5 0 006 14.86V17H4V6a1 1 0 00-2 0v12a1 1 0 001 1h3v2.138Zm15-8.14a1 1 0 000-2H9a1 1 0 000 2h12Zm0 6a1 1 0 000-2h-5a1 1 0 000 2h5Z",
    "Remove from queue":"M9 .75a8.25 8.25 0 100 16.5A8.25 8.25 0 009 .75Zm0 1.5a6.75 6.75 0 110 13.5 6.75 6.75 0 010-13.5Zm3 6H6a.75.75 0 000 1.5h6a.75.75 0 100-1.5Z",
    "Go to artist":"M9 1.5A3.75 3.75 0 109 9a3.75 3.75 0 000-7.5ZM9 3a2.25 2.25 0 110 4.5A2.25 2.25 0 019 3Zm5.25 6.665v3.216a2.244 2.244 0 00-3 2.119 2.25 2.25 0 004.5 0v-3.226l1.96 1.177a.192.192 0 00.29-.164V11.48a.38.38 0 00-.18-.32l-3-1.815a.375.375 0 00-.57.32ZM9 9.75a6 6 0 00-6 6 .75.75 0 101.5 0 4.5 4.5 0 016.84-3.842l1.084-1.083A6 6 0 009 9.75Zm4.5 4.5a.75.75 0 110 1.5.75.75 0 010-1.5Z"
}

ActionsMenu={
    "Play next":()=>{
        currentPlaylist=currentPlaylist.slice(0,indexMusic+1).concat([menuSongID]).concat(currentPlaylist.slice(indexMusic+1))
    },
    "Share":()=>{
        console.log('Share')
    },
    "Add to queue":()=>{
        currentPlaylist=currentPlaylist.concat([menuSongID])
    },
    "Remove from queue":()=>{
        currentPlaylist=currentPlaylist.filter(e => e!==menuSongID)
    },
    "Go to artist":()=>{
        console.log('Go to artist')
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
                <svg xmlns="http://www.w3.org/2000/svg" style="display: block;color:white;" width="32px" height="32px" viewBox="0 0 24 24"><path fill="currentColor" d="${SVGsMenu[this.getAttribute('name')]}"/></svg>
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
        `
        this.innerHTML=`
            <div class="menu-div"> 
            </div>
        `
        let l={
            "song":["Play next","Add to queue","Remove from queue","Go to artist","Share"]
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
