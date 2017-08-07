/*

Script  : Subscribe Form
Version : 1.0
Author  : Surjith S M
URI   	: http://themeforest.net/user/surjithctly

Copyright © All rights Reserved
Surjith S M / @surjithctly

*/

$(function() {

    "use strict";

    /* ================================================
   jQuery Validate - Reset Defaults
   ================================================ */

    $.validator.setDefaults({
        ignore: [],
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'small',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if (element.parent('.input-group').length || element.parent('label').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    /* 
    VALIDATE
    -------- */

    $("#subscribeform").submit(function(e) {
        e.preventDefault();
    }).validate({
        rules: {
            /* uncomment if Name is needed */
            /* 
            first_name: "required",
            last_name: "required", 
            */
            email: {
                required: true,
                email: true
            }
        },
        submitHandler: function(form) {

            $("#js-subscribe-btn").attr("disabled", true);

            /* 
             CHECK PAGE FOR REDIRECT (Thank you page)
             ---------------------------------------- */

            var redirect = $('#subscribeform').data('redirect');
            var phpurl   = $('#subscribeform').attr('action');

            var noredirect = false;
            if (redirect == 'none' || redirect == "" || redirect == null) {
                noredirect = true;
            }

            $("#js-subscribe-btn").text('Please wait...');

            /* 
             FETCH SUCCESS / ERROR MSG FROM HTML DATA-ATTR
             --------------------------------------------- */

            var success_msg = $('#js-subscribe-result').data('success-msg');
            var error_msg = $('#js-subscribe-result').data('error-msg');

            var dataString = $(form).serialize();

            /* 
             AJAX POST
             --------- */

            $.ajax({
                type: "POST",
                data: dataString,
                url: phpurl,
                cache: false,
                success: function(d) {
                    $(".form-group").removeClass("has-success");
                    if (d == 'success') {
                        if (noredirect) {
                           $('#js-subscribe-btn').text(success_msg);
                           $('#subscribeform')[0].reset();
                        } else {
                            window.location.href = redirect;
                        }
                    } else {
                        $('#js-subscribe-btn').text(error_msg);  
                        console.log(d);
                    }
                    $("#js-subscribe-btn").attr("disabled", false);
                },
                error: function(d) {
                    $('#js-subscribe-btn').text('Cannot access Server');
                },
                complete: function(d) {
                    setTimeout(function(){
                    $("#js-subscribe-btn").text('Subscribe Now!');
                    $("#js-subscribe-btn").attr("disabled", false);
                }, 3000);
                }
            });
            return false;

        }
    });

});
