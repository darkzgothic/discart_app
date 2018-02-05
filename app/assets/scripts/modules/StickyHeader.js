import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll  from 'jquery-smooth-scroll';

class StickyHeader {
	constructor() {
		this.siteHeader = $('.site-header');
		this.headerTriggerElement = $("#sticky-header");
		this.createWaypoint();
	}

	createWaypoint() {
		var that = this;
		new Waypoint({

			element: this.headerTriggerElement[0],
			handler: function(direction) {
				if (direction == "down") {
					that.siteHeader.addClass("site-header--dark");
					console.log("doneeeeee");
				}else{
					that.siteHeader.removeClass("site-header--dark");
				}
				
			}
		});
	}
}

export default StickyHeader;