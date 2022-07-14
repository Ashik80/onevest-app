import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const PARTNER_USER_ID = 2;
  const PRIMARY_EMAIL = 'ashik@manzil.ca';

  const [html, setHtml] = useState('');
  
  const getOnevestHtml = (html) => {
    return {__html: html};
  };

  const getOnevestPartner = async (token) => {
    const URL = 'https://webhook-gateway-service.staging.onewealth.io/partner/full';

    const config = {
      'Content-Type': 'text/html; charset=utf-8',
      headers: { 
        'partner-authorization': token
      }
    }

    const response = await fetch(URL, config)

    console.log(response);

    const data = await response.text();
    console.log(data);
    setHtml(data);
  };

  const getOnevestJwtToken = async () => {
    const URL = `https://cors-anywhere.herokuapp.com/https://webhook-gateway-service.staging.onewealth.io/tokens/generate-staging-jwt?partnerUserId=${PARTNER_USER_ID}&primaryEmail=${PRIMARY_EMAIL}`;

    try {
      const response = await fetch(URL);
      const data = await response.json();
      if (data) {
        await getOnevestPartner(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOnevestJwtToken();
  });

  return (
    <div className="App">
      Onevest
      {html &&
        <iframe title='full' sandbox width="100%"
        height="100%" dangerouslySetInnerHTML={getOnevestHtml(html)}></iframe>
      }
    </div>
  );
}

export default App;
