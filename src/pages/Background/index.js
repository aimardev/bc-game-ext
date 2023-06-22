// chrome.action.onClicked.addListener(async (tab) => {
//   if (tab.url.startsWith(upwork)) {
//     // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
//     const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
//     // Next state will always be the opposite
//     const nextState = 'ON';

//     // Set the action badge to the next state
//     await chrome.action.setBadgeText({
//       tabId: tab.id,
//       text: nextState,
//     });
//     //   if (nextState === "ON") {
//     // Insert the CSS file when the user turns the extension on
//     await chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       function: () => {
//         const extractHeader = () => {
//           const selector = `header > h1`;
//           const h1 = document.querySelector(selector);
//           if (h1) {
//             return h1.innerText;
//           }
//           return '';
//         };
//         const extractDescription = () => {
//           const selector = `.job-description`;
//           const content = document.querySelector(selector);
//           if (content) {
//             return content.innerText;
//           }
//           return '';
//         };
//         const extractJobFeatures = () => {
//           const selector = `small.text-muted`;
//           const elements = document.querySelectorAll(selector);
//           const answer = [];
//           let jobType = '';
//           for (const element of elements) {
//             const { innerText, parentNode } = element;
//             if (
//               (innerText === 'Hourly' || innerText === 'Fixed-price') &&
//               element
//             ) {
//               jobType = innerText;
//               const contractValue = parentNode.querySelector('strong');
//               answer.push(`${contractValue.innerText}`);
//             }
//           }
//           answer.push(jobType);
//           return answer.join(', ');
//         };

//         const extractJobURL = () => {
//           const selector = `input.up-input`;
//           const element = document.querySelector(selector);

//           if (element) {
//             const jobUrl = element.value;
//             console.log('[jobUrl]', jobUrl);
//             return jobUrl;
//           }

//           return '';
//         };

//         // const full = `
//         // [Proposal]
//         // ${proposal}
//         // ===============================================

//         // ${title}
//         // [URL] ${jobURL}
//         // [Feature] ${feature}

//         // ==================================================

//         // [Content]
//         // ${content}

//         //       `;

//         const header = extractHeader();
//         const budget = extractJobFeatures();
//         const jobURL = extractJobURL();
//         const summary = `${header} \n[URL] ${jobURL}\n[Budget] ${budget}`;
//         // console.log(summary)
//         fetch(
//           'https://hooks.slack.com/services/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',
//           {
//             method: 'POST',
//             body: JSON.stringify({
//               text: summary,
//             }),
//           }
//         )
//           .then((response) => response.json())
//           .then((data) => {
//             console.log('wow:', data);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       },
//     });
//     //   } else if (nextState === "OFF") {
//     //     // Remove the CSS file when the user turns the extension off
//     //     await chrome.scripting.removeCSS({
//     //       files: ["focus-mode.css"],
//     //       target: { tabId: tab.id },
//     //     });
//     //   }
//   }
// });

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    // Send a message to the content script
    chrome.tabs.sendMessage(tabId, { action: 'manipulateDOM' }, (response) => {
      console.log(response);
    });
    console.log('[changeInfo]', changeInfo);
  }
});
