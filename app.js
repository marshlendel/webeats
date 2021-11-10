class Drumkit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playButton = document.querySelector(".play")
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 180;
    this.isPlaying = null;

    this.playButton.addEventListener("click", () => {
      this.start();
    });

    this.pads.forEach((pad) => pad.addEventListener("click", this.makeActive));
    this.pads.forEach((pad) =>
      pad.addEventListener("animationend", function () {
        this.style.animation = "";
      })
    );
  }

  repeater() {
    let step = this.index % 8;
    let activePad = document.querySelectorAll(`.b${step}`);

    activePad.forEach((pad) => {
      pad.style.animation = "playTrack 0.3s alternate ease-in-out 2";
      if (pad.classList.contains("active")) {
        if (pad.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (pad.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (pad.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });

    this.index++;
  }

  start() {
    let interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.playButton.innerHTML = '<i class="fas fa-pause"></i>'
      this.isPlaying = setInterval(() => {
        this.repeater();
      }, interval);
    } else {
        this.playButton.innerHTML = '<i class="fas fa-play"></i>'
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }

  makeActive(e) {
    e.target.classList.toggle("active");
  }
}

let drumkit = new Drumkit();
