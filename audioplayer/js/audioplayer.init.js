(function(){
jQuery(window).load(function() {
    jQuery('[data-audioplayer-id]').each(function(index) {
        var audiocontainer = jQuery( this ),
            AudioJS = audiojs.createAll({ // Initialize Audio JS
                trackEnded: function() {
                    var next = jQuery('li.playing', audiocontainer).next();
                    if (!next.length) next = jQuery('ol li').first();
                    next.click();
                }
            })[0];

        // Load SoundCloud Data
        var clientId = jQuery( this ).attr('data-audioplayer-clientid');
        jQuery('[data-audioplayer-sctrack]').each(function(index) {
            var trackId = jQuery(this).attr("data-audioplayer-sctrack");
            var trackContainer = jQuery(this);

            // DOM elements
            var artwork = trackContainer;
            var band = jQuery('.g-audioplayer-artist', trackContainer);
            var song = jQuery('.g-audioplayer-title', trackContainer);

            // Init SoundCloud JS SDK
            SC.initialize({
                client_id: clientId
            });

            // Getting SC track infos
            SC.get('/tracks/'+trackId, function(track){
                // Injecting infos
                artwork.attr('data-cover', track.artwork_url.replace('-large', '-crop')); // Cover (replacing the default image size "large" with "crop")
                band.html(track.user.username); // Band Name
                song.html(track.title); // Song name
                LoadFirst.call(audiocontainer, AudioJS);
            });
        });

        // Load in a track on click
        jQuery('ol li').click(function(e) {
            e.preventDefault();
            jQuery(this).addClass('playing').siblings().removeClass('playing');
            jQuery('.g-audioplayer-cover', audiocontainer).attr('alt', jQuery('a', this).text());
            jQuery('.g-audioplayer-cover', audiocontainer).attr('src', jQuery('a', this).attr('data-cover'));
            jQuery('.g-audioplayer-trackinfo', audiocontainer).html(jQuery('a', this).text());
            AudioJS.load(jQuery('a', this).attr('data-src'));
            AudioJS.play();
        });

        jQuery('.next', this).click(function(e) {
            var next = jQuery('li.playing', audiocontainer).next();
            if (!next.length) next = jQuery('ol li', audiocontainer).first();
            next.click();
        });
        jQuery('.previous').click(function(e) {
            var prev = jQuery('li.playing', audiocontainer).prev();
            if (!prev.length) prev = jQuery('ol li', audiocontainer).last();
            prev.click();
        });

        // Keyboard shortcuts
        jQuery(document).keydown(function(e) {
            var unicode = e.charCode ? e.charCode : e.keyCode;
            // right arrow
            if (unicode == 39) {
                var next = jQuery('li.playing', audiocontainer).next();
                if (!next.length) next = jQuery('ol li').first();
                next.click();
                // back arrow
            } else if (unicode == 37) {
                var prev = jQuery('li.playing', audiocontainer).prev();
                if (!prev.length) prev = jQuery('ol li', audiocontainer).last();
                prev.click();
                // spacebar
            } else if (unicode == 32) {
                AudioJS.playPause();
            }
        });

        LoadFirst.call(this, AudioJS);
    });
});

var LoadFirst = function(audio) {
    var first = jQuery('ol a', this).attr('data-src'),
        firstcover = jQuery('ol a', this).attr('data-cover'),
        firsttrackinfo = jQuery('ol a', this).html();

    jQuery('ol li', this).first().addClass('playing');

    audio.load(first);

    jQuery('.g-audioplayer-cover', this).attr('src', firstcover);
    jQuery('.g-audioplayer-cover', this).attr('alt', jQuery('ol a', this).first().text());
    jQuery('.g-audioplayer-trackinfo', this).html(firsttrackinfo).text();
}
})();
