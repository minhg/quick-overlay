// Quick Overlay
// 
// Customisable Options: 
// - height
// - width
// - message (Failover with return false and console message)
// - position (top, left, right, bottom, center)
// - effect (dark, light)

(function($) {

    $.fn.overlayBox = function(settings, callback) {

        return this.each(function(e) {

            var $this = this;
            $this.settings = $.extend({}, $.fn.overlayBox.settings, settings);

            function close(callback) {

                // Closing overlay with slight animation
                $('#quick-lay').fadeOut(500, function() {
                    $(this).remove();
                });

                // Callback on close
                if (callback && typeof(callback) === 'function') {
                    callback();
                }
            }

            function buildPosition(settings) {

                // Custom position calculations
                var winHeight = $(window).height(),
                    winWidth = $(window).width(),
                    oPos = '';

                // Cycling through the positions
                switch ($this.settings.position) {
                case 'center':
                    oPos = {
                        'top': Math.round((winHeight - $this.settings.height) / 2),
                        'left': Math.round((winWidth - $this.settings.width) / 2) + 'px'
                    };
                    break;
                case 'left':
                    oPos = {
                        'top': Math.round((winHeight - $this.settings.height) / 2) + 'px',
                        'left': 0
                    };
                    break;
                case 'right':
                    oPos = {
                        'top': Math.round((winHeight - $this.settings.height) / 2) + 'px',
                        'right': 0
                    };
                    break;
                case 'top':
                    oPos = {
                        'top': 0,
                        'left': Math.round((winWidth - $this.settings.width) / 2) + 'px'
                    };
                    break;
                case 'bottom':
                    oPos = {
                        'bottom': 0,
                        'left': Math.round((winWidth - $this.settings.width) / 2) + 'px'
                    };
                    break;
                }
                $('#quick-lay').css(oPos);

                // Override for special case where overlay is taller than window
                if ($this.settings.height > winHeight) {
                    $('#quick-lay').css({
                        'top': 0
                    });
                }
            }

            function init(settings, callback) {

                // Remove any existing Overlays
                $('#quick-lay').remove();

                // Creating the Overlay Div
                var overlay = $('<div/>', {
                    'id': 'quick-lay',
                    'class': $this.settings.effect,
                    css: ({
                        'height': $this.settings.height + 'px',
                        'width': $this.settings.width + 'px'
                    })
                }).hide().appendTo('body');

                // Building custom position
                buildPosition(settings);

                // Appending message to Overlay Div
                var overLMsg = $('<p>' + $this.settings.message + '</p>'),
                    overLClose = $('<span id="overlayClose"><a href="#">X</a></span>');

                overlay.append(overLMsg, overLClose).fadeIn(500);

                overLClose.find('a').on('click', function() {
                    close(callback);
                    return false;
                });
            }

            // Error handling for Message
            return $(this).on('click', function() {
                if ($this.settings.message === '' || $this.settings.message === null) {
                    console.log('Overlay Disabled: Please enter a message');
                } else {
                    init(settings, callback);
                }
                return false;
            });

        });
    };

    $.fn.overlayBox.settings = {
        // Default settings for overlayBox
        effect: 'dark',
        height: 500,
        width: 500,
        message: 'hello',
        position: 'center'
    };

})(jQuery);