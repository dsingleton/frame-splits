(function(root) {
	var FrameView = function($root) {
		this.$root = $root;
	};

	FrameView.prototype.render = function(layout, urls) {
		this.$root.empty()
			.removeClass('layout-' + this.$root.attr('data-layout-class'))
			.addClass('layout-' + layout)
			.attr('data-layout-class', layout);

		this.$root.append(
			$(urls).map(function(index, url) {
				return $('<iframe>').attr('src', url).addClass('item item-' + (index+1))[0];
			})
		);
	};

	root.FrameView = FrameView;

})(window);
