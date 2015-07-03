(function(root) {
  var BuildView = function($root) {
    this.$root = $root;

    // Scope for progressively enhanced styling
    $root.addClass('js-enhanced');

    this.setupLayouts();
    this.setupUrls();

    $("input[name=layout]:radio").change($.proxy(function(event) {
      this.onLayoutChange($(event.target).attr('value'));
    }, this));

    this.updateLayout($("input[name=layout]:radio").first().attr('value'));
  };

  BuildView.prototype.setupLayouts = function() {
    $("input[name='layout']").map(function() {
      var $this = $(this);
      $this.parent('label').append(
        $('<div class="layout layout-thumb layout-' + $this.val() + '">').append(
          $('<div class="item item-1"></div><div class="item item-2"></div>' +
            '<div class="item item-3"></div><div class="item item-4"></div>')
        )
      );
    });
  };

  BuildView.prototype.setupUrls = function() {
    $('section.urls ol').addClass('layout').find('> li').each(function(index, item) {
      $(item).addClass('item item-' + (index+1));
    }).find('input').attr('placeholder', 'URL to be displayed in this part of the layout');
  };

  BuildView.prototype.update = function(params) {
    if (params.title) {
      this.updateTitle(params.title);
    }
    if (params.url) {
      this.updateUrls(params.url);
    }
    if (params.layout) {
      this.updateLayout(params.layout);
    }
  };

  BuildView.prototype.updateTitle = function(title) {
    $('input[name=title]').attr('value', title);
  };

  BuildView.prototype.updateLayout = function(layout) {
    $("input[name=layout][value='" + layout + "']:radio")
        .prop('checked', true)
        .trigger('change');
  };

  BuildView.prototype.updateUrls = function(urls) {
    $('section.urls ol > li').each(function(index, item) {
      if (urls[index]) {
        $(item).find('input').attr('value', urls[index]);
      }
    });
  };

  BuildView.prototype.onLayoutChange = function(layout) {
    $('section.urls ol').attr('class', 'layout layout-' + layout);
    this.setSelectedLayout(layout);
  };

  BuildView.prototype.setSelectedLayout = function(layout) {
    $('section.layouts ol > li').removeClass('selected');
    $("input[name=layout][value='" + layout + "']:radio").parents('li').addClass('selected');
  };

  root.BuildView = BuildView;

})(window);
