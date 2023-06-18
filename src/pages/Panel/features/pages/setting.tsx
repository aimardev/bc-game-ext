import React, { useEffect, useState } from 'react';
import { Button } from '../../components/base/button';
import { Divider } from '../../components/base/divider';
import { Input } from '../../components/base/input';
import { Spinner } from '../../components/base/spinner';

export const Setting = () => {
  const [baseUrl, setBaseUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState({ error: false, message: '' });

  useEffect(() => {}, []);

  const handleSave = async () => {};

  return (
    <div className="setting-page">
      <section className="base-setting">
        <Input value={baseUrl} onChange={setBaseUrl} label="Service URL" />
        <Input value={apiKey} onChange={setApiKey} label="API Key" />
        <div className="actions">
          <p className={status.error ? 'error' : 'success'}>{status.message}</p>
          <Button onClick={handleSave}>
            Save
            {busy && <Spinner />}
          </Button>
        </div>
      </section>
      <Divider />
      <section className="contact">
        <p className="text">
          FileScanIO is a next-gen malware analysis platform with the following
          purpose: Providing rapid and in-depth threat analysis services capable
          of massive processing Focus on Indicator-of-Compromise (IOC)
          extraction and actionable context
        </p>
        <p>
          Please get in touch at our{' '}
          <a
            href="https://www.filescan.com/contact/sales"
            target="_blank"
            rel="noreferrer"
          >
            Sales
          </a>{' '}
          contact form to book a technical presentation or try out the free
        </p>
      </section>
    </div>
  );
};
