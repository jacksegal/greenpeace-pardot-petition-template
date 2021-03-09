var closeBtn,
    cookieNotice;

var getCookie = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
};
var setCookie = function(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
};
var addStyles = function(css) {
    var style = document.createElement('style');
    style.innerHTML = css;
    // Insert new styles before the first script tag
    var ref = document.querySelector('script');
    ref.parentNode.insertBefore(style, ref);
};

if (getCookie('privacypopupclose') === null) {

    // add popup css
    addStyles('body{position:relative}#cookienotice_wrapper{transition:.2s transform ease-out;box-sizing:border-box;font-size:11px;position:fixed;overflow:hidden;bottom:0;right:0;left:0;background-color:white;padding:.5em 1em;margin:0 auto;display:block;box-shadow:none;width:100%;z-index:9001;text-align:center}#cookienotice_wrapper.close{transform:translateY(100%)}#cookienotice_content{-webkit-flex-wrap:wrap-reverse;display:flex;flex-wrap:wrap-reverse;align-items:center;justify-content:center}#cookienotice_content__message{color:#333!important;display:inline-block;float:left;padding-right:10px;font-size:1em;line-height:1.3em;margin:0}.svg-inline{display:inline-block;font-size:inherit;height:1em;overflow:visible;vertical-align:-.125em}.svg-inline.w-11{width:.6875em;overflow:visible;position:absolute;right:10px;top:7px;cursor:pointer}#cookienotice_content__link{text-decoration:none;font-weight:700;color:#337ab7}@media screen and (max-width:431px){.svg-inline.w-11{top:14px}}@media screen and (min-width:768px){#cookienotice_content__message{font-size:12px}}@media screen and (min-width:1024px){#cookienotice_content__message{font-size:13px}}');

    // add popup html to body
    var div = document.createElement('div');
    div.innerHTML = '<div id="cookienotice_wrapper"> <div id="cookienotice_content"> <p id="cookienotice_content__message">Our website uses cookies. By continuing to browse the site you agree to our <a target="_blank" id="cookienotice_content__link" href="https://www.greenpeace.org.uk/help/privacy-policy/">privacy policy</a>.</p><span id="cookienotice_content__accept_button"><svg class="svg-inline times w-11" aria-hidden="true" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" data-fa-i2svg=""> <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"> </path> </svg></span> </div></div>';
    document.body.appendChild( div );

    // close button listener
    closeBtn = document.getElementById('cookienotice_content__accept_button');
    closeBtn.addEventListener('click', function(){
        cookieNotice = document.querySelector('#cookienotice_wrapper');
        setCookie('privacypopupclose', 'true', 30);
        cookieNotice.classList.add("close");
    });

}