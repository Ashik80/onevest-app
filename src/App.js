import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const PARTNER_USER_ID = 2;
  const PRIMARY_EMAIL = 'ashik@manzil.ca';

  const [html, setHtml] = useState();

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
    setHtml(data);
  };

  const getOnevestJwtToken = async () => {
    const proxy = 'http://localhost:8080/'
    const mainURL = `https://webhook-gateway-service.staging.onewealth.io/tokens/generate-staging-jwt?partnerUserId=${PARTNER_USER_ID}&primaryEmail=${PRIMARY_EMAIL}`
    const URL = `${proxy}${mainURL}`;

    try {
      const response = await fetch(URL);
      if (response.status === 200) {
        const data = await response.json();
        if (data) {
          await getOnevestPartner(data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOnevestJwtToken();
  }, []);

  return (
    <div className="App">
      Onevest
      {html !== '' &&
        <iframe title='full' sandbox="allow-scripts allow-forms allow-same-origin" width="100%" height="800" srcDoc={html}>
        </iframe>
      }
    </div>
  );
}

export default App;
