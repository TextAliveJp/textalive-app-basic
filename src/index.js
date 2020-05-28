import { Player } from "textalive-api";

const player = new Player({
  app: {
    appAuthor: "Jun Kato",
    appName: "Basic example"
  },
  mediaElement: document.querySelector("#media"),
  fontFamilies: []
});

player.addListener({
  onAppReady,
  onVideoReady,
  onThrottledTimeUpdate
});

const playBtn = document.querySelector("#play");
const pauseBtn = document.querySelector("#pause");
const rewindBtn = document.querySelector("#rewind");
const positionEl = document.querySelector("#position strong");

const artistSpan = document.querySelector("#artist span");
const songSpan = document.querySelector("#song span");

function onAppReady(app) {
  if (!app.managed) {
    document.querySelector("#control").style.display = "block";
    playBtn.addEventListener("click", () => player.video && player.requestPlay());
    pauseBtn.addEventListener("click", () => player.video && player.requestPause());
    rewindBtn.addEventListener("click", () => player.video && player.requestMediaSeek(0));
  }
  if (!app.songUrl) {
      player.createFromSongUrl("http://www.youtube.com/watch?v=KdNHFKTKX2s");
  }
}

function onVideoReady(v) {
  artistSpan.textContent = player.data.song.artist.name;
  songSpan.textContent = player.data.song.name;
}

function onThrottledTimeUpdate(position) {
  positionEl.textContent = String(Math.floor(position));
}