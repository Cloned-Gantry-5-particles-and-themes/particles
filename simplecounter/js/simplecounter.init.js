jQuery(window).load(function() {
    jQuery('[data-simplecounter-id]').each(function(index) {
        var counter = new SimpleCounter(
            jQuery( this ).attr('data-simplecounter-id'),
            /* Year (Full Year), Month (0 to 11), Day (1 to 31) */
            /* For example: Date(2020,10,1) means 1 November 2020 */
            new Date(jQuery( this ).attr('data-simplecounter-year'), jQuery( this ).attr('data-simplecounter-month'), jQuery( this ).attr('data-simplecounter-date')),
            {
                lang: {
                    d: {
                        single: jQuery( this ).attr('data-simplecounter-daytext'),
                        plural: jQuery( this ).attr('data-simplecounter-daystext')
                    }, //days
                    h: {
                        single: jQuery( this ).attr('data-simplecounter-hourtext'),
                        plural: jQuery( this ).attr('data-simplecounter-hourstext')
                    }, //hours
                    m: {
                        single: jQuery( this ).attr('data-simplecounter-minutetext'),
                        plural: jQuery( this ).attr('data-simplecounter-minutestext')
                    }, //minutes
                    s: {
                        single: jQuery( this ).attr('data-simplecounter-secondtext'),
                        plural: jQuery( this ).attr('data-simplecounter-secondstext')
                    }  //seconds
                }
            }
        );
    });
});
