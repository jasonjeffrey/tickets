(function () {
    'use strict';

    var AVAILABLE = 'available',
        SELECTED = 'selected';


    Polymer('seat-element', {
        onClick: function (event, detail, sender) {
            var availability = sender.getAttribute('availability');

            if(availability === AVAILABLE) {
                sender.setAttribute('availability', SELECTED);
            } else if (availability === SELECTED) {
                sender.setAttribute('availability', AVAILABLE);
            }
        }
    });
})();