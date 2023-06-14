import React, { useCallback, useState } from 'react';
import {
  extractHeader,
  extractDescription,
  extractJobFeatures,
  extractJobURL,
} from './helper/service';
import useLocalStorage from '../hook/useLocalStorage';
import { useKeyPress } from '../hook/useKeyPress';

const BID_CONTENT_VISIBLE = 'bid-content-visible';

export const ProposalPanel = () => {
  const [proposal, setProposal] = useState('');
  const [contentStatus, setContentStatus] = useLocalStorage(
    BID_CONTENT_VISIBLE,
    true
  );

  // if () {
  //   // Restore the contents of the text field
  //   field.value = sessionStorage.getItem("autosave");
  // }

  // // Listen for changes in the text field
  // field.addEventListener("change", function() {
  //   // And save the results into the session storage object
  //   sessionStorage.setItem("autosave", field.value);
  // });

  const handleTranslateInformation = useCallback(async () => {}, []);
  const handleCopyInformation = useCallback(async () => {
    try {
      const title = extractHeader();
      const content = extractDescription();
      const feature = extractJobFeatures();
      const jobURL = extractJobURL();

      const answer = `
[Proposal]
${proposal}
===============================================

${title} 
[URL] ${jobURL}      
[Feature] ${feature}

==================================================

[Content] 
${content}      


      `;
      console.log('[handleCopyInformation]', answer);
      await navigator.clipboard.writeText(answer);
    } catch (error) {}
  }, [proposal]);

  const handleCopyShareInformation = useCallback(async () => {
    try {
      const header = extractHeader();
      const budget = extractJobFeatures();
      const jobURL = extractJobURL();
      const answer = `${header} \n[URL] ${jobURL}\n[Budget] ${budget}`;
      console.log('[handleCopyInformation]', answer);
      await navigator.clipboard.writeText(answer);
    } catch (error) {}
  }, []);

  const handleClosePanel = useCallback(() => {
    try {
      console.log('[handleClosePanel]');
      setContentStatus(false);
    } catch (error) {}
  }, [setContentStatus]);

  useKeyPress(['F8'], (e) => {
    if (e.ctrlKey === true) {
      setContentStatus(!contentStatus);
    } else {
      handleCopyShareInformation();
    }
  });
  console.log('[contentStatus]', contentStatus);

  return (
    <div
      className={`bid-panel-wrapper ${contentStatus ? 'visible' : 'invisible'}`}
    >
      <div className="container mt-4 position-relative">
        <button
          className="position-absolute bottom btn btn-sm btn-outline-primary rounded-circle"
          style={{ right: '10px', top: '-15px' }}
          onClick={handleClosePanel}
        >
          X
        </button>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Bid Content
          </label>
          <textarea
            className="form-control bid-content"
            rows="5"
            value={proposal}
            onChange={(e) => setProposal(e.target.value)}
          ></textarea>
        </div>
        <div className="d-flex">
          <div className="mr-auto">
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={handleCopyInformation}
            >
              Full Copy
            </button>

            <button
              type="button"
              className="btn btn-sm btn-outline-primary mx-2"
              onClick={handleCopyShareInformation}
            >
              Short Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
