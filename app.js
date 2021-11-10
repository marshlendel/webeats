class Drumkit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playButton = document.querySelector(".play");
    this.select = document.querySelectorAll("select");
    this.mutes = document.querySelectorAll(".mute");
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

    this.select.forEach((select) => {
      select.addEventListener("change", (e) => {
        this.changeSound(e);
      });
    });

    this.mutes.forEach((mute) => {
      mute.addEventListener("click", (e) => {
        this.muteSound(e);
      });
    });
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
      this.playButton.innerHTML = '<i class="fas fa-pause"></i>';
      this.isPlaying = setInterval(() => {
        this.repeater();
      }, interval);
    } else {
      this.playButton.innerHTML = '<i class="fas fa-play"></i>';
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }

  makeActive(e) {
    e.target.classList.toggle("active");
  }

  changeSound(e) {
    switch (e.target.id) {
      case "kick-select":
        this.kickAudio.src = e.target.value;
        break;
      case "snare-select":
        this.snareAudio.src = e.target.value;
        break;
      case "hihat-select":
        this.hihatAudio.src = e.target.value;
        break;
    }
  }

  muteSound(e) {
    let dataTrack = e.target.dataset.track;

    if (e.target.classList.contains("active")) {
      switch (dataTrack) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
      }
      e.target.classList.toggle("active");
    } else {
      switch (dataTrack) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
      e.target.classList.toggle("active");
    }
  }
}

let drumkit = new Drumkit();
