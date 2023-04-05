import React, { useState } from 'react';
import axios from 'axios';

const NfePage = () => {
  const [accessKey, setAccessKey] = useState('');
  const [nfe, setNfe] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/nfe/key?=${accessKey}`);

         if(response.data[0].status == "ERROR"){

          setError(response.message)
         }
    
      setNfe(response.data);
    } catch (error) {
      console.log(error)
      setError(error);
    }
  };

  return (
    <div>
      <input type="text" value={accessKey} onChange={(event) => setAccessKey(event.target.value)} />
      <button onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}

      {nfe && (
        <div>
          <h2>{nfe.nome}</h2>
          <p>status: {nfe.situacao}</p>
          <p> tipo: {nfe.tipo}</p>
          <p>atividade principal: {nfe.atividade_principal[0].text}</p>
        </div>
      )}
    </div>
  );
};

export default NfePage;
