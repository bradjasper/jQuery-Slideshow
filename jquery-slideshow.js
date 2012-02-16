(function() {
  var change_slide, update_controls, update_slideshow;
  update_controls = function(slideshow, opts) {
    "Update the previous/next controls to be active/inactive depending on position";    var elements, next, prev;
    if (!(slideshow instanceof jQuery)) {
      slideshow = $(slideshow);
    }
    elements = slideshow.find(opts.elements);
    prev = slideshow.find(opts.prev);
    next = slideshow.find(opts.next);
    if (elements.length < 2) {
      prev.removeClass(opts.active);
      next.removeClass(opts.active);
      return;
    }
    switch (elements.getClassIndex(opts.active)) {
      case -1:
        return;
      case 0:
        prev.removeClass(opts.active);
        return next.addClass(opts.active);
      case elements.length - 1:
        next.removeClass(opts.active);
        return prev.addClass(opts.active);
      default:
        prev.addClass(opts.active);
        return next.addClass(opts.active);
    }
  };
  update_slideshow = function(slideshow, opts) {
    "Underlying structure has changed, update slideshow";    var elements, next, prev;
    if (!(slideshow instanceof jQuery)) {
      slideshow = $(slideshow);
    }
    elements = slideshow.find(opts.elements);
    prev = slideshow.find(opts.prev);
    next = slideshow.find(opts.next);
    elements.setDefaultClass(opts.active);
    return update_controls(slideshow, opts);
  };
  change_slide = function(slideshow, opts, direction) {
    var elements, newIndex, oldIndex;
    elements = slideshow.find(opts.elements);
    oldIndex = elements.getClassIndex(opts.active);
    if (oldIndex === -1) {
      return;
    }
    if (direction !== "next" && direction !== "prev") {
      return;
    }
    if (direction === "next") {
      newIndex = oldIndex + 1;
    } else {
      newIndex = oldIndex - 1;
    }
    if (newIndex < 0) {
      return;
    }
    if (newIndex >= elements.length) {
      return;
    }
    elements.eq(oldIndex).removeClass(opts.active);
    elements.eq(newIndex).addClass(opts.active);
    update_controls(slideshow, opts);
    return opts.change(newIndex);
  };
  $.fn.slideshow = function(opts) {
    var _ref, _ref2;
    opts != null ? opts : opts = {};
    opts.prev = ".previous";
    opts.next = ".next";
    opts.active = "active";
    (_ref = opts.elements) != null ? _ref : opts.elements = "img";
    (_ref2 = opts.change) != null ? _ref2 : opts.change = function(i) {};
    return $(this).each(function() {
      var next, prev, slideshow;
      slideshow = $(this);
      prev = slideshow.find(opts.prev);
      next = slideshow.find(opts.next);
      slideshow.on("update", function(e) {
        return update_slideshow(slideshow, opts);
      });
      next.click(function() {
        return change_slide(slideshow, opts, "next");
      });
      prev.click(function() {
        return change_slide(slideshow, opts, "prev");
      });
      return update_slideshow(slideshow, opts);
    });
  };
}).call(this);
