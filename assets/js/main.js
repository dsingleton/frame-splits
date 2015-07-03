(function(root) {
	var FrameView = function($root) {
		this.$root = $root;
	};

	FrameView.prototype.render = function(layout, urls, title) {

		if (!urls) {
			return;
		}

		this.$root.parents('body').addClass('js-enabled');

		this.$root.parents('html').find('title').text(title || 'Frame Splits')

		this.$root.empty()
			.removeClass('layout-' + this.$root.attr('data-layout-class'))
			.addClass('layout-' + layout)
			.attr('data-layout-class', layout);

		this.$root.append(
			$(urls).map(function(index, url) {
				return $('<iframe>').attr('src', url).addClass('item item-' + (index+1))[0];
			})
		);

		var editLink = this.$root.parent().find('.build-link a');
		editLink.attr('href', editLink.attr('href') + document.location.search);
	};

	root.FrameView = FrameView;

})(window);
