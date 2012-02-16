$.fn.setDefaultClass = (klass, index) ->
  "Check if any element has klass, if not set idx-th element to klass"

  index ?= 0
  if not $(this).hasClass(klass)
    $(this).eq(index).addClass(klass)

$.fn.getClassIndex = (klass) ->
  "Return the 0-based index of klass in a list of elements. jQuery's index() doesn't work right"

  elements = $(this)
  for i in [0...elements.length]
    return i if elements.eq(i).hasClass(klass)

  return -1
