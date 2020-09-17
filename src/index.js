// TextAlive App API basic example
// https://github.com/TextAliveJp/textalive-app-basic

// see also: https://github.com/TextAliveJp/textalive-app-phrase

import { Player } from "textalive-app-api";

// 
const animateWord = function (now, unit) {
  if (unit.contains(now)) {
    document.querySelector("#char").textContent = unit.text;
  }
};

const player = new Player({
  app: {
    appAuthor: "Jun Kato",
    appName: "Basic example"
  },
  mediaElement: document.querySelector("#media"),
});
console.log(player);

player.addListener({
  onAppReady,
  onVideoReady,
  onThrottledTimeUpdate,
  onPause,
  onStop,
});

const playBtn = document.querySelector("#play");
const pauseBtn = document.querySelector("#pause");
const rewindBtn = document.querySelector("#rewind");
const positionEl = document.querySelector("#position strong");

const artistSpan = document.querySelector("#artist span");
const songSpan = document.querySelector("#song span");

function onAppReady(app) {

  // show control when the app is launched standalone
  if (!app.managed) {
    document.querySelector("#control").style.display = "block";
    playBtn.addEventListener("click", () => player.video && player.requestPlay());
    pauseBtn.addEventListener("click", () => player.video && player.requestPause());
    rewindBtn.addEventListener("click", () => player.video && player.requestMediaSeek(0));
  }

  // load a song when a song URL is not specified
  if (!app.songUrl) {
      player.createFromSongUrl("http://www.youtube.com/watch?v=ygY2qObZv24");
  }
}

function onVideoReady(v) {
  // show meta data
  artistSpan.textContent = player.data.song.artist.name;
  songSpan.textContent = player.data.song.name;

  // set "animate" function
  let w = player.video.firstWord;
  while (w) {
    w.animate = animateWord;
    w = w.next;
  }
}

function onThrottledTimeUpdate(position) {
  // update current position
  positionEl.textContent = String(Math.floor(position));

  // more precise timing information can be retrieved by `player.timer.position` at any time
}

function onPause() {
  document.querySelector("#char").textContent = "-";
}
function onStop() {
  document.querySelector("#char").textContent = "-";
}