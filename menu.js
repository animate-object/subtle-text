
getMode = (cb) => {
    chrome.storage.sync.get('mode', (saved) {
        cb(chrome.runtime.lastError ? null : saved['mode']);
    }
}

setMode = (mode) => {
    let saved = {};
    saved['mode'] = model;
    chrome.storage.sync.set(saved);
}

fireOffContentScript = (mode) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tab) => {
        console.log("firing off message with value " + mode);
        chrome.tabs.sendMessage(tab[0].id, {'mode': mode}, (response) => {
            // do nothing yo
        })
    }
}

console.log("anything at all");
document.addEventListener('DOMContentLoaded', () => {
    let menu = document.getElementById('menu');
    getMode((mode) => {
        console.log('checked for mode and got ' + mode);
        if (mode) {
            menu.value = mode;
            fireOffContentScript(mode);
        }
    
    });

    menu.addEventListener('change', () => {
        setMode(menu.value);
        console.log('got mode ' + menu.value);
        fireOffContentScript(menu.value);
    });
});
