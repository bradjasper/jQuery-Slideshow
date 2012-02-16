update_controls = (slideshow, opts) ->
  "Update the previous/next controls to be active/inactive depending on position"

  if (slideshow not instanceof jQuery)
    slideshow = $(slideshow)

  elements = slideshow.find(opts.elements)
  prev = slideshow.find(opts.prev)
  next = slideshow.find(opts.next)

  if elements.length < 2
    prev.removeClass(opts.active)
    next.removeClass(opts.active)
    return

  switch(elements.getClassIndex(opts.active))

    when -1
      # Couldn't find class index
      return

    # Start
    when 0
      prev.removeClass(opts.active)
      next.addClass(opts.active)

    # End
    when (elements.length-1)
      next.removeClass(opts.active)
      prev.addClass(opts.active)

    # Middle
    else
      prev.addClass(opts.active)
      next.addClass(opts.active)


update_slideshow = (slideshow, opts) ->
  "Underlying structure has changed, update slideshow"

  if (slideshow not instanceof jQuery)
    slideshow = $(slideshow)

  elements = slideshow.find(opts.elements)
  prev = slideshow.find(opts.prev)
  next = slideshow.find(opts.next)

  elements.setDefaultClass(opts.active)

  update_controls(slideshow, opts)


change_slide = (slideshow, opts, direction) ->

  elements = slideshow.find(opts.elements)
  oldIndex = elements.getClassIndex(opts.active)

  return if oldIndex is -1
  return if direction not in ["next", "prev"]

  if direction is "next"
    newIndex = oldIndex + 1
  else
    newIndex = oldIndex - 1

  return if newIndex < 0
  return if newIndex >= elements.length

  elements.eq(oldIndex).removeClass(opts.active)
  elements.eq(newIndex).addClass(opts.active)

  update_controls(slideshow, opts)
  opts.change(newIndex)


$.fn.slideshow = (opts) ->

  opts ?= {}
  opts.prev = ".previous"
  opts.next = ".next"
  opts.active = "active"
  opts.elements ?= "img"
  opts.change ?= (i) ->

  $(this).each ->

    slideshow = $(this)

    # Setup slideshow
    prev = slideshow.find(opts.prev)
    next = slideshow.find(opts.next)

    slideshow.on "update", (e) -> update_slideshow(slideshow, opts)
    next.click -> change_slide(slideshow, opts, "next")
    prev.click -> change_slide(slideshow, opts, "prev")

    update_slideshow(slideshow, opts)
