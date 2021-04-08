document.addEventListener('petitionSuccess', function (e) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'PetitionSigns': 'submission_success'});

    console.group("%cpetitionSuccess Listener", "color: #241C15; background-color: #4EE4C4; padding: 4px; font-weight: 400;");
    console.log("Detail:\t", e.detail);
    console.groupEnd();
}, false);

document.addEventListener('pageScroll', function (e) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'PageSection': e.detail.replace('#','')});

    console.group("%cpageScroll Listener", "color: #241C15; background-color: #4EE4C4; padding: 4px; font-weight: 400;");
    console.log("Detail:\t", e.detail);
    console.groupEnd();
}, false);

document.addEventListener('askAnswer', function (e) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'Share': e.detail});

    console.group("%caskAnswer Listener", "color: #241C15; background-color: #4EE4C4; padding: 4px; font-weight: 400;");
    console.log("Detail:\t", e.detail);
    console.groupEnd();
}, false);

document.addEventListener('share', function (e) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'SharePlatform': e.detail});

    console.group("%cshare Listener", "color: #241C15; background-color: #4EE4C4; padding: 4px; font-weight: 400;");
    console.log("Detail:\t", e.detail);
    console.groupEnd();
}, false);

document.addEventListener('skipAsk', function (e) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'SharePlatform': 'skip'});

    console.group("%cskipAsk Listener", "color: #241C15; background-color: #4EE4C4; padding: 4px; font-weight: 400;");
    console.log("Detail:\t", e.detail);
    console.groupEnd();
}, false);

document.addEventListener('donateClick', function (e) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'DonateType': e.detail.type,
        'DonateAmount': e.detail.amt.replace('£','')
    });

    console.group("%cdonateClick Listener", "color: #241C15; background-color: #4EE4C4; padding: 4px; font-weight: 400;");
    console.log("Detail:\t", e.detail);
    console.groupEnd();
}, false);

document.addEventListener('showClick', function (e) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'ReadMore': e.detail ? 'close' : 'open'});

    console.group("%cshowClick Listener", "color: #241C15; background-color: #4EE4C4; padding: 4px; font-weight: 400;");
    console.log("Detail:\t", e.detail);
    console.groupEnd();
}, false);

document.addEventListener('pageLoad', function (e) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'ApproachCode': e.detail.ApproachCode,
        'PetitionName': e.detail.PetitionName,
        'OneClick': e.detail.OneClick ? 'yes' : 'no',
        'DDGivers': e.detail.DDGivers ? 'yes' : 'no'
    });

    console.group("%cpageLoad Listener", "color: #241C15; background-color: #4EE4C4; padding: 4px; font-weight: 400;");
    console.log("Detail:\t", e.detail);
    console.groupEnd();
}, false);