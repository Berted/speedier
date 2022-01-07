chrome.storage.local.get(['isiton'], (result) => {
    if (result.isiton === undefined) {
        chrome.storage.local.set({'isiton':false},function(){});
    }
    else {
        document.getElementById("onoff").checked = result.isiton;
    }
});


document.getElementById("onoff").addEventListener('change', () => {
    if(document.getElementById("onoff").checked){
        chrome.storage.local.set({'isiton':true},function(){});
    }
    else{
        chrome.storage.local.set({'isiton':false},function(){});
    }
});

chrome.storage.local.get(['loud_speed'], (result) => {
    if (result.loud_speed === undefined) {
        chrome.storage.local.set({'loud_speed':1.5},function(){});
    }
    else {
        document.getElementById("loud_speed").value = result.loud_speed;
    }
});


document.getElementById("loud_speed").addEventListener('change', () => {
    chrome.storage.local.set({'loud_speed':document.getElementById("loud_speed").value},function(){});
});

chrome.storage.local.get(['quiet_speed'], (result) => {
    if (result.quiet_speed === undefined) {
        chrome.storage.local.set({'quiet_speed':4},function(){});
    }
    else {
        document.getElementById("quiet_speed").value = result.quiet_speed;
    }
});


document.getElementById("quiet_speed").addEventListener('change', () => {
    chrome.storage.local.set({'quiet_speed':document.getElementById("quiet_speed").value},function(){});
});

chrome.storage.local.get(['threshold'], (result) => {
    if (result.threshold === undefined) {
        chrome.storage.local.set({'threshold':0.01},function(){});
    }
    else {
        document.getElementById("threshold").value = result.threshold;
    }
});


document.getElementById("threshold").addEventListener('change', () => {
    chrome.storage.local.set({'threshold':document.getElementById("threshold").value},function(){});
});