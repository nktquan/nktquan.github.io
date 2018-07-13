(function ($) {
    var
        isClick = false,
        _date = null,
        _stringFormatCurrency = function (num) {
            var string = num.toString();
            var new_string = "";
            var dem = 1;
            for (var i = string.length - 1; i >= 0; i--) {
                new_string += string.charAt(i);
                if (dem % 3 == 0 && i != 0) {
                    new_string += ".";
                }
                dem++;
            }
            var final_string = "";
            for (var i = new_string.length - 1; i >= 0; i--) {
                final_string += new_string.charAt(i);
            }
            return final_string;
        },
        _step1 = function (options) {
            $(".bookingroom-list").find("button.home-btn").click(function () {
                var $this = $(this);
                if ($this.hasClass("inactive")) {
                    return false;
                }

                var $form = $('<form/>').appendTo('body');

                $form.attr('action', options.url)
                    .attr('method', 'post')
                    .append('<input type="text" name="roomId" value="' + $this.data('roomid') + '" />')
                    .append('<input type="text" name="startDate" value="' + $('#datetimepicker1 input').val() + '" />')
                    .append('<input type="text" name="startTime" value="' + $('#datetimepicker2 input').val() + '" />')
                    .append('<input type="text" name="endTime" value="' + $('#datetimepicker3 input').val() + '" />')
                    .submit();

                return true;
            });
            $(".select-location").parent().hide();
            if(typeof($(".select-city").data("selected"))!= "undefined"){
                var $locations = $(".select-location").parents("li[data-cityId="+$(".select-city").data("selected")+"]");
                $locations.show();
                _initDatetimePicker();
            }
            $(document).on('click', '.select-city', function () {
                var city_id = $(this).data("cityid");
                $('.dropdown-toggle-city').html($(this).text() + '<span class="caret"><i' +
                    ' class="ti-angle-down"></i></span>');
                $(".select-location").parent().hide();
                var $locations = $(".select-location").parents("li[data-cityId="+city_id+"]");
                $locations.show();
                $('.dropdown-toggle-location').html(options.locationText + '<span class="caret"><i' +
                    ' class="ti-angle-down"></i></span>');

                $(".bookingroom-list").find("button.home-btn").addClass("inactive");
                $(".room-avaitext").hide();
                $(".room-item").hide();

                $('#datetimepicker2').datetimepicker('remove');
                $('#datetimepicker2 input').val('');

                $('#datetimepicker3').datetimepicker('remove');
                $('#datetimepicker3 input').val('');

                $('#datetimepicker1').datetimepicker('remove');
                $('#datetimepicker1 input').val('');


            });
            $(document).on('click', '.select-location', function () {
                var location_id = $(this).parent().data("locationid");
                $("input[name=location_id]").val(location_id);
                $('.dropdown-toggle-location').html($(this).text() + '<span class="caret"><i class="ti-angle-down"></i></span>');
                $(".bookingroom-list").find("button.home-btn").addClass("inactive");
                $(".room-avaitext").hide();
                $(".room-item").hide();
                $(".room-item-location-"+location_id).show();
                _initDatetimePicker();
            });
        },
        _initDatetimePicker = function () {
            $('#datetimepicker2').datetimepicker('remove');
            $('#datetimepicker2 input').val('');

            $('#datetimepicker3').datetimepicker('remove');
            $('#datetimepicker3 input').val('');

            $('#datetimepicker1').datetimepicker('remove');
            $('#datetimepicker1 input').val('');

            $('#datetimepicker2').datetimepicker('setStartDate', new Date());
            $('#datetimepicker3').datetimepicker('setStartDate', new Date());
            $('#datetimepicker1').datetimepicker({
                weekStart: 1,
                todayBtn: 1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                minView: 2,
                forceParse: 0,
                showMeridian: 0,
                startDate: new Date()
            }).on('show', function () {
                if ($('.staticpage-banner-sect').hasClass('lg-banner') == true) {
                    $('.datetimepicker.dropdown-menu').addClass('mgrtop');
                    $(this).datetimepicker('setStartDate', new Date());
                }
            }).on('changeDate', function (ev) {
                $('#datetimepicker2').datetimepicker('remove');
                $('#datetimepicker2 input').val('');

                $('#datetimepicker3').datetimepicker('remove');
                $('#datetimepicker3 input').val('');

                $(".bookingroom-list").find("button.home-btn").addClass("inactive");

                _date = new Date(ev.date.getTime());
                var _startTime = new Date(ev.date.getTime());
                _startTime.setDate(_startTime.getDate());
                _startTime.setHours(8);
                _startTime.setMinutes(0);
                _startTime.setSeconds(0);

                var _endTime = new Date(ev.date.getTime());
                _endTime.setDate(_endTime.getDate());
                _endTime.setHours(21);
                _endTime.setMinutes(0);
                _endTime.setSeconds(0);

                // var _disabledHours = [0,1,2,3,4,5,6,7,22,23];
                // for (var k in resp.message.takenTimes){
                // 	_disabledHours.push(k);
                // }

                $('#datetimepicker2').datetimepicker({
                        weekStart: 1,
                        todayBtn: 0,
                        autoclose: 1,
                        todayHighlight: 0,
                        startView: 1,
                        minView: 0,
                        maxView: 1,
                        forceParse: 0,
                        showMeridian: 1,
                        startDate: _startTime,
                        endDate: _endTime,
                        minuteStep: 15
                    })
                    .on('show', function (e) {
                        if ($('.staticpage-banner-sect').hasClass('lg-banner') == true) {
                            $('.datetimepicker.dropdown-menu').addClass('mgrtop');
                        }
                    }).on('changeDate', function (e) {
                    $('#datetimepicker3').datetimepicker('remove');
                    $('#datetimepicker3 input').val('');
                    console.log(new Date(e.date.valueOf()));

                    var time = $('#datetimepicker2 input').val();
                    var parts = time.split(" ");
                    var hours = parts[0].split(":")[0];
                    var mins = parts[0].split(":")[1];
                    var tt = parts[1];
                    if (tt === "pm" && hours != 12) {
                        hours = parseInt(hours) + 12;
                    } else {
                        hours = parseInt(hours);
                    }
                    mins = parseInt(mins) + 1;

                    var __startTime = new Date(_date.getTime());
                    __startTime.setDate(__startTime.getDate());
                    __startTime.setHours(hours);
                    __startTime.setMinutes(mins);
                    __startTime.setSeconds(0);

                    var __endTime = new Date(_date.getTime());
                    __endTime.setDate(__endTime.getDate());
                    __endTime.setHours(21);
                    __endTime.setMinutes(0);
                    __endTime.setSeconds(0);

                    $('#datetimepicker3').datetimepicker({
                        weekStart: 1,
                        todayBtn: 0,
                        autoclose: 1,
                        todayHighlight: 0,
                        startView: 1,
                        maxView: 1,
                        forceParse: 0,
                        showMeridian: 1,
                        startDate: __startTime,
                        endDate: __endTime,
                        minuteStep: 15
                    }).on('show', function () {
                        if ($('.staticpage-banner-sect').hasClass('lg-banner') == true) {
                            $('.datetimepicker.dropdown-menu').addClass('mgrtop');
                        }
                    }).on('changeDate', function (e) {
                        $.ajax({
                            url: "/booking/available-times",
                            data: {
                                "start_date": $('#datetimepicker1 input').val(),
                                "start_time": $('#datetimepicker2 input').val(),
                                "end_time": $('#datetimepicker3 input').val(),
                                "location_id": $("input[name=location_id]").val()
                            },
                            success: function (resp) {
                                var rooms = resp.message.result;
                                var count = 0;
                                $(".bookingroom-list").find("button.home-btn").each(function (i, v) {
                                    var $room = $(v);
                                    if (rooms[$room.data('roomid')] === true) {
                                        $room.removeClass("inactive");
                                        count++;
                                    } else {
                                        $room.addClass("inactive");
                                    }
                                });
                                $("#room-avaitext-num").text(count);
                                $(".room-avaitext").show();
                            },
                            dataType: "json"
                        });
                    });
                });
            });
        },
        _trungFunction = function () {
            $('.t-header .nav-expand-btn').click(function () {
                $('.t-header').toggleClass('expanded');
            });


            $('.t-header').addClass('stick2top');

            $('.t-checkbox-label span').click(function () {
                $(this).parent().toggleClass('checked');
                isClick = false;
            });
            $('.t-checkbox-label i').click(function () {
                $(this).parent().toggleClass('checked');
                isClick = false;
            });
            $('.t-checkbox-label small').click(function () {
                $(this).parent().toggleClass('checked');
                isClick = false;
            });

            $('a[href*=#]:not([href=#])').click(function () {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }
                }
            });

        },
        _step3 = function (packagePrice) {
            $(".reg-cost-row span").each(function () {
                $(this).text(_stringFormatCurrency($(this).text()));
            });
            $('.get-receipt-toggle').click(function () {
                var $receiptWrapper = $('.get-receipt-wrapper');
                if ($(this).hasClass('checked') == false) {
                    $receiptWrapper.slideUp();

                } else {
                    $receiptWrapper.slideDown();

                }
                if (isClick == false) {
                    isClick = true;
                    var temp = packagePrice['price'];
                    var vat_temp = $("#vat-display span").text();
                    //var vat = temp * 0.1;
                    if ($(this).parent().data('check') == 1) {
                        $(this).parent().data('check', 0);
                        $("#vat-display span").text(0);
                        vat = 0;
                        $(this).parent().find("input").val(false).removeAttr("checked");
                    } else {
                        $(this).parent().data('check', 1);
                        vat = temp / 10;
                        $("#vat-display span").text(_stringFormatCurrency(vat));
                        $(this).parent().find("input").val(true).prop("checked");
                    }
                    var final_price = temp + vat;
                    $("#total-display span").text(_stringFormatCurrency(final_price));
                }
            });

            $(".dropdown-menu li a").click(function () {
                $("#participantDD").html($(this).text() + '<span class="caret"><i class="ti-angle-down"></i></span>');
                $("#step3-form").find("input[name=participants]").val($(this).text());
                return true;
            });

            $("#form-submit").click(function () {
                var email = $(".email-validate").val();
                var phone = $(".phone-validate").val();
                var name = $(".name-validate").val();
                var flag = true;
                if (packagePrice['logged'] == 0 && email == '') {
                    $(".email-validate").parent().addClass('error');
                    flag = false;
                }
                if (name == '') {
                    $(".name-validate").parent().addClass('error');
                    flag = false;
                }
                if (email != '' && !_validateEmail(email)) {
                    $(".email-validate").parent().addClass('error');
                    flag = false;
                }
                if (phone == '+84 ' || !_validatePhone(phone)) {
                    $(".phone-validate").parent().addClass('error');
                    flag = false;
                }
                if ($('.get-receipt-toggle').parent().data('check') == 1) {
                    if ($('input[name=companyName]').val() == "") {
                        $('input[name=companyName]').parent().addClass('error');
                        flag = false;
                    }
                    if ($('input[name=companyTax]').val() == "") {
                        $('input[name=companyTax]').parent().addClass('error');
                        flag = false;
                    }
                    if ($('input[name=companyAddress]').val() == "") {
                        $('input[name=companyAddress]').parent().addClass('error');
                        flag = false;
                    }
                }
                if (flag == false) return false;
                $("#step3-form").submit();
            });

        },
        _validatePhoneInput = function () {
            $('.phone-validate').each(function () {
                var elem = $(this);
                elem.data('oldVal', elem.val());
                elem.bind("propertychange change click keyup input paste", function (event) {
                    if (elem.data('oldVal') != elem.val()) {
                        elem.data('oldVal', elem.val());
                        if (elem.val() != '') {
                            if (!_validatePhone(elem.val()) || elem.val().length > 15) {
                                elem.removeClass('filled');
                                elem.parent().addClass('error');
                            } else {
                                elem.parent().removeClass('error');
                                elem.addClass('filled');
                            }
                        } else {
                            elem.parent().removeClass('error');
                            elem.removeClass('filled');
                        }
                    }
                });
            });
        },
        _validateEmailInput = function () {
            $('.email-validate').each(function () {
                var elem = $(this);
                elem.data('oldVal', elem.val());
                elem.bind("propertychange change click keyup input paste", function (event) {
                    if (elem.data('oldVal') != elem.val()) {
                        elem.data('oldVal', elem.val());
                        if (elem.val() != '') {
                            if (!_validateEmail(elem.val())) {
                                elem.removeClass('filled');
                                elem.parent().addClass('error');
                            } else {
                                elem.parent().removeClass('error');
                                elem.addClass('filled');
                            }
                        } else {
                            elem.parent().removeClass('error');
                            elem.removeClass('filled');
                        }
                    }
                });
            });
        },
        _validatePhone = function (phone) {
            var value = phone.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            var pattern = /^\+?[0-9 ]+$/;
            return pattern.test(value);
        },
        _validateEmail = function (email) {
            var value = email.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            return pattern.test(value);
        },
        _step4 = function () {
            $(".reg-cost-row span").each(function () {
                $(this).text(_stringFormatCurrency($(this).text()));
            });
            //_setNganLuongIntegration();
        },
        _step5 = function () {
            $(".reg-cost-row span").each(function () {
                $(this).text(_stringFormatCurrency($(this).text()));
            });
        },
        _setNganLuongIntegration = function () {
            $('#booking-form button.ngan-luong-integration').click(function () {
                var $this = $(this);
                var id = "load-payment-" + Math.floor(Date.now() / 1000);

                $("#" + $this.data('tmp-payment')).remove();

                $this.data('tmp-payment', id);

                if ($this.data('in-progress')) {
                    return false;
                }

                $this.data('in-progress', true);

                $.ajax({
                    url: "/booking/purchase",
                    success: function (resp) {
                        var $id = $this.data('tmp-payment');
                        var $b = $("<button id='" + id + "' style='display:none;'></button>");
                        $("body").append($b);
                        var mc_flow = new NGANLUONG.apps.MCFlow({trigger: id, url: resp.checkoutUrl});
                        $('#' + id).trigger('click');
                        $this.data('in-progress', false);
                    },
                    error: function (err) {
                        alert("Không thể kết nối với Ngân Lượng. Vui lòng thử lại sau.");
                        $this.data('in-progress', false);
                    },
                    type: "post",
                    dataType: "json"
                });
                return false;
            });
        };
    $.booking = {};
    $.booking.init = function (options) {
        _step1(options);
        $('.price-format').each(function () {
            var elem = $(this);
            var price = elem.text();
            elem.text(_stringFormatCurrency(price));
        });
        _trungFunction();
    };
    $.booking.step3 = function (options) {
        _step3(options);
        _validateEmailInput();
        _validatePhoneInput();
        _trungFunction();
    };
    $.booking.step4 = function (options) {
        _step4();
        _trungFunction();
    };
    $.booking.step5 = function (options) {
        _step5();
        _trungFunction();
    }

})(jQuery);