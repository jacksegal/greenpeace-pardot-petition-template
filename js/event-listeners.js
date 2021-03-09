document.addEventListener('petitionSuccess', function (e) {
    console.group("%cPetition Success Listener", "color: #241C15; background-color: #4EE4C4; padding: 4px; font-weight: 400;");
    console.log("Detail:\t", e.detail);
    console.groupEnd();
}, false);

document.addEventListener('pageScroll', function (e) {
    console.group("%cPage Scroll Listener", "color: #241C15; background-color: #4EE4C4; padding: 4px; font-weight: 400;");
    console.log("Detail:\t", e.detail);
    console.groupEnd();
}, false);

document.addEventListener('share', function (e) {
    console.group("%cShare Listener", "color: #241C15; background-color: #4EE4C4; padding: 4px; font-weight: 400;");
    console.log("Detail:\t", e.detail);
    console.groupEnd();
}, false);

document.addEventListener('skipAsk', function (e) {
    console.group("%cSkip Ask Listener", "color: #241C15; background-color: #4EE4C4; padding: 4px; font-weight: 400;");
    console.log("Detail:\t", e.detail);
    console.groupEnd();
}, false);

document.addEventListener('donateClick', function (e) {
    console.group("%cDonate Click Listener", "color: #241C15; background-color: #4EE4C4; padding: 4px; font-weight: 400;");
    console.log("Detail:\t", e.detail);
    console.groupEnd();
}, false);

document.addEventListener('showClick', function (e) {
    console.group("%cRead More Listener", "color: #241C15; background-color: #4EE4C4; padding: 4px; font-weight: 400;");
    console.log("Detail:\t", e.detail);
    console.groupEnd();
}, false);