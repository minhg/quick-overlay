// Quick Overlay
// 
// Customisable Options: 
// - height
// - width
// - message (Failover with return false and console message)
// - position (top, left, right, bottom, center)
// - class (optional class)

(function($) {

    $.fn.overlayBox = function(settings, callback) {


        return this.each(function(e) {

            var $this = this;
            settings = $.extend({}, $.fn.overlayBox.settings, settings);

            function close(overlay, callback) {

                // Closing overlay with slight animation
                overlay.fadeOut(500, function() {
                    $(this).remove();
                });

                // Callback on close
                if (callback && typeof(callback) === 'function') {
                    callback();
                }
            }

            function buildSize(overlay, settings) {
                if (settings.height > 0) {
                    overlay.css('height', settings.height);
                }

                if (settings.width > 0) {
                    overlay.css('width', settings.width);
                }
            }

            function buildPosition(overlay, settings) {

                // Custom position calculations
                var winHeight = $(window).height(),
                    winWidth = $(window).width(),
                    oPos = '',
                    overlayHeight = overlay.height,
                    overlayWidth;

                // Cycling through the positions
                switch (settings.position) {
                case 'center':
                    oPos = {
                        'top': Math.round((winHeight - settings.height) / 2),
                        'left': Math.round((winWidth - settings.width) / 2) + 'px'
                    };
                    break;
                case 'left':
                    oPos = {
                        'top': Math.round((winHeight - settings.height) / 2) + 'px',
                        'left': 0
                    };
                    break;
                case 'right':
                    oPos = {
                        'top': Math.round((winHeight - settings.height) / 2) + 'px',
                        'right': 0
                    };
                    break;
                case 'top':
                    oPos = {
                        'top': 0,
                        'left': Math.round((winWidth - settings.width) / 2) + 'px'
                    };
                    break;
                case 'bottom':
                    oPos = {
                        'bottom': 0,
                        'left': Math.round((winWidth - settings.width) / 2) + 'px'
                    };
                    break;
                }
                overlay.css(oPos);

                // Override for special case where overlay is taller than window
                if (settings.height > winHeight) {
                    overlay.css({
                        'top': 0
                    });
                }
            }

            function init(settings, callback) {

                // Creating the Overlay Div
                var overlay = $('<div/>', {
                    'class': 'quick-lay'
                }).hide().appendTo('body');

                // Building custom position
                buildPosition(overlay, settings);
                buildSize(overlay, settings);

                // Appending message to Overlay Div
                var overLMsg = $('<p>' + settings.message + '</p>'),
                    overLClose = $('<div class="quick-lay-close"></div>');

                overlay.append(overLMsg, overLClose).fadeIn(500);

                overLClose.on('click', function() {
                    close(overlay, callback);
                    return false;
                });

            }

            // Error handling for Message
            return $(this).on('click', function() {
                if (settings.message === '' || settings.message === null) {
                    console.log('Overlay Disabled: Please enter a message');
                } else {
                    init(settings, callback);
                }
                return false;
            });

        });
    };

    $.fn.overlayBox.settings = {
        height: 500,
        width: 500,
        message: 'hello',
        position: 'center'
    };

})(jQuery);