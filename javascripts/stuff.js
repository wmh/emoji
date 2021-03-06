// Generated by CoffeeScript 1.6.3
$(function() {
  var clip, focusOnSearch;
  $("input.search").focus();
  focusOnSearch = function(e) {
    var t;
    if (e.keyCode === 83 && !$("input.search:focus").length) {
      $("input.search").focus();
      t = $("input.search").get(0);
      if (t.value.length) {
        t.selectionStart = 0;
        t.selectionEnd = t.value.length;
      }
      return false;
    }
  };
  $(document).keydown(function(e) {
    return focusOnSearch(e);
  });
  $(".emoji-wrapper input").keydown(function(e) {
    $("input.search").blur();
    return focusOnSearch(e);
  });
  if (navigator.userAgent.match(/iPad|iPhone/i)) {
    $("li input, .queue").click(function() {
      this.selectionStart = 0;
      return this.selectionEnd = this.value.length;
    });
  } else {
    clip = new ZeroClipboard($("[data-clipboard-text]"), {
      moviePath: "/assets/zeroclipboard.swf"
    });
    clip.on("complete", function(_, args) {
      return $("<div class=alert></div>").text("Copied " + args.text).appendTo("body").fadeIn().delay(1000).fadeOut();
    });
    $("li input").attr("readonly", "readonly");
    $(".emoji-wrapper, .storyline").on("mouseover", function() {
      var i, input;
      input = $(this).find("input").focus();
      i = input.get(0);
      i.selectionStart = 0;
      return i.selectionEnd = i.value.length;
    });
  }
  $(".js-queue-all").click(function() {
    return $("li:visible .emoji").click();
  });
  $(".js-hide-text").click(function() {
    return $("ul").toggleClass("hide-text");
  });
  $.fn.addToStoryLine = function() {
    var val;
    $(this).clone().appendTo(".story").click(function() {
      var val;
      $(this).remove();
      val = $.map($(".story .emoji"), function(e) {
        return ":" + $(e).attr("title") + ":";
      }).join("");
      return $(".queue").val(val).attr("data-clipboard-text", val);
    });
    val = $.map($(".story .emoji"), function(e) {
      return ":" + $(e).attr("title") + ":";
    }).join("");
    return $(".queue").val(val).val(val).attr("data-clipboard-text", val);
  };
  return $("body").on("click", ".emoji", function(e) {
    e.stopPropagation();
    return $(this).addToStoryLine();
  });
});
