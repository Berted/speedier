let videos = document.getElementsByTagName("video");

if (videos.length) {
    console.log("A video is found, increasing video playback rate: ");
    videos[0].playbackRate = 3;
}
else {
    console.log("No videos found!");
}