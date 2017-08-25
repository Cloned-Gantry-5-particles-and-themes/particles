((function() {
	var isElementInViewport = function(el, delta) {
		var rect = el.getBoundingClientRect();
		delta = delta || 0;
		return (
			rect.top >= -delta &&
			rect.left >= -delta &&
			rect.bottom <= (delta + (window.innerHeight || document.documentElement.clientHeight)) &&
			rect.right <= (delta + (window.innerWidth || document.documentElement.clientWidth))
		);
	}
	window.addEvents({
		scroll: function() {
			var odometers = document.getElements('.odometer'), value, instances = {};
			odometers.forEach(function(odometer, idx) {
				odometer = document.id(odometer);
				if (!instances['o-' + idx] && isElementInViewport(odometer, 100)) {
					value = odometer.getProperty('data-odometer-value');
					instances['o-' + idx] = {
						i: new Odometer({ el: odometer }),
						v: value
					};
					setTimeout(function() {
						instances['o-' + idx].i.update(instances['o-' + idx].v || 0);
					}, 100);
				}
			});
		},
		domready: function() {
			this.fireEvent('scroll');
		}
	});
})());