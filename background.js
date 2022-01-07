const docbody = document.getElementsByTagName("body")[0]
const config = {childList: true, subtree: true };

console.log("BACKGROUND.JS RUNNING");
console.log(docbody)

const optimizeVideo = function(mutationsList, observer)
{
    let videos = document.getElementsByTagName("video");

    const LOUD_SPEED = 1.5
    const QUIET_SPEED = 5

    if (videos.length) {
        console.log("A video is found, increasing video playback rate: ");
        videos[0].playbackRate = 3;
    }
    else {
        console.log("No videos found!");
    }
}

const observer = new MutationObserver(optimizeVideo);

observer.observe(docbody, config);
