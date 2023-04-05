import Head from 'next/head'
import { Inter } from '@next/font/google'
import React, { useState, useRef } from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Toast } from 'primereact/toast';

const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  const [accessKey, setAccessKey] = useState('')
  const [resposta, setResposta] = useState(null)
  const [open, setOpen] = React.useState(false);
  const toast = useRef(null);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const showError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Nenhum dado retornado..!!', life: 3000 });
  }
  async function getData(event) {
    event.preventDefault()
    handleToggle()

    try {
      const response = await axios.get('/api/bd/getUserId?id=' + accessKey)

      if (response.data.result.length === 0) {
        showError();
        setResposta('Nenhuma noticia encontrada com o id ' + accessKey)
        handleClose();
      } else {
        setResposta(response.data);
        handleClose();
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Head>
        <title>Tabuada</title>
      </Head>

      <br />
      <center>
        <Toast ref={toast} />
        <TextField
          placeholder='Insira o CNPJ'
          id="demo-helper-text-aligned"
          label="CNPJ"
          onChange={(event) => setAccessKey(event.target.value)}
        />

        <br />
        <br />

        <Button onClick={getData}>Consultar CNPJ</Button>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={getData}
        >
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        </Backdrop>


      </center>
      <br />
      {resposta && (
        <div style={{ backgroundColor: 'black', color: 'white', padding: '1rem' }}>
          <div> Resposta:</div>
          <pre style={{ color: 'green' }}>{JSON.stringify(resposta, null, 2)}</pre>
        </div>
      )}
    </>
  )
}
