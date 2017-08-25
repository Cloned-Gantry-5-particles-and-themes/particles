jQuery(document).ready(function() {
    jQuery('[data-simpleweather-id]').each(function(index) {
        var id = '#' + jQuery( this ).attr('id');
        var location = jQuery( this ).attr('data-simpleweather-location');
        var showlocation = jQuery( this ).attr('data-simpleweather-showlocation');
        var title = jQuery( this ).attr('data-simpleweather-title');
        var units = jQuery( this ).attr('data-simpleweather-units');
        var params = jQuery( this ).attr('data-simpleweather-params');

        jQuery.simpleWeather({
            location: location,
            woeid: '',
            unit: units,
            success: function(weather) {
                html = '<div class="g-simpleweather-content"><span class="g-simpleweather-title">' + title + '</span> <i class="weathericon-'+weather.code+'"></i> ';
                html += +weather.temp+'&deg;'+weather.units.temp+' ';
                if (showlocation == 'enabled') {
                    html += weather.city+', '+weather.region+' ';
                }
                if (params.length !== 0) {
                    var params_array = params.split(',')
                    jQuery.each(params_array,function(i){
                        html += weather[params_array[i]]+',';
                    });
                }
                html += '</div>';
                jQuery( id ).html(html);
            },
            error: function(error) {
                jQuery( id ).html('<' + 'p>' + error + '<' + '/p>');
            }
        });
    });
});
