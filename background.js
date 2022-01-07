const docbody = document.getElementsByTagName("body")[0]
const config = {childList: true, subtree: true };

let LOUD_SPEED = 1, QUIET_SPEED = 4, THRESHOLD = 0.01, DISABLED = false

let ctx, 
processor,
source,
video,
DEBUG_COUNTER = 0,
start = performance.now();

const optimizeVideo = function(mutationsList, observer)
{
    let videos = document.getElementsByTagName("video");

    if (videos.length) {
        video = videos[0];
        ctx = new AudioContext();
        // 2048 sample buffer, 1 channel in, 1 channel out 
        processor = ctx.createScriptProcessor(2048, 1, 1);
            
        video.addEventListener('canplaythrough', function() {
            source = ctx.createMediaElementSource(video)
            source.connect(processor)
            source.connect(ctx.destination)
            processor.connect(ctx.destination)
        }, false);

        video.addEventListener('play', () => {
            ctx.resume();
        });
        
        // loop through PCM data and calculate average
        // volume for a given 2048 sample buffer
        processor.onaudioprocess = function(evt){
        	if (DISABLED) {return;}

            var input = evt.inputBuffer.getChannelData(0)
            , len = input.length   
            , total = i = 0
            , max = 0
            , rms
            
            while ( i < len ) 
            {
                let nex = Math.abs(input[i++])
                if (nex > max) {max = nex}
                if(max > THRESHOLD){
                    break;
                }
            }
            if (max < THRESHOLD) {video.playbackRate = QUIET_SPEED;}
            else {video.playbackRate = LOUD_SPEED;}
            DEBUG_COUNTER++;
            console.log("wurk: " + (performance.now() - start) + "ms, " + DEBUG_COUNTER + " " + video.playbackRate + " " + max);
            start = performance.now();
        };
    
        console.log("A video is found!");
        observer.disconnect();
    }
    else {
        console.log("No videos found!");
    }
}

const observer = new MutationObserver(optimizeVideo);
observer.observe(docbody,config);

chrome.storage.onChanged.addListener(function (changes, namespace) {
	console.log("hello");
	for (let [key, { oldValue, newValue }] of Object.entries(changes)){
		console.log(key);
		if(key == "isiton"){
			if(newValue == true){
				console.log("allowed to run");
				DISABLED = false;
			}
			else{
				console.log("blocked from running");
				DISABLED = true;
				video.playbackRate = 1;
			}
		}
	}
});


