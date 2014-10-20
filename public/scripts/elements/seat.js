(function () {
    var AVAILABLE = 'available',
        SELECTED = 'selected',
        BOOKED = 'booked';


    Polymer('seat-element', {
        onClick: function (event, detail, sender) {
            var availability = sender.getAttribute('availability');

            if(availability === AVAILABLE) {
                sender.setAttribute('availability', SELECTED);
            }
        }
    });
})();