

class Spinner extends HTMLElement{
    constructor(){
        super()
    }
    connectedCallback(){
        this.classList.add("spinner-container")
        this.innerHTML=`
            <div class="spinner-layer">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div>
                <div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        `
    }
}

window.customElements.define('icon-spinner', Spinner)