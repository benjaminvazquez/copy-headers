function contentLoaded() {
  const copy = document.getElementById('copy');
  const paste = document.getElementById('paste');

  copy.addEventListener('click', () => copyClicked(), false);
  paste.addEventListener('click', () => pasteClicked(), false);
}

function copyClicked() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
    var tabId = tab[0].id;

    chrome.tabs.executeScript(tabId, { file: 'get-storage.js' }, function (
      response
    ) {
      chrome.storage.local.set({ headers: JSON.stringify(response[0]) }, () => {
        alert('Headers copied');
      });
    });
  });
}

function pasteClicked() {
  chrome.storage.local.get('headers', (headers) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
      var tabId = tab[0].id;

      chrome.tabs.executeScript(
        tabId,
        { code: 'var params = ' + headers.headers },
        function () {
          if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
            return;
          }
          chrome.tabs.executeScript(
            tabId,
            { file: 'set-storage.js' },
            function (response) {
              alert(response[0]);
            }
          );
        }
      );
    });
  });
}

document.addEventListener('DOMContentLoaded', contentLoaded);
