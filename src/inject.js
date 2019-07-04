chrome.storage.sync.get(
  {
    tags: []
  },
  function(items) {
    hideIgnoredTags(items.tags);
  }
);

function hideIgnoredTags(tags) {
  let blockedItems = [];
  tags.forEach(tag => {
    var tagElements = Array.from(
      document.querySelectorAll(`.single-article .tags a[href='/t/${tag}']`)
    );

    tagElements.forEach(tagElement => {
      // the whole article is located 2 elements above (parent.parent);
      var articleElement = tagElement.parentElement.parentElement;
      articleElement.style.display = "none";

      blockedItems.push({
        tag,
        element: articleElement,
        time: new Date().getTime()
      });
    });
  });
  addToBlockedItems(blockedItems);
}

function addToBlockedItems(val) {
  chrome.storage.sync.get(
    {
      blockedItems: []
    },
    function(items) {
      let newBlockedItems = items.blockedItems.concat(val);
      chrome.storage.sync.set({
        blockedItems: newBlockedItems
      });
    }
  );
}
