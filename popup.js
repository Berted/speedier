chrome.storage.local.set({'isiton':false},function(){});
var on = false;

document.getElementById("onoff").addEventListener('change', () => {
    console.log("hello");
    if(document.getElementById("onoff").checked){
        on = true;
        chrome.storage.local.set({'isiton':true},function(){});
    }
    else{
        on = false;
        chrome.storage.local.set({'isiton':false},function(){});
    }
});