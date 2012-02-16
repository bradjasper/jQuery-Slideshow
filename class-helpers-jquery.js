(function() {
  $.fn.setDefaultClass = function(klass, index) {
    "Check if any element has klass, if not set idx-th element to klass";    index != null ? index : index = 0;
    if (!$(this).hasClass(klass)) {
      return $(this).eq(index).addClass(klass);
    }
  };
  $.fn.getClassIndex = function(klass) {
    "Return the 0-based index of klass in a list of elements. jQuery's index() doesn't work right";    var elements, i, _ref;
    elements = $(this);
    for (i = 0, _ref = elements.length; (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
      if (elements.eq(i).hasClass(klass)) {
        return i;
      }
    }
    return -1;
  };
}).call(this);
