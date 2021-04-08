var pageUrl = window.location.pathname;
var person = {};
var shownFields = false;
function analytics(action, label) {
    console.log("GA: " + action + " - " + label);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: "event",
        eventCategory: "scrolling-signup",
        eventAction: action,
        eventLabel: label
    })
}
function isThankYouPage() {
    url = window.location.href;
    if (url.indexOf("/st/") == -1) {
        return false
    } else {
        return true
    }
}
function urlToSapi() {
    url = window.location.href;
    url = url.split("?")[0];
    url = url.replace("/page/s/", "/page/sapi/");
    return url
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
var getObjectSize = function(obj) {
    var len = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) len++
    }
    return len
};
function ordinal_suffix_of(i) {
    var j = i % 10;
    if (j == 1 && i != 11) {
        return "<sup>st"
    }
    if (j == 2 && i != 12) {
        return "<sup>nd"
    }
    if (j == 3 && i != 13) {
        return "<sup>rd"
    } else {
        return "<sup>th"
    }
}
function isAndroidChromeUser() {
    var isChromium = window.chrome;
    var winNav = window.navigator;
    var vendorName = winNav.vendor;
    var isOpera = typeof window.opr !== "undefined";
    var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
    if (isChromium !== null && typeof isChromium !== "undefined" && vendorName === "Google Inc." && isOpera === false && isIEedge === false && /Android/i.test(navigator.userAgent) === true) {
        return true
    }
}
function renderSharePreview(ogTitle, ogDescription, ogImage) {
    jQuery("#fb-og-title").html(ogTitle);
    jQuery("#fb-og-description").html(ogDescription);
    jQuery(".topImageHolder").css("background-image", "url(" + ogImage + ")")
}
function addDonorElement() {
    var guid = getCookie("guid");
    var elem = document.createElement("div");
    elem.setAttribute("id", "tth");
    if (guid != "") {
        jQuery.getJSON("https://secure.greenpeace.org.uk/page/graph/loe/" + guid, function(graph) {
            elem.setAttribute("c", "true");
            if (typeof graph["highest_previous_contribution"] !== "undefined" && graph["highest_previous_contribution"] != false) {
                elem.setAttribute("a", "true")
            } else {
                elem.setAttribute("a", "false")
            }
            if (typeof graph["group_Post-donate_page_DD_upsell_exclusions"] !== "undefined" && graph["group_Post-donate_page_DD_upsell_exclusions"] != false) {
                elem.setAttribute("b", "true")
            } else {
                elem.setAttribute("b", "false")
            }
        })
    } else {
        elem.setAttribute("c", "false");
        elem.setAttribute("b", "false");
        elem.setAttribute("a", "false")
    }
    document.body.appendChild(elem)
}
function validateSignupForm(el, form) {
    var result;
    if (form == "initial") {
        result = jQuery("#initial-signup").validate().element(el)
    } else {
        result = jQuery("#bag-signup").validate().element(el)
    }
    var span = jQuery(el).next("label");
    jQuery(el).closest(".form-group").find(".glyphicon").remove();
    if (result == false) {
        jQuery(el).after('<span class="glyphicon glyphicon-remove form-control-feedback">');
        jQuery(el).closest(".form-group").removeClass("has-success");
        jQuery(el).closest(".form-group").addClass("has-error")
    } else if (result == true) {
        jQuery(el).after('<span class="glyphicon glyphicon-ok form-control-feedback">');
        jQuery(el).closest(".form-group").addClass("has-success");
        jQuery(el).closest(".form-group").removeClass("has-error")
    }
}
function getDonateValuesArray(values) {
    var valuesArray = values.split("|");
    for (var i = 0; i < valuesArray.length; i++) {
        valuesArray[i] = valuesArray[i].trim()
    }
    return valuesArray
}
function ordinal_suffix_of_facebook(i) {
    var j = i % 10;
    if (j == 1 && i != 11) {
        return "st"
    }
    if (j == 2 && i != 12) {
        return "nd"
    }
    if (j == 3 && i != 13) {
        return "rd"
    } else {
        return "th"
    }
}
jQuery.validator.addMethod("postcode", function(value, element) {
    return this.optional(element) || /^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/.test(value)
});
jQuery.validator.addMethod("emailplus", function(value, element) {
    return this.optional(element) || /^[^+]+$/.test(value)
});
jQuery.validator.addMethod("ukphone", function(value, element) {
    return this.optional(element) || /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/.test(value)
});
function encodeHTML(s) {
    var t = s.replace(/&/g, "&amp;");
    var u = t.replace(/[<]/g, "&lt;");
    var v = u.replace(/"/g, "&quot;");
    var w = v.replace(/[>]/g, "&gt;");
    return w
}
function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return "";
    if (!results[2]) return "";
    var length = 30;
    resultingString = encodeHTML(decodeURIComponent(results[2].replace(/\+/g, " ")));
    return resultingString.substring(0, length)
}
function addEmailButtonIfLinkDefined() {
    if (typeof mailHref !== "undefined" && mailHref) {
        if (mailHref !== null && mailHref !== "") {
            jQuery(".button.fbShareButton").after('<a target="_blank" class="button mail">Share by email</a>');
            jQuery(".button.mail").css({
                "margin-bottom": "20px",
                "max-width": "350px"
            });
            jQuery(".button.mail").css("background-color", "#ffa500");
            jQuery(".button.mail").click(function() {
                var pageUrl = window.location.pathname;
                if (typeof ga !== "undefined" && ga !== null) {
                    ga("gtm1.send", "event", "scrolling-signup", "email-share", pageUrl)
                }
                jQuery(".slide:eq(3)").show();
                var nextSlide = jQuery(".slide:eq(3)");
                jQuery(window).scrollTo(jQuery(nextSlide), 800)
            });
            jQuery(".button.mail").attr("href", mailHref)
        }
    }
}
function prepopulate() {
    person["firstname"] = getParameterByName("firstname");
    person["lastname"] = getParameterByName("lastname");
    person["email"] = getParameterByName("email");
    person["zip"] = getParameterByName("zip");
    person["source"] = getParameterByName("source");
    person["ref"] = getParameterByName("ddref");
    person["subsource"] = getParameterByName("subsource");
    person["sub"] = getParameterByName("sub");
    person["select"] = getParameterByName("select");
    person["subsource"] = person["subsource"];
    person["tysource"] = getParameterByName("tysource");
    if (window.location.hash) {
        var params = decodeURIComponent(window.location.hash).substr(1).split("&");
        for (i = 0; i < params.length; i++) {
            var a = params[i].split("=");
            person[a[0]] = a[1]
        }
    }
    if (typeof overrideRef !== "undefined" && overrideRef) {
        person.ref = overrideRef
    }
    if (person.subsource === "") {
        if (typeof defaultSub !== "undefined" && defaultSub) {
            person.subsource = defaultSub
        }
    }
    if (getParameterByName("ddref")) {
        person.ref = getParameterByName("ddref")
    }
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1)
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length)
            }
        }
        return ""
    }
    if (person["firstname"]) {
        jQuery("#firstname").val(person["firstname"]);
        jQuery("#firstname").addClass("full");
        validateSignupForm(jQuery("#firstname"), "initial")
    }
    if (person["lastname"]) {
        jQuery("#lastname").val(person["lastname"]);
        jQuery("#lastname").addClass("full");
        validateSignupForm(jQuery("#lastname"), "initial")
    }
    if (person["email"]) {
        jQuery("#email").val(person["email"]);
        validateSignupForm(jQuery("#email"), "initial")
    }
    if (person["zip"]) {
        jQuery("#zip").val(person["zip"]);
        jQuery("#zip").addClass("full")
    }
    if (person["source"]) {
        jQuery("#source").val(person["source"])
    }
    if (person["subsource"]) {
        jQuery("#subsource").val(person["subsource"])
    }
    if (person["sub"]) {
        jQuery("#sub").val(person["sub"])
    }
    jQuery(".signup-header").html(jQuery("#signup-header-text").html());
    jQuery(".signup-body").html(jQuery("#signup-body-text").html());
    jQuery(".signup-cta").html(jQuery("#signup-cta-text").html());
    jQuery(".more-info-wrap").html(jQuery("#more-info-text").html());
    jQuery(".share-header").html(jQuery("#share-header-text").html());
    jQuery(".share-body").html(jQuery("#share-body-text").html());
    jQuery(".option-header").html(jQuery("#option-header-text").html());
    jQuery(".option-body").html(jQuery("#option-body-text").html());
    jQuery(".donate-header").html(jQuery("#donate-header-text").html());
    jQuery(".donate-body").html(jQuery("#donate-body-text").html());
    if (jQuery("#cash-donate-header-text").length) {
        jQuery(".cash-donate-header").html(jQuery("#cash-donate-header-text").html())
    }
    if (jQuery("#cash-donate-body-text").length) {
        jQuery(".cash-donate-body").html(jQuery("#cash-donate-body-text").html())
    }
    if (jQuery("#dd-option-header-text").length) {
        jQuery(".dd-option-header").html(jQuery("#dd-option-header-text").html())
    }
    if (jQuery("#dd-option-body-text").length) {
        jQuery(".dd-option-body").html(jQuery("#dd-option-body-text").html())
    }
    if (jQuery("#cash-option-header-text").length) {
        jQuery(".cash-option-header").html(jQuery("#cash-option-header-text").html())
    }
    if (jQuery("#cash-option-body-text").length) {
        jQuery(".cash-option-body").html(jQuery("#cash-option-body-text").html())
    }
    if (isThankYouPage()) {
        var thankYouPageUrl = document.querySelector("link[rel='canonical']").href;
        var petitionUrl = thankYouPageUrl.replace("/st/", "/s/");
        var ogTitle = "";
        var ogDescription = "";
        var ogImage = "";
        jQuery.get(petitionUrl, function(data) {
            var petitionParsedHtml = jQuery.parseHTML(data);
            petitionParsedHtml.forEach(function(el) {
                if (jQuery(el).attr("property") == "og:title") {
                    ogTitle = jQuery(el).attr("content")
                }
                if (jQuery(el).attr("property") == "og:description") {
                    ogDescription = jQuery(el).attr("content")
                }
                if (jQuery(el).attr("property") == "og:image") {
                    ogImage = jQuery(el).attr("content")
                }
                renderSharePreview(ogTitle, ogDescription, ogImage)
            })
        })
    } else {
        var ogTitle = jQuery('meta[property="og:title"]').attr("content");
        var ogDescription = jQuery('meta[property="og:description"]').attr("content");
        var ogImage = jQuery('meta[property="og:image"]').attr("content");
        renderSharePreview(ogTitle, ogDescription, ogImage)
    }
    addEmailButtonIfLinkDefined();
    if (typeof whatsappShareCopy !== "undefined" && whatsappShareCopy !== "") {
        jQuery(".fbShareButton").after('<a class="whatsapp button">Share on Whatsapp</a>');
        jQuery(".button.whatsapp").on("click", function(e) {
            var pageUrl = window.location.pathname;
            if (typeof ga !== "undefined" && ga !== null) {
                ga("gtm1.send", "event", "scrolling-signup", "wa-share", pageUrl)
            }
            var url = "https://api.whatsapp.com/send?text=" + encodeURIComponent(whatsappShareCopy);
            jQuery(".slide:eq(3)").show();
            var nextSlide = jQuery(".slide:eq(3)");
            jQuery(window).scrollTo(jQuery(nextSlide), 800);
            var win = window.open(url, "_blank");
            if (typeof win !== "undefined") {
                win.focus()
            }
        })
    }
    if (isAndroidChromeUser() && navigator.share !== undefined && typeof chromeShareTitle !== "undefined" && typeof chromeShareText !== "undefined" && typeof chromeShareUrl !== "undefined") {
        jQuery(".fbShareButton").after(jQuery('<a href="javascript:;" class="chrome-share button">Share</a>'));
        jQuery(".chrome-share").on("click", function() {
            navigator.share({
                title: chromeShareTitle,
                text: chromeShareText,
                url: chromeShareUrl
            });
            if (typeof ga !== "undefined" && ga !== null) {
                ga("gtm1.send", "event", "scrolling-signup", "chrome-share", window.location.pathname)
            }
            jQuery(".slide:eq(3)").show();
            var nextSlide = jQuery(".slide:eq(3)");
            jQuery(window).scrollTo(jQuery(nextSlide), 800)
        })
    }
    var petitionUrl = urlToSapi();
    jQuery("#initial-signup").attr("action", petitionUrl)
}
function initialSignup(form) {
    jQuery(".error").remove();
    person["firstname"] = jQuery("#firstname").val();
    person["lastname"] = jQuery("#lastname").val();
    person["email"] = jQuery("#email").val();
    jQuery(".slide:eq(1)").show();
    var nextSlide = jQuery(".slide:eq(1)");
    jQuery(window).scrollTo(jQuery(nextSlide), 800);
    jQuery(".source").val(person["source"]);
    jQuery(".subsource").val(person["subsource"]);
    var pageUrl = window.location.pathname;
    if (typeof ga !== "undefined" && ga !== null) {
        ga("gtm1.send", "event", "scrolling-signup", "signup-sent", pageUrl)
    }
    jQuery.post(jQuery(form).attr("action"), jQuery(form).serialize(), function(response) {
        if (response.status === "success") {
            if (typeof ga !== "undefined" && ga !== null) {
                ga("gtm1.send", "event", "scrolling-signup", "signup-success", pageUrl)
            }
            if (typeof fbq !== "undefined" && fbq !== null) {
                fbq("track", "CompleteRegistration", {
                    content_name: pageUrl
                })
            }
        }
        jQuery("#initial-signup").trigger("signupSubmitComplete")
    });
    jQuery("h1, h2, h3, p").each(function() {
        jQuery(this).html(jQuery(this).html().replace("firstname", person["firstname"]));
        jQuery(this).html(jQuery(this).html().replace("Firstname", person["firstname"]))
    });
    jQuery("#initial-signup input[type=submit]").prop("disabled", true).addClass("disabled");
    setTimeout(function() {
        jQuery("#initial-signup input[type=submit]").prop("disabled", false).removeClass("disabled")
    }, 1500)
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ""
}
function hideOptOutIfAnsweredPreviously() {
    if (jQuery(".phone-opt-out").length > 0 || jQuery("#phone-opt-out").length > 0) {
        jQuery(".opt-out-input").hide();
        if (getCookie("guid")) {
            var guid = getCookie("guid");
            jQuery.getJSON("https://secure.greenpeace.org.uk/page/graph/loe/" + guid, function(graph) {
                var answeredOptIn = graph.group_phone_contact_opt_in;
                if (!answeredOptIn) {
                    jQuery(".opt-out-input").show()
                }
            })
        } else {
            jQuery(".opt-out-input").show()
        }
    }
}
// BEGIN DONATE CODE
var generateDonateUrls = function() {
    // get the subsource
    var subsource = getSubsource(person["subsource"], person["tysource"]);
    person.ref = getPersonRef(person.ref, subsource, defaultRef);
    // get the donate values
    donateValArray = getDonateValuesArray(donationAmounts);
    cashDonateValArray = typeof cashDonationAmounts !== "undefined" ? getDonateValuesArray(cashDonationAmounts) : getDonateValuesArray(donationAmounts);
    // update the DD buttons
    updateDirectDebitButtons();
    // update the cash buttons
    updateCashButtons();
};
function updateDirectDebitButtons() {
    // build DD url
    var thisSourcedLink = getDdUrl(ddDonationUrl, person["ref"]);
    // loop through the buttons
    jQuery(".dd-section .donate-button").each(function(i) {
        if (donateValArray[i]) {
            var fullLink = thisSourcedLink;
            if (i <= 4) {
                // add selected amount
                fullLink = AddSelectedAmountToUrl(thisSourcedLink, donateValArray[i]);
                // update the button text
                updateButtonText(this, donateValArray[i]);
            }
        }
        // update the button href
        updateButtonHref(this, fullLink);
    });
}
function updateCashButtons() {
    // build cash URL
    var thisSourcedLink = getCashUrl(cashDonationUrl, person["ref"])
    jQuery(".cash-button").attr("href", thisSourcedLink);
    // loop through cash urls
    jQuery(".cash-section .donate-button").each(function(i) {
        if (cashDonateValArray[i]) {
            var fullLink = thisSourcedLink;
            if (i <= 4) {
                // add selected amount
                fullLink = AddSelectedAmountToUrl(thisSourcedLink, cashDonateValArray[i])
                // update button text
                updateButtonText(this, cashDonateValArray[i]);
            }
        }
        // update button link
        updateButtonHref(this, fullLink);
    })
}
function getSubsource(subsource, tysource) {
    var code = subsource;
    if (tysource) {
        subsource = tysource;
    }
    return code;
}
function getPersonRef(personRef, subsource, defaultRef) {
    var ref = personRef;
    if (ref === "") {
        ref = subsource
    }
    if (ref === "") {
        if (typeof defaultRef !== "undefined" && defaultRef) {
            ref = defaultRef
        }
    }
    return ref;
}
function getDdUrl(base, code) {
    if (isIraiser()) {
        var url = base + "?frequency=regular&reserved_approach_code=" + code;
        for (let i = 0; i < donateValArray.length; i++) {
            url += '&regular_grid[]=' + donateValArray[i] + '00';
        }
    } else {
        var donateString = donateValArray.toString();
        donateString = donateString.replace(/,/g, "x");
        var url = base + "?ref=" + code + "&amounts=" + donateString;
    }
    return url;
}
function getCashUrl(base, code) {
    if (isIraiser()) {
        var url = base + "?reserved_approach_code=" + code;
        for (let i = 0; i < cashDonateValArray.length; i++) {
            url += '&once_grid[]=' + cashDonateValArray[i] + '00';
        }
    } else {
        var cashDonateString = cashDonateValArray.toString();
        cashDonateString = cashDonateString.replace(/,/g, "x");
        var url = base + "?source=" + person.source + "&subsource=" + code + "#amounts=" + cashDonateString;
    }
    return url;
}
function AddSelectedAmountToUrl(url, amount) {
    if (isIraiser()) {
        return url + "&amount=" + amount + '00';
    } else {
        return url + "&default_amt=" + amount;
    }
}
function updateButtonText(button, amount) {
    jQuery(button).html("£" + amount);
}
function updateButtonHref(button, url) {
    jQuery(button).attr("href", url);
}
function isIraiser() {
    if (typeof DonateProvider !== "undefined" && DonateProvider == 'iraiser') {
        return true;
    } else {
        return false;
    }
}
// END DONATE CODE
var addPhoneOptOutIfDefined = function() {
    var selector = "form#signup label.field:contains('Phone opt-out')";
    var optOutID = jQuery(selector).parent("div").next("div.input").children("input").attr("id");
    if (typeof optOutID !== "undefined" && optOutID && optOutID !== "") {
        jQuery(".postal-warning").remove();
        jQuery("#phone-opt-out").appendTo("#initial-signup").show();
        jQuery(".opt-out-label").attr("for", optOutID);
        jQuery(".opt-out-field").attr("id", optOutID);
        jQuery(".opt-out-field").attr("name", optOutID)
    }
};
var signupCounterModuleInit = function() {
    var returnedDataCount = 0,
        totalSignitures = 0,
        target = 0,
        signupApiQuery = "";
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    var renderCounter = function() {
        if (typeof counterOffset !== "undefined" && counterOffset) {
            counterOffset = parseFloat(counterOffset);
            totalSignitures += counterOffset
        }
        if (totalSignitures < 1e3) {
            return false
        }
        jQuery(".slide:eq(0) .signup-cta:eq(0)").append(jQuery('<span id="counter-label" style="display:inline-block;">' + numberWithCommas(totalSignitures) + " have signed. Help reach " + numberWithCommas(target) + ".</span>"))
    };
    function getRoundUp(value, multiple) {
        return Math.ceil((value + 1) / multiple) * multiple;
    }
    var calculateTarget = function(signatures) {
        switch (true) {
            case signatures < 25000:
                // nearest 5,000
                var target = getRoundUp(signatures, 5000);
                break;
            case signatures < 150000:
                // nearest 25,000
                var target = getRoundUp(signatures, 25000);
                break;
            case signatures < 300000:
                // nearest 50,000
                var target = getRoundUp(signatures, 50000);
                break;
            case signatures < 1000000:
                // nearest 100,000
                var target = getRoundUp(signatures, 100000);
                break;
            case signatures >= 1000000:
                // nearest 500,000
                var target = getRoundUp(signatures, 500000);
                break;
            default:
            //
        }
        return target;
    };
    for (var i = 0; i < counterIDs.length; i++) {
        signupApiQuery += i === 0 ? "?id[]=" : "&id[]=";
        signupApiQuery += counterIDs[i]
    }
    jQuery.get("https://greenpeace-api.appspot.com/form/count" + signupApiQuery, function(data) {
        totalSignitures = parseInt(data.unique_count);
        target = calculateTarget(totalSignitures);
        renderCounter()
    })
};
var hideMoreInfoDropdownIfNoCopy = function() {
    if (jQuery("#more-info-text").html() == false) {
        jQuery(".dropdown-cont").hide()
    }
};
var showCashSectionIfAlreadyDD = function() {
    if (getCookie("guid")) {
        var guid = getCookie("guid");
        jQuery.getJSON("https://secure.greenpeace.org.uk/page/graph/loe/" + guid, function(graph) {
            if (typeof graph["group_Post-donate_page_DD_upsell_exclusions"] !== "undefined" && graph["group_Post-donate_page_DD_upsell_exclusions"] != false) {
                jQuery(".dd-section, .dd-content").hide();
                jQuery(".cash-section, .cash-content").show()
            } else {
                jQuery(".dd-section, .dd-content").show();
                jQuery(".cash-section, .cash-content").hide()
            }
        })
    } else {
        jQuery(".dd-section, .dd-content").show();
        jQuery(".cash-section, .cash-content").hide()
    }
};
var changeYesNoOptionFraming = function() {
    if (typeof optionChoice !== "undefined" && optionChoice === "donate") {
        jQuery(".slide:eq(3)").after(jQuery(".slide:eq(2)"));
        jQuery(".cash-section").after(jQuery('<a class="button skip" href="javascript:;">Skip</a>'));
        jQuery(".slide3 .skip").on("click", function() {
            jQuery(".slide2").show();
            var nextSlide = jQuery(".slide2");
            jQuery(window).scrollTo(jQuery(nextSlide), 800)
        });
        jQuery(".slide2 .skip").hide();
        jQuery(".share-option").hide();
        jQuery(".donate-option").show()
    }
};
jQuery(function() {
    jQuery("#signupheader").next("br").remove();
    jQuery(".slide").hide();
    if (isThankYouPage()) {
        var pageUrl = window.location.pathname;
        if (typeof fbq !== "undefined" && fbq !== null) {
            fbq("track", "CompleteRegistration", {
                content_name: pageUrl
            })
        }
        setTimeout(function() {
            if (typeof ga === "function") {
                ga("gtm1.send", "event", "scrolling-signup", "signup-one-click", pageUrl)
            }
        }, 2e3);
        var guid = getCookie("guid");
        if (guid != "") {
            console.log("Guid");
            jQuery.getJSON("https://secure.greenpeace.org.uk/page/graph/" + guid, function(graph) {
                person["firstname"] = graph["firstname"];
                jQuery("h1, h2, h3, p").each(function() {
                    jQuery(this).html(jQuery(this).html().replace("firstname", person["firstname"]));
                    jQuery(this).html(jQuery(this).html().replace("Firstname", person["firstname"]))
                });
                jQuery(".slide:eq(1)").show()
            })
        } else {
            setTimeout(function() {
                jQuery("h1, h2, h3, p").each(function() {
                    jQuery(this).html(jQuery(this).html().replace("firstname", ""));
                    jQuery(this).html(jQuery(this).html().replace("Firstname", ""))
                });
                jQuery(".slide:eq(1)").show()
            }, 100)
        }
    } else {
        jQuery(".slide:eq(0)").show()
    }
    jQuery(window).resize(function() {
        var newHeight = jQuery(window).height();
        jQuery(".slide").css("min-height", newHeight + "px");
        if (jQuery(window).width() < 753) {
            jQuery(".slide").css("background-image", "none");
            jQuery("body").css("background-image", "none")
        } else {
            if (getObjectSize(backgroundImages) === 4) {
                for (var i = 0; i < 4; i++) {
                    jQuery(".slide").eq(i).css("background-image", "url(" + backgroundImages["slide" + (i + 1)] + ")")
                }
            } else {
                jQuery("body").css("background-image", "url(" + backgroundImages["slide1"] + ")")
            }
        }
    });
    jQuery(window).trigger("resize");
    jQuery(".skip").click(function() {
        var nextSlide = jQuery(this).closest(".slide").next();
        nextSlide.show();
        jQuery(window).scrollTo(jQuery(nextSlide), 800)
    });
    jQuery("input[type=text]").change(function() {
        if (jQuery(this).val() != "") {
            jQuery(this).addClass("full")
        } else {
            jQuery(this).removeClass("full")
        }
    });
    jQuery(".slide:eq(2) .input:eq(0)").css("margin-top", "10px");
    jQuery("#initial-signup").validate({
        submitHandler: function(form, e) {
            if (jQuery("#email").val() !== "" || jQuery("#phone").val() !== "" || jQuery("#zip").val() !== "") {
                e.preventDefault();
                initialSignup(form);
                jQuery("#initial-signup").trigger("signupSuccess")
            } else {
                jQuery(".error").remove();
                jQuery("#zip").after(jQuery('<label class="error" style="width: 26em; margin: 0 auto; margin-top: 10px;">Please leave your postcode so we can verify your petition signup</label>'));
                jQuery("#zip-cont .glyphicon").remove()
            }
        },
        rules: {
            firstname: "required",
            lastname: {
                required: true
            }
        },
        messages: {
            firstname: "Please enter your first name",
            lastname: "Please enter your last name"
        }
    });
    prepopulate();
    if (typeof paidShareUrl !== "undefined" && paidShareUrl) {
        dynamicFbShareApproach()
    }
    jQuery("#bag-signup .form-control").not("#autocomplete").change(function() {
        validateSignupForm(this)
    });
    jQuery("#initial-signup .form-control").not("#autocomplete").change(function() {
        validateSignupForm(this, "initial")
    });
    jQuery(".option-question").on("click", "button", function() {
        var pageUrl = window.location.pathname;
        if (jQuery(this).attr("id") === "yes-option") {
            jQuery(".slide:eq(2)").show();
            var nextSlide = jQuery(".slide:eq(2)");
            jQuery(window).scrollTo(jQuery(nextSlide), 800);
            if (typeof ga !== "undefined" && ga !== null) {
                ga("gtm1.send", "event", "scrolling-signup", "selected-option-yes", pageUrl)
            }
        } else if (jQuery(this).attr("id") === "no-option") {
            jQuery(".slide:eq(3)").show();
            var nextSlide = jQuery(".slide:eq(3)");
            jQuery(window).scrollTo(jQuery(nextSlide), 800);
            if (typeof ga !== "undefined" && ga !== null) {
                ga("gtm1.send", "event", "scrolling-signup", "selected-option-no", pageUrl)
            }
        }
    });
    function dynamicFbShareApproach() {
        if (person.subsource === "") {
            if (typeof defaultRef !== "undefined" && defaultRef) {
                var approachCode = defaultRef
            }
        } else {
            var approachCode = person.subsource
        }
        var approachBaseUrl = "https://greenpeace-api.appspot.com/approaches/";
        var thisUrl = "https://greenpeace-api.appspot.com/approaches/" + approachCode;
        jQuery.ajax({
            type: "GET",
            url: thisUrl,
            dataType: "json",
            success: function(response) {
                console.log(response);
                if (response.approach.is_paid == 1) {
                    shareUrl = paidShareUrl
                }
                console.log(shareUrl)
            },
            error: function(xhr, textStatus, error) {
                console.log(xhr.status);
                console.log(xhr.responseJSON)
            }
        })
    }
    jQuery(".share-click").click(function() {
        var pageUrl = window.location.pathname;
        if (typeof ga !== "undefined" && ga !== null) {
            ga("gtm1.send", "event", "scrolling-signup", "share", pageUrl)
        }
        var url = "https://www.facebook.com/sharer/sharer.php?u=" + shareUrl;
        jQuery(".slide:eq(3)").show();
        var nextSlide = jQuery(".slide:eq(3)");
        jQuery(window).scrollTo(jQuery(nextSlide), 800);
        var win = window.open(url, "_blank");
        win.focus()
    });
    if (getParameterByName("select") != "" && person["firstname"] && person["lastname"] && person["email"]) {
        jQuery("#first-submit").trigger("click")
    }
    jQuery(".donate-button").click(function() {
        var pageUrl = window.location.pathname;
        if (typeof ga !== "undefined" && ga !== null) {
            ga("gtm1.send", "event", "scrolling-signup", "donate", pageUrl)
        }
    });
    jQuery(".slide").on("click", ".dropdown-cont .button.expand", function() {
        jQuery(this).next(".dropdown").slideToggle();
        jQuery(this).find("i").toggleClass("rotate180")
    });
    jQuery(".slide").on("click", ".dropdown-cont .btn-close", function() {
        jQuery(this).parent(".dropdown").slideToggle();
        jQuery(this).closest(".dropdown-cont").find(".fa").toggleClass("rotate180")
    });
    jQuery(".signup-header-wrap").on("click", function() {
        if (jQuery(window).width() <= 767) {
            jQuery(window).scrollTo(jQuery("#initial-signup").offset().top - jQuery("nav.navbar").height(), 800)
        }
    });
    if (typeof jQuery("#more-info-text").html() !== "undefined") {
        jQuery(".dropdown-cont").show()
    }
    if (typeof progressTracker === "undefined" || progressTracker !== false) {
        var progressContainerDiv = "";
        if (typeof optionChoice !== "undefined" && optionChoice === "donate") {
            progressContainerDiv = '<div class="progress-container-div progress-tracker-display"><div class="progress-block" id="progress-block-signed"><div class="progress-mark"><img class="mark-yes" src="https://secure.greenpeace.org.uk/page/-/progress-tracker-test/checkmark.png"></div><div class="progress-label">Signed</div></div><div class="progress-block" id="progress-block-donated"><div class="progress-mark"><img class="mark-yes" src="https://secure.greenpeace.org.uk/page/-/progress-tracker-test/checkmark.png"><img class="mark-no" src="https://secure.greenpeace.org.uk/page/-/progress-tracker-test/x2.png"></div><div class="progress-label">£</div></div><div class="progress-block" id="progress-block-shared"><div class="progress-mark"><img class="mark-yes" src="https://secure.greenpeace.org.uk/page/-/progress-tracker-test/checkmark.png"><img class="mark-no" src="https://secure.greenpeace.org.uk/page/-/progress-tracker-test/x2.png"></div><div class="progress-label">Shared</div></div></div>'
        } else {
            progressContainerDiv = '<div class="progress-container-div progress-tracker-display"><div class="progress-block" id="progress-block-signed"><div class="progress-mark"><img class="mark-yes" src="https://secure.greenpeace.org.uk/page/-/progress-tracker-test/checkmark.png"></div><div class="progress-label">Signed</div></div><div class="progress-block" id="progress-block-shared"><div class="progress-mark"><img class="mark-yes" src="https://secure.greenpeace.org.uk/page/-/progress-tracker-test/checkmark.png"><img class="mark-no" src="https://secure.greenpeace.org.uk/page/-/progress-tracker-test/x2.png"></div><div class="progress-label">Shared</div></div><div class="progress-block" id="progress-block-donated"><div class="progress-mark"><img class="mark-yes" src="https://secure.greenpeace.org.uk/page/-/progress-tracker-test/checkmark.png"></div><div class="progress-label">£</div></div></div>'
        }
        jQuery(".navbar-header").append(progressContainerDiv);
        jQuery(".progress-container-div").hide();
        jQuery("body").addClass("tracker-top");
        jQuery(".share-click, .button.mail, .whatsapp.button").click(function() {
            jQuery("#progress-block-shared").removeClass("progress-block-crossed");
            jQuery("#progress-block-shared").addClass("progress-block-checked")
        });
        jQuery(".donate-button").click(function() {
            jQuery("#progress-block-donated").addClass("progress-block-checked")
        });
        jQuery("#initial-signup").on("signupSuccess", function() {
            jQuery(".progress-tracker-display").fadeIn();
            jQuery("#progress-block-signed").addClass("progress-block-checked")
        });
        if (typeof optionChoice !== "undefined" && optionChoice === "donate") {
            jQuery("#no-option").click(function() {
                if (!jQuery("#progress-block-donated").hasClass("progress-block-checked")) {
                    jQuery("#progress-block-donated").addClass("progress-block-crossed")
                }
            })
        } else {
            jQuery("#no-option").click(function() {
                if (!jQuery("#progress-block-shared").hasClass("progress-block-checked")) {
                    jQuery("#progress-block-shared").addClass("progress-block-crossed")
                }
            })
        }
        jQuery(".slide2 .skip").click(function() {
            if (!jQuery("#progress-block-shared").hasClass("progress-block-checked")) {
                jQuery("#progress-block-shared").addClass("progress-block-crossed")
            }
        });
        jQuery(".slide3 .skip").click(function() {
            if (!jQuery("#progress-block-donated").hasClass("progress-block-checked")) {
                jQuery("#progress-block-donated").addClass("progress-block-crossed")
            }
        });
        if (typeof optionChoice !== "undefined" && optionChoice === "donate") {
            jQuery("#yes-option").click(function() {
                jQuery("#progress-block-donated").removeClass("progress-block-crossed")
            })
        } else {
            jQuery("#yes-option").click(function() {
                jQuery("#progress-block-shared").removeClass("progress-block-crossed")
            })
        }
    }
    generateDonateUrls();
    addPhoneOptOutIfDefined();
    hideOptOutIfAnsweredPreviously();
    signupCounterModuleInit();
    hideMoreInfoDropdownIfNoCopy();
    changeYesNoOptionFraming();
    showCashSectionIfAlreadyDD();
    addDonorElement();
    if (typeof pageSpecificJS === "function") {
        pageSpecificJS()
    }
});