chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules(
      [
        {
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { hostContains: 'nytimes.com' }
            })
          ],
          actions: [
            new chrome.declarativeContent.ShowPageAction()
          ]
        }
      ]
    );
  });
});

chrome.pageAction.onClicked.addListener((tab) => {
  chrome.pageAction.setIcon({ tabId: tab.id, path: 'images/nyt-square-orange-16.png' });
  chrome.cookies.getAll({ domain: 'nytimes.com' }, (cookies) => {
    cookies.forEach((cookie) => {
      chrome.cookies.remove({ url: 'https:' + cookie.domain + cookie.path, name: cookie.name });
    });
    chrome.pageAction.setIcon({ tabId: tab.id, path: 'images/nyt-square-green-16.png' });
    setTimeout(() => {
      chrome.pageAction.setIcon({ tabId: tab.id, path: 'images/nyt-square-black-16.png' });
    }, 1000);
  });
});
