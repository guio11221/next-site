import Head from 'next/head'
import { Inter } from '@next/font/google'
import React, { useState, useRef } from 'react'
import Menu from '../components/Menu';
import axios from 'axios'
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { Toast } from 'primereact/toast';
import { Card } from '@mui/material';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Image } from 'primereact/image';
import Link from '@mui/material/Link';
import { useForm, Controller } from 'react-hook-form';

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
    const defaultValues = {
        busca: ''
    };
    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Nenhum dado retornado..!!', life: 3000 });
    }
    const {
        formState: { errors },
    } = useForm({ defaultValues });

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    async function data() {
        try {
            handleToggle()
            var { data } = await axios.get(`https://gnews.io/api/v4/search?q=${accessKey}&lang=pt&country=br&max=20&apikey=666ccdcb7f7afb07b3a5f23c5f64f607`)

            console.log(data.articles)
            setResposta(data.articles)
            handleClose();
        } catch (error) {

            console.log(error.message)
            setResposta('Nada Foi encontrado')
            handleClose();
        }
    }


    return (
        <>
            <Head>
                <title>HOME</title>
            </Head>
            <Menu />
            <div style={{ backgroundColor: 'var(--surface-800)', color: 'var(--highlight-text-color)', borderRadius: 'var(--border-radius)', padding: '3rem' }}>
            <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>


                <br /> 
                <center>
                    <InputText placeholder="Busca Notícias" name='busca' style={{ borderRadius: 10 }} onChange={(event) => setAccessKey(event.target.value)} />
                    {getFormErrorMessage('busca')}
                    <Button icon="pi pi-search" style={{ borderRadius: 10 }} onClick={data} />
                </center>
                <br />               
                <div className="card">
                    {resposta && resposta.map(item => (
                        <div key={item} >
                            <Accordion>
                                <AccordionTab header={item.title}>
                                    <Image src={item.image} alt="Image" width="250" preview />
                                    <p className="m-0">
                                        {item.content}<br /> <br />
                                        <Link
                                            component="button"
                                            variant="body2"
                                            onClick={() => {
                                                window.location.href = item.url
                                            }}
                                        >
                                            Ver tudo sobre a Notícia
                                        </Link>
                                    </p>
                                </AccordionTab>
                            </Accordion>

                        </div>
                    ))}
                </div>
                
                <br />
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            </div>

        </>
    )
}
