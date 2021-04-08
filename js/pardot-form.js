PardotForm = {
    getUrlVars: function() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
            function(m,key,value) {
                vars[key] = value;
            });
        return vars;
    },
    getFormId: function() {
        var parser = document.createElement('a');
        var form = document.querySelector('#pardot-form');
        if(form) {
            parser.href = form.getAttribute('action');
            return parser.pathname.split( '/' )[2];
        } else {
            return 0;
        }
    },
    removeEmailRequirement: function() {
        var element = document.querySelector(".email input");

        if(element) {
            element.setAttribute("onchange", "");
        }
    },
    clearFormFieldValues: function() {
        //TODO: also save them to a Var for later use?
        //TODO: Add a "data-only" class that saves data and hides element
        //TODO: Check other inputs - radios / checkboxes / etc
        var inputElements = document.getElementsByTagName("input");
        for (var i=0; i < inputElements.length; i++) {
            if (inputElements[i].type == "text" || inputElements[i].type == "email") {
                inputElements[i].value = "";
            }
        }
        var textareaElements = document.getElementsByTagName("textarea");
        for (var i=0; i < textareaElements.length; i++) {
            textareaElements[i].value = "";
        }
    },
    addCssToForm: function() {
        var textInputs = document.querySelectorAll('.pd-text input');
        textInputs.forEach(function(textInput) {
            textInput.classList.add("form-control");
        });

        var selects = document.querySelectorAll('.pd-select select');
        selects.forEach(function(select) {
            select.classList.add("form-control");
        });

        var checkboxes = document.querySelectorAll('.pd-checkbox span.value span, .pd-radio span.value span');
        checkboxes.forEach(function(checkbox) {
            checkbox.classList.add("form-check");
        });

        var checkboxLabels = document.querySelectorAll('.pd-checkbox span.value input, .pd-radio span.value input');
        checkboxLabels.forEach(function(checkboxLabel) {
            checkboxLabel.classList.add("form-check-label");
        });

        var checkboxInputs = document.querySelectorAll('.pd-checkbox span.value input, .pd-radio span.value input');
        checkboxInputs.forEach(function(checkboxInput) {
            checkboxInput.classList.add("form-check-input");
        });
    },
    getApproachCode: function() {
        // Get Approach Code from URL
        if(this.getUrlVars()['approach_code']) {
            return this.getUrlVars()['approach_code'];
        }

        // Accept subsource for legacy
        if(this.getUrlVars()['subsource']) {
            return this.getUrlVars()['subsource'];
        }

        // Fallback to page default
        if(PageOptions.defaultApproachCode && PageOptions.defaultApproachCode != '') {
            return PageOptions.defaultApproachCode;
        }

        // Last resort: generic fallback
        return 'GOMONAOTUN015K';
    },
    addApproachCodeToDonateButtons: function() {
        $('[data-donate-button="true"]').each(function(){
            this.href += '&reserved_approach_code=' + PardotForm.getApproachCode();
        });
    },
    isDDGiver: function() {
        var element = document.querySelector(".Live_Direct_Debit input");

        if(element && element.value === "Yes") {
            return true;
        } else {
            return false;
        }
    },
    changeDonateAskToSingle: function() {
        $('[data-scroll-to="#donate-monthly-section"]').attr('data-scroll-to', '#donate-single-section');
    },
    constructFormFields: function() {
        $("#pardot-form").hide();
        this.populateEmailAddress();
        this.populateJoinCampaign();
        this.populateFormResponse();
        if(OneClick.isOneClick()) {
            this.populateOneClickFormCompletions();
        }
    },
    populateEmailAddress: function() {
        var email = document.querySelector(".email input");
        email.value = this.getEmailAddress();
    },
    populateFormResponse: function() {
        var formResponse = document.querySelector(".Form_Responses input");

        if(formResponse) {
            var data = [
                {name: 'form_id', value: this.getFormId()},
                {name: 'approach_code', value: this.getApproachCode()},
                {name: 'first_name', value: document.querySelector(".first_name input").value || ''},
                {name: 'last_name', value: document.querySelector(".last_name input").value || ''},
                {name: 'email', value: this.getEmailAddress()},
                {name: 'phone', value: document.querySelector(".phone input").value || ''},
                {name: 'email_opt_in', value: OneClick.isOneClick() ? '0' : this.getEmailOptIn()},
                {name: 'phone_opt_in', value: OneClick.isOneClick() ? '0' : this.getPhoneOptIn()},
                {name: 'postcode', value: document.querySelector(".zip input").value || ''},
                {name: 'created_date', value: moment().format('YYYY-MM-DD HH:mm:ss')},
            ];

            if(formResponse.value !== '') {
                var newFormResponse = formResponse.value;
            } else {
                var newFormResponse = '';
            }

            for (var i = 0; i < data.length; i++) {
                if(data.length - i !== 1) {
                    newFormResponse += data[i].name + '=' + this.removeIllegalChars(data[i].value) + '|';
                } else {
                    newFormResponse += data[i].name + '=' + this.removeIllegalChars(data[i].value) + ';';
                }
            }

            formResponse.value = newFormResponse;

            console.group("%cForm Response", "color: #241C15; background-color: #FF00F0; padding: 4px; font-weight: 400;");
            console.log("Original:\t", formResponse);
            console.log("Data:\t", data);
            console.log("New:\t", newFormResponse);
            console.groupEnd();
        } else {
            console.group("%cForm Response", "color: #241C15; background-color: #FE576F; padding: 4px; font-weight: 400;");
            console.log("Error:\t", "No Form_Responses field");
            console.groupEnd();
        }
    },
    populateJoinCampaign: function() {
        var joinCampaign = document.querySelector(".Join_Campaign input");
        var formHandlerApproachCode = document.querySelector(".Form_Handler_Approach_Code input");
        if(joinCampaign && joinCampaign.value === '' && formHandlerApproachCode && formHandlerApproachCode.value === '') {
            joinCampaign.value = this.getApproachCode();
        }
    },
    populateOneClickFormCompletions: function() {
        var oneClickFormCompletions = document.querySelector(".One_Click_Form_Completions input");
        if(oneClickFormCompletions) {
            if(oneClickFormCompletions.value !== '') {
                var newOneClickFormCompletions = oneClickFormCompletions.value + '-' + this.getFormId();
            } else {
                var newOneClickFormCompletions = this.getFormId();
            }
            oneClickFormCompletions.value = newOneClickFormCompletions;

            console.group("%cOne Click Form Completions", "color: #241C15; background-color: #FF00F0; padding: 4px; font-weight: 400;");
            console.log("Original:\t", oneClickFormCompletions.value);
            console.log("FormId:\t", this.getFormId());
            console.log("New:\t", newOneClickFormCompletions);
            console.groupEnd();
        } else {
            console.group("%cOne Click Form Completions", "color: #241C15; background-color: #FE576F; padding: 4px; font-weight: 400;");
            console.log("Error:\t", "No One_Click_Form_Completions field");
            console.groupEnd();
        }
    },
    removeIllegalChars: function(str) {
        return str
            .replace('|','')
            .replace(';','')
            .replace("'",'')
            .replace('"','')
            .replace(',','');
    },
    getEmailOptIn: function() {
        if(document.querySelector(".email input") && document.querySelector(".email input").value != '') {
            return '1';
        } else {
            return '0';
        }
    },
    getPhoneOptIn: function() {
        if(document.querySelector(".phone input") && document.querySelector(".phone input").value != '') {
            return '1';
        } else {
            return '0';
        }
    },
    getEmailAddress: function() {
        if(document.querySelector(".email input") && document.querySelector(".email input").value != '') {
            return document.querySelector(".email input").value;
        } else {
            return "temp_email_"+Date.now()+"_"+Math.random().toString(36).substr(2, 5)+"@greenpeace.org";
        }
    },
    labelsToPlaceholders: function(inputs) {
        inputs.forEach(function(input) {
            $(input).each(function(){
                var input = $(this).find('input');
                var label = $(this).find('label');
                var labelText = label.text();
                input.attr('placeholder', labelText);
                label.hide();
            });
        });
    },
    updateFacebookShareLinkIfPaid: function() {
        var approachBaseUrl = "https://greenpeace-api.appspot.com/approaches/";
        var approachCode = this.getApproachCode();
        var thisUrl = "https://greenpeace-api.appspot.com/approaches/" + approachCode;
        jQuery.ajax({
            type: "GET",
            url: thisUrl,
            dataType: "json",
            success: function(response) {
                if (response.approach.is_paid == 1) {
                    $('[data-share-medium="facebook"]').attr('href', 'https://www.facebook.com/sharer/sharer.php?u='+PageOptions.paidFbShareLink);
                }
                console.group("%cApproach Code API", "color: #241C15; background-color: #FF00F0; padding: 4px; font-weight: 400;");
                console.log("Status:\t", "success");
                console.log("approachCode:\t", approachCode);
                console.log("Response:\t", response);
                console.groupEnd();
            },
            error: function(xhr, textStatus, error) {
                console.group("%cApproach Code API", "color: #241C15; background-color: #FE576F; padding: 4px; font-weight: 400;");
                console.log("Status:\t", "error");
                console.log("approachCode:\t", approachCode);
                console.log("xhr:\t", xhr);
                console.log("textStatus:\t", textStatus);
                console.log("error:\t", error);
                console.groupEnd();
            }
        })
    },
};

