var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "360",
    width: "640",
    videoId: "j0oG2gLcLYw",
    playerVars: {
      playsinline: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady() {
  console.log("Player is Ready to play");
}

function startPlaying() {
  socket.emit("startPlaying");
}

var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const socket = io("http://localhost:3000");

function onPlayerStateChange({ target, data }) {
  if (data === YT.PlayerState.PLAYING) {
    socket.emit("stateChange", [1]);
  } else if (data === YT.PlayerState.PAUSED) {
    socket.emit("stateChange", [2]);
    checkSeek();
  } else if (data === YT.PlayerState.BUFFERING) {
    socket.emit("stateChange", [3]);
  }
}

var prevTime = 0;
function checkSeek() {
  var currentTime = player.getCurrentTime();
  if (Math.abs(currentTime - prevTime) > 1) {
    socket.emit("stateChange", [4, currentTime]);
  }
  prevTime = currentTime;
  setTimeout(checkSeek, 100);
}

socket.on("serverConnected", (data) => {
  console.log(data);
});

socket.on("startVideo", () => {
  player.playVideo();
});

socket.on("changeTheState", (res) => {
  if (res[0] == 1) {
    player.playVideo();
  } else if (res[0] == 2) {
    player.pauseVideo();
  } else if (res[0] == 4) {
    player.seekTo(res[1]);
    player.playVideo();
  }
});
