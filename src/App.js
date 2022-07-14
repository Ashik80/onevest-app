import { useEffect } from 'react';
import './App.css';

function App() {
  const PARTNER_USER_ID = 2;
  const PRIMARY_EMAIL = 'ashik@manzil.ca';

  const getOnevestJwtToken = async () => {
     const URL = `https://webhook-gateway-service.staging.onewealth.io/tokens/generate-staging-jwt?partnerUserId=${PARTNER_USER_ID}&primaryEmail=${PRIMARY_EMAIL}`;

     const response = await fetch(URL);
     console.log(response);
    //  const data = await response.json();
    //  console.log(data);
  };

  useEffect(() => {
    getOnevestJwtToken();
  });

  return (
    <div className="App">
      Onevest
    </div>
  );
}

export default App;
