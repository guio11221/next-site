import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import axios from 'axios';
import Menu from '../../components/Menu';

export default function LazyLoadDemo() {
  const [nodes, setNodes] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);

async function data() {
  try {
    const response = await axios.get('/api/bd/getUser');
    const noticias = response.data.result;
    const nodes = noticias.map((noticia) => {
      return {
        key: noticia.id_noticia.toString(),
        data: {
          titulo: noticia.titulo,
          noticia: noticia.noticia,
          edit: `Nada ainda`
        },
        children: []
      };
    });
    setNodes(nodes);
    setTotalRecords(noticias.length);
    setLoading(false);
  } catch (error) {
    console.log(error.message);
  }
}


  useEffect(() => {
    data();
  }, []); // executa a função data() uma única vez quando o componente é montado

  return (
<>
<Menu />
<br />
<div className="card">
      <TreeTable value={nodes} lazy paginator totalRecords={totalRecords}
        first={first} rows={rows} loading={loading} tableStyle={{ minWidth: '50rem' }}>
        <Column field="titulo" header="Titulo" expander></Column>
        <Column field="noticia" header="Noticia"></Column>
        <Column field="edit" header="Edit"></Column>
      </TreeTable>
    </div>
</>
  );
}
