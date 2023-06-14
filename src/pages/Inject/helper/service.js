export const extractHeader = () => {
  const selector = `header>h1`;
  const h1 = document.querySelector(selector);
  if (h1) {
    return h1.innerText;
  }
  return '';
};
export const extractDescription = () => {
  const selector = `.job-description`;
  const content = document.querySelector(selector);
  if (content) {
    return content.innerText;
  }
  return '';
};
export const extractJobFeatures = () => {
  const selector = `small.text-muted`;
  const elements = document.querySelectorAll(selector);
  const answer = [];
  let jobType = '';
  for (const element of elements) {
    const { innerText, parentNode } = element;
    if (innerText === 'Hourly' || innerText === 'Fixed-price') {
      if (element) {
        jobType = innerText;
        const contractValue = parentNode.querySelector('strong');
        answer.push(`${contractValue.innerText}`);
      }
    }
  }
  answer.push(jobType);
  return answer.join(', ');
};

export const extractJobURL = () => {
  const selector = `input.up-input`;
  const element = document.querySelector(selector);

  if (element) {
    const jobUrl = element.value;
    console.log('[jobUrl]', jobUrl);
    return jobUrl;
  }

  return '';
};