OneClick = {
    isOneClick: function() {
        if( this.supporterIsEligible() && this.paramIsPresent && this.supporterHasntSubmited() ) {
            return true;
        } else {
            return false;
        }
    },
    supporterIsEligible: function() {
        var element = document.querySelector(".One_Click_Supporter input");

        if(element && element.value === "Yes") {
            return true;
        } else {
            return false;
        }
    },
    paramIsPresent: function() {
        if(PardotForm.getUrlVars()["one_click"] && PardotForm.getUrlVars()["one_click"] === "true") {
            return true;
        } else {
            return false;
        }
    },
    supporterHasntSubmited: function() {
        var submittedForms = document.querySelector(".One_Click_Form_Completions input");

        if(submittedForms && submittedForms.value) {
            var FormId = PardotForm.getFormId();
            var locat = submittedForms.value.indexOf(FormId);

            if (locat == -1) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
};

FormSubmit = {
    submitAjax: function(form) {
        $.post($(form).attr('action'), $(form).serialize()).done(function(data){
            FormSubmit.onSuccess();

            console.group("%cForm Submission", "color: #241C15; background-color: #FF00F0; padding: 4px; font-weight: 400;");
            console.log("Status:\t","Success");
            console.log("Data:\t",data);
            console.log(data);
            console.groupEnd();
        }).fail(function(data){
            FormSubmit.onError();

            console.group("%cForm Submission", "color: #241C15; background-color: #FE576F; padding: 4px; font-weight: 400;");
            console.log("Status:\t","Fail");
            console.log("Data:\t",data);
            console.groupEnd();
        });
    },
    onSuccess: function() {
        // Show firstname
        var firstname = document.querySelector(".first_name input");
        if(firstname && firstname.value != '') {
            $('.supporter-first-name').text(firstname.value);
        }

        // Next ask
        var destination = '#share-ask-section';
        $(destination).show();
        $(window).scrollTo($(destination), 800);

        // Dispatch Event
        var event = new CustomEvent('pageScroll', {'detail': destination});
        document.dispatchEvent(event);

        // Progress Steps
        $(".progress-container-div").fadeIn();

        // Dispatch Event
        var event = new CustomEvent('petitionSuccess');
        document.dispatchEvent(event);
    },
    onError: function() {
        window.location.replace(window.location.href);
    },
    getRules: function() {
        var rules = {};
        rules[document.querySelector(".first_name input").getAttribute('name')] = {required: true};
        rules[document.querySelector(".last_name input").getAttribute('name')] = {required: true};
        rules[document.querySelector(".zip input").getAttribute('name')] = {isValidPetition: true};
        rules[document.querySelector(".email input").getAttribute('name')] = {email: true};
        return rules;
    },
    getMessages: function() {
        var messages = {};
        messages[document.querySelector(".first_name input").getAttribute('name')] = "Please enter your first name\n";
        messages[document.querySelector(".last_name input").getAttribute('name')] = "Please enter your last name\n";
        return messages;
    },
    addCustomRule: function () {
        $.validator.addMethod("isValidPetition", function(value, element) {
            if($('.email input').val() || $('.phone input').val() || $('.zip input').val() ) {
                return true;
            } else {
                return false;
            }
        }, "Please leave your postcode so we can verify your petition signup\n");
    }
};

PetitionCounter = {
    init: function(campaigns, offset) {
        // var counterBaseUrl = 'https://uat-gpuk.cs127.force.com/pc/services/apexrest/campaign/petitioncounter/';
        var counterBaseUrl = 'https://gpuk.secure.force.com/pc/services/apexrest/campaign/petitioncounter/';
        var that = this;
        $.ajax({
            type: "GET",
            url: counterBaseUrl + campaigns,
            dataType: "json",
            success: function(response) {
                if (response.petitionCounter && Number.isInteger(response.petitionCounter)) {
                    var count = response.petitionCounter;
                    if(offset && Number.isInteger(offset)){
                        count += offset;
                    }
                    var target = that.getCounterTarget(count);
                    if(count > 1000) {
                        that.updateCounterText(count, target);
                    }
                    console.group("%cPetition Counter", "color: #241C15; background-color: #FF00F0; padding: 4px; font-weight: 400;");
                    console.log("Status:\t", 'success');
                    console.log("Response:\t", response);
                    console.log("Count:\t", count);
                    console.log("Target:\t", target);
                    console.groupEnd();
                } else {
                    console.group("%cPetition Counter", "color: #241C15; background-color: #FF00F0; padding: 4px; font-weight: 400;");
                    console.log("Status:\t", 'success');
                    console.log("Response:\t", response);
                    console.groupEnd();
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.group("%cPetition Counter", "color: #241C15; background-color: #FE576F; padding: 4px; font-weight: 400;");
                console.log("Status:\t", 'error');
                console.log("XMLHttpRequest:\t", XMLHttpRequest);
                console.log("textStatus:\t", textStatus);
                console.log("errorThrown:\t", errorThrown);
                console.groupEnd();
            }
        });
    },
    getCounterTarget: function(count) {
        switch (true) {
            case count < 25000:
                // nearest 5,000
                var target = this.getRoundUp(count, 5000);
                break;
            case count < 150000:
                // nearest 25,000
                var target = this.getRoundUp(count, 25000);
                break;
            case count < 300000:
                // nearest 50,000
                var target = this.getRoundUp(count, 50000);
                break;
            case count < 1000000:
                // nearest 100,000
                var target = this.getRoundUp(count, 100000);
                break;
            case count >= 1000000:
                // nearest 500,000
                var target = this.getRoundUp(count, 500000);
                break;
            default:
            //
        }
        return target;
    },
    getRoundUp: function(value, multiple) {
        return Math.ceil((value + 1) / multiple) * multiple;
    },
    numberWithCommas: function(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    updateCounterText: function(count, target) {
        var that = this;
        $('.petition_no').text(that.numberWithCommas(count));
        $('.petition_target').text(that.numberWithCommas(target));
        $('.petition-counter').fadeIn();
    },
};

ProgressSteps = {
    tickShare: function() {
        $("#progress-block-shared").removeClass("progress-block-crossed");
        $("#progress-block-shared").addClass("progress-block-checked");
    },
    crossShare: function() {
        if (!$("#progress-block-shared").hasClass("progress-block-checked")) {
            $("#progress-block-shared").addClass("progress-block-crossed");
        }
    },
    tickDonate: function() {
        $("#progress-block-donated").addClass("progress-block-checked");
    }
};