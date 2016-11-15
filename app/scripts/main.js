jQuery(document).ready(function($) {


    function fullscreen() {
        jQuery('header').css({
            width: jQuery(window).width(),
            height: jQuery(window).height()
        });
    }

    fullscreen();



    particlesJS.load("image-header", 'scripts/particles.json');


    $(".coffee-order").stick_in_parent({ offset_top: 80 });

    var $orders = $('#orders');
    var $name = $('#name');
    var $drink = $('#drink');
    var $qty = $('#qty');

    var orderTemplate = $("#order-template").html();

    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/chitranks/coffee/',
        success: function(data) {
            $.each(data, function(i, order) {
                $orders.append(Mustache.render(orderTemplate, order));
            });
        },
        error: function() {
            alert('error GET connecting to REST');
        }
    });



    $('#add-order').on('click', function() {
        var order = {
            name: $name.val(),
            drink: $drink.val(),
            quantity: $qty.val(),

        };
        $.ajax({
            url: 'http://rest.learncode.academy/api/chitranks/coffee',
            type: 'POST',
            data: order,
            success: function() {
                $orders.append(Mustache.render(orderTemplate, order));
            },
            error: function() {
                alert('POST error');
            }

        });
        return false;
    });
    $orders.delegate('.remove', 'click', function() {
        var $li = $(this).closest('li');
        var self = this;
        $.ajax({
            type: 'DELETE',
            url: 'http://rest.learncode.academy/api/chitranks/coffee/' + $(this).attr('data-id'),
            success: function(data) {
                $li.fadeOut('300', function() {
                    $(this).remove;
                });
            }
        });
    });

    $orders.delegate('.editOrder', 'click', function() {
        var $li = $(this).closest('li');
        $li.find('input.name').val($li.find('span.name').html());
        $li.find('input.drink').val($li.find('select.drink').html());
        $li.find('input.qty').val($li.find('span.qty').html());
        $li.addClass('edit');

    });
    $orders.delegate('.cancelEdit', 'click', function() {
        $(this).closest('li').removeClass('edit');
    });

    $orders.delegate('.saveEdit', 'click', function() {
        var $li = $(this).closest('li');
        var order = {
            name: $li.find('input.name').val(),
            drink: $li.find('select.drink').val(),
            quantity: $li.find('input.qty').val()
        };
        $.ajax({
            url: 'http://rest.learncode.academy/api/chitranks/coffee/' + $li.attr('data-id'),
            type: 'PUT',
            data: order,
            success: function(data) {
                $li.find('span.name').html(order.name);
                $li.find('span.drink').html(order.drink);
                $li.find('span.qty').html(order.qty);
                $li.removeClass('edit');
            },
            error: function() {
                alert('error PUT connecting to REST');
            }

        });
    });


    jQuery(window).resize(function() {
        fullscreen();
    });




});
