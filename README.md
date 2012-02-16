Bare bones jQuery Slideshow plugin. This isn't really a drop in replacement
for jQuery slideshows, but can help when you're building your own.

This plugin works by cycling an active class through each element.

It also toggles active classes for controls (next/previous)

```html
<div class="slideshow">
  <div class="images">
    <img src="apple.png" />
    <img src="box.png" />
    <img src="car.png" />
  </div>

  <a href="#" class="previous">Previous</a>
  <a href="#" class="next">Next</a>
</div>
```


```javascript

$(document).ready(function() {
  // Easiest way
  $(".slideshow").slideshow()

  // Customization
  $(".slideshow").slideshow({
    prev: ".prevOne",
    next: ".nextOne",
    elements: ".slides"
    active: "current",
    change: function(index) { alert("changed to index"); }
  });

  // Underlying slideshow structure changed...update controls
  $(".slideshow").trigger("update")
});
```
