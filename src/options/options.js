function saveTags() {
  var tagString = document.getElementById("filtered-tags").value;
  var tags = tagString.split(",");

  chrome.storage.sync.set(
    {
      tags
    },
    function() {
      // Update status to let user know options were saved.
      var status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function() {
        status.textContent = "";
      }, 750);
    }
  );
}

function restoreOptions() {
  chrome.storage.sync.get(
    {
      tags: []
    },
    function(items) {
      document.getElementById("filtered-tags").value = items.tags.join();
    }
  );
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("btn-submit").addEventListener("click", saveTags);
