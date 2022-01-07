chrome.storage.local.get(['isiton'], (result) => {
    if (result.isiton === undefined) {
        chrome.storage.local.set({'isiton':false},function(){});
    }
    else {
        document.getElementById("onoff").checked = result.isiton;
    }
});


document.getElementById("onoff").addEventListener('change', () => {
    console.log("hello");
    if(document.getElementById("onoff").checked){
        chrome.storage.local.set({'isiton':true},function(){});
    }
    else{
        chrome.storage.local.set({'isiton':false},function(){});
    }
});