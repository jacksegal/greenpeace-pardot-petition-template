FormEvents = {
    scrollTo: function () {
      $("[data-scroll-to]").click(function() {
          var destination = $(this).attr('data-scroll-to');
          $(destination).show();
          $(window).scrollTo($(destination), 800);

          // Dispatch Event
          var event = new CustomEvent('pageScroll', {'detail': destination});
          document.dispatchEvent(event);
      });
    },
    formSubmit: function () {
        FormSubmit.addCustomRule();
        $( "#pardot-form" ).validate({
            submitHandler: function(form, event) {
                event.preventDefault();
                PardotForm.constructFormFields();
                FormSubmit.submitAjax(form);
            },
            rules: FormSubmit.getRules(),
            messages: FormSubmit.getMessages()
        });
    },
    shareClick: function () {
        $('[data-share-button]').click(function(e) {
            /* Open Link in New Tab */
            e.preventDefault();
            if( $(this).attr('data-share-medium') === 'email' ) {
                location.href = $(this).attr('href');
            } else {
                window.open($(this).attr('href'), 'shareWindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
            }

            ProgressSteps.tickShare();

            // Dispatch Event
            var event = new CustomEvent('share', {'detail': $(this).data('share-medium')});
            document.dispatchEvent(event);
        });
    },
    skipClick: function () {
        $('[data-skip-ask="true"]').click(function(e) {
            ProgressSteps.crossShare();

            // Dispatch Event
            var event = new CustomEvent('skipAsk');
            document.dispatchEvent(event);
        });
    },
    askClick: function() {
        $('[data-ask-button="true"]').click(function(e) {
            if(this.getAttribute('data-ask-answer') == 'no' ) {
                ProgressSteps.crossShare();
            }

            // Dispatch Event
            var event = new CustomEvent('askAnswer', {'detail': this.getAttribute('data-ask-answer')});
            document.dispatchEvent(event);
        });
    },
    donateClick: function () {
        $('[data-donate-button="true"]').click(function(e) {
            ProgressSteps.tickDonate();

            // Dispatch Event
            var event = new CustomEvent('donateClick', {'detail': {
                'type': this.getAttribute('data-donate-type'),
                'amt': this.innerText,
            }});
            document.dispatchEvent(event);
        });
    },
    showClick: function () {
        $("button[data-show]").click(function() {
            var destination = $(this).attr('data-show');
            var result = $(destination).toggleClass('hidden').hasClass('hidden');
            $(this).find('.read-more-icon').toggleClass('hidden');

            // Dispatch Event
            var event = new CustomEvent('showClick', {'detail': result});
            document.dispatchEvent(event);
        });
    }
};