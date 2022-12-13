class WebBeat {
  constructor() {
    this.playButton = document.querySelector(".play");
    this.selectors = document.querySelectorAll("select");
    this.pads = document.querySelectorAll(".pad");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.kickAudio = document.querySelector(".kick-sound");
    this.crashAudio = document.querySelector(".crash-sound");
    this.muteButtons = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector("#tempo-slider");
    this.tempoNumber = document.querySelector(".tempo-number");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
  }

  changeTempo(e) {
    const inputValue = e.target.value;
    this.bpm = inputValue;
    this.tempoNumber.innerText = inputValue;
  }

  updateIntervalTempo() {
    //If it's playing, staps the current play interval and starts a new one
    if (this.playButton.innerText === "Pause") {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      this.start();
    }
  }

  changeSound(e) {
    const selectionName = e.target;
    switch (selectionName.id) {
      case "hihat-select":
        this.hihatAudio.src = selectionName.value;
        break;
      case "snare-select":
        this.snareAudio.src = selectionName.value;
        break;
      case "kick-select":
        this.kickAudio.src = selectionName.value;
        break;
      case "crash-select":
        this.crashAudio.src = selectionName.value;
        break;
    }
  }

  muteSound(e) {
    const button = e.target;
    switch (button.classList[1]) {
      case "hihat-volume":
        if (this.hihatAudio.muted === false) {
          this.hihatAudio.muted = true;
          button.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
        } else {
          this.hihatAudio.muted = false;
          button.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
        }
        break;
      case "snare-volume":
        if (this.snareAudio.muted === false) {
          this.snareAudio.muted = true;
          e.target.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
        } else {
          this.snareAudio.muted = false;
          e.target.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
        }
        break;
      case "kick-volume":
        if (this.kickAudio.muted === false) {
          this.kickAudio.muted = true;
          e.target.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
        } else {
          this.kickAudio.muted = false;
          e.target.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
        }
        break;
      case "crash-volume":
        if (this.crashAudio.muted === false) {
          this.crashAudio.muted = true;
          e.target.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
        } else {
          this.crashAudio.muted = false;
          e.target.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
        }
        break;
    }
  }

  activatePad() {
    this.classList.toggle("active");
  }

  iterateTracks() {
    let step = this.index % 16;

    //collects and assigns the current pads based on the step
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
            this.hihatAudio.currentTime = 0;
            break;
          case "snare-pad":
            this, this.snareAudio.play();
            this.snareAudio.currentTime = 0;
            break;
          case "kick-pad":
            this, this.kickAudio.play();
            this.kickAudio.currentTime = 0;

            break;
          case "crash-pad":
            this, this.crashAudio.play();
            this.crashAudio.currentTime = 0;

            break;
        }
      }
    });
    this.index++;
  }

  start() {
    const interval = (this.bpm / 60) * 1000;
    //Checks to see if the tracks are playing
    if (!this.isPlaying) {
      //Sets the property from null to the random number returned by setInterval.
      this.playButton.innerText = "Pause";
      this.isPlaying = setInterval(() => {
        this.iterateTracks();
      }, interval);
    } else {
      //clear the interval using the id that was set by the interval
      this.playButton.innerText = "Play";
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
}

const webBeat = new WebBeat();

webBeat.pads.forEach((pad) => {
  pad.addEventListener("click", webBeat.activatePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

webBeat.selectors.forEach((selector) => {
  selector.addEventListener("change", function (e) {
    webBeat.changeSound(e);
  });
});

webBeat.muteButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    webBeat.muteSound(e);
  });
});

webBeat.playButton.addEventListener("click", () => {
  webBeat.start();
});

webBeat.tempoSlider.addEventListener("input", function (e) {
  webBeat.changeTempo(e);
});

webBeat.tempoSlider.addEventListener("change", function (e) {
  webBeat.updateIntervalTempo();
});
