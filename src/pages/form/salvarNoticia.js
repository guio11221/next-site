import Head from 'next/head'
import React, { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';

import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';



export default function SALVAR() {

    const customBase64Uploader = async (event) => {
        // convert file to base64 encoded
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

        reader.readAsDataURL(blob);

        reader.onloadend = function () {
            const base64data = reader.result;

        };
    };

    return (
        <>


            <Head>
                <title>Salvar Noticia</title>
            </Head>

            <center>


                <form action="/api/bd/insertNotici" method='POST' className="flex flex-column align-items-center gap-2">
                    <Card>
                        <div className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5">
                            <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                                <label htmlFor="titulo" className="w-6rem">
                                    Titulo:
                                </label>
                                <InputText name='titulo' id="titulo" type="text" />
                            </div>
                            <br />
                            <div className="flex flex-wrap justify-content-center align-items-center ">
                                <label htmlFor="noticia" className="w-6rem">
                                    Notícia:
                                </label>
                                <InputTextarea name='noticia' rows={5} cols={30} />

                            </div>
                            <br />
                            <div className="card flex justify-content-center" >
                                <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload uploadHandler={customBase64Uploader} />
                            </div>
                            <br />
                            <Button type="submit" label="Submit" icon="pi pi-check" />
                        </div>

                    </Card>
                </form>
            </center>
        </>
    )
}