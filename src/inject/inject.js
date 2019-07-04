chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);
      init();
      chrome.storage.sync.get(
        {
          tags: []
        },
        function(items) {
		  hideIgnoredTags(items.tags);
        }
      );
    }
  }, 10);
});

function hideIgnoredTags(tags) {
  tags.forEach(tag => {
    var tagElements = Array.from(
      document.querySelectorAll(`.single-article .tags a[href='/t/${tag}']`)
    );

    tagElements.forEach(tagElement => {
      // the whole article is located 2 elements above (parent.parent);
      var articleElement = tagElement.parentElement.parentElement;
      articleElement.style.display = "none";

      console.log("Hid element for tag " + tag);
      console.log(articleElement);
    });
  });
}
