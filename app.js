class WebBeat {
  constructor() {
    this.playButton = document.querySelector(".play");
    this.selectors = document.querySelectorAll("select");
    this.pads = document.querySelectorAll(".pad");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.kickAudio = document.querySelector(".kick-sound");
    this.crashAudio = document.querySelector(".crash-sound");
    this.index = 0;
    this.bpm = 150;
  }

  changeSound(e) {
    switch (e.target.id) {
      case "hihat-select":
        this.hihatAudio.src = e.target.value;
        break;
      case "snare-select":
        this.snareAudio.src = e.target.value;
        break;
      case "kick-select":
        this.kickAudio.src = e.target.value;
        break;
      case "crash-select":
        this.crashAudio.src = e.target.value;
        break;
    }
  }

  activePad() {
    this.classList.toggle("active");
  }

  repeat() {
    let step = this.index % 16;
    const activePads = document.querySelectorAll(`.b${step}`);

    //loop over the current pad in the track for each drum part
    activePads.forEach((pad) => {
      pad.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      //check if the current pads are active
      if (pad.classList.contains("active")) {
        //checks which track the current active pad is and plays the right sound
        switch (pad.classList[1]) {
          case "hihat-pad":
            this, this.hihatAudio.play();
            break;
          case "snare-pad":
            this, this.snareAudio.play();
            break;
          case "kick-pad":
            this, this.kickAudio.play();
            break;
          case "crash-pad":
            this, this.crashAudio.play();
            break;
        }
      }
    });
    this.index++;
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    setInterval(() => {
      this.repeat();
    }, interval);
  }
}

const webBeat = new WebBeat();

webBeat.pads.forEach((pad) => {
  pad.addEventListener("click", webBeat.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

webBeat.selectors.forEach((selector) => {
  selector.addEventListener("change", function (e) {
    webBeat.changeSound(e);
  });
});
webBeat.playButton.addEventListener("click", () => {
  webBeat.start();
});
