class WebBeat {
    constructor() {
        this.playButton = document.querySelector(".play")
        this.pads = document.querySelectorAll(".pad")
        this.hihatAudoio = document.querySelector(".hihat-sound")
        this.snareAudoio = document.querySelector(".snare-sound")
        this.kickAudoio = document.querySelector(".kick-sound")
        this.crashAudoio = document.querySelector(".crash-sound")
        this.index = 0
        this.bpm = 150
    }

    activePad() {
        this.classList.toggle("active")
    }

    repeat() {
        let step = this.index % 16
        const activeBars = document.querySelectorAll(`.b${step}`)
        this.index++
    }

    start() {
        const interval = (60/this.bpm) * 1000
        setInterval(() => {
            this.repeat()
        }, interval)
    }
}

const webBeat = new WebBeat();

webBeat.pads.forEach(pad => {
    pad.addEventListener("click", webBeat.activePad)
})

webBeat.playButton.addEventListener("click", () => {
    webBeat.start()
})