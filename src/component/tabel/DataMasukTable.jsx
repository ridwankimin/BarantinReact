import React, { useCallback, useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component'
import PtkModel from '../../model/PtkModel'
import { useNavigate } from 'react-router-dom'
import {decode as base64_decode, encode as base64_encode} from 'base-64'
import Cookies from 'js-cookie'

const tableCustomStyles = {
    headCells: {
      style: {
        backgroundColor: '#123138',
        fontWeight: 'bold',
        color: '#C8D6BE',
        border: 'solid 1px #EEEEEE',
    },
    },
    cells: {
        style: {
            borderRightStyle: 'solid',
			borderRightWidth: '0.5px',
			borderRightColor: '#EEEEEE',
        }
    }
  }
const columns = [
    // {
    //     name: 'No',
	// 	selector: row => row.id,
    //     sortable: true,
    //     width: '4%'
	// },
	{
        name: 'No Aju',
		selector: row => row.noAju,
        sortable: true,
        width: '11%' //14
	},
	{
        
        name: 'Karantina',
		selector: row => row.karantina,
        sortable: true,
        // width: '6%' //19
	},
	{
        
        name: 'No Dokumen',
		selector: row => row.noDokumen,
        sortable: true,
        width: '10%' //29
	},
	{
        
        name: 'Tgl Dokumen',
		selector: row => row.tglDokumen,
        sortable: true,
        // width: '8%' //37
	},
	{
        
        name: 'Jenis',
		selector: row => row.jenisPermohonan,
        sortable: true,
        // width: '5%' //42
	},
	{
        name: 'Status',
		selector: row => row.status,
        sortable: true,
        // width: '5%' //47
	},
	{
        name: 'Pemohon',
		selector: row => row.pemohon,
        sortable: true,
        // width: '7%' //54
	},
	{
        name: 'Pengirim',
		selector: row => row.pengirim,
        sortable: true,
        // width: '7%' //61
	},
	{
        name: 'Penerima',
		selector: row => row.penerima,
        sortable: true,
        // width: '7%' //68
	},
	{
        name: 'Kota Asal',
		selector: row => row.kotaAsal,
        sortable: true,
        // width: '8%' //76
	},
	{
        name: 'Negara Asal',
		selector: row => row.negaraAsal,
        sortable: true,
        // width: '8%' //84
	},
	{
        name: 'Kota Tujuan',
		selector: row => row.kotaTujuan,
        sortable: true,
        // width: '8%' //94
	},
	{
        name: 'Negara Tujuan',
		selector: row => row.negaraTujuan,
        sortable: true,
        // width: '8%' //94
	},
	{
        name: 'Tgl Tiba',
		selector: row => row.tglTiba,
        sortable: true,
        // width: '7%' //94
	},
	{
        name: 'Nama Alat Angkut',
		selector: row => row.namaAngkut,
        sortable: true,
        // width: '8%' //94
	},
	{
        name: 'No Alat Angkut',
        selector: row => row.noAngkut,
        sortable: true,
        // width: '8%' //94
	},
	{
        name: 'Status Bayar',
        selector: row => row.statusBayar,
        sortable: true,
        // width: '7%' //94
	},
];

function DataMasukTable(props) {
    let navigate = useNavigate();
    let [dataTable, setDataTable] = useState({});
    let model = useMemo(() => new PtkModel(), []);
    const [filterText, setFilterText] = React.useState('');

    const getListPtk = useCallback(async () => {
        try {
            const response = await model.getPtkList(props.dataIn)
            console.log(response.data)
            if(response.data.status === '200') {
                const dataReturn = response.data.data;
                // setTotalRows(dataReturn.length)
                const arrayData = dataReturn.map((item, index) => {
                    return {
                        id: index + 1,
                        idPtk: item.id,
                        noAju: item.no_aju,
                        karantina: (item.jenis_karantina === 'T' ? 'Tumbuhan' : (item.jenis_karantina === 'I' ? 'Ikan' : 'Hewan')),
                        noDokumen: item.no_dok_permohonan,
                        tglDokumen: item.tgl_dok_permohonan,
                        jenisPermohonan: (item.jenis_permohonan === 'EX' ? 'Ekspor' : (item.jenis_permohonan === 'IM' ? 'Impor' : (item.jenis_permohonan === 'DK' ? 'Dokel' : (item.jenis_permohonan === 'DM' ? 'Domas' : (item.jenis_permohonan === 'RE' ? 'Re Ekspor' : (item.jenis_permohonan === 'RI' ? 'Re Impor' : (item.jenis_permohonan === 'TR' ? 'Transit' : 'Serah Terima'))))))),
                        status: (item.status_ptk === 0 ? 'Draft' : (item.status_ptk === 9 ? 'Pengajuan' : (item.status_ptk === 1 ? 'Diterima' : (item.status_ptk === 2 ? 'Ditolak' : 'blm diset')))),
                        pemohon: item.nama_pemohon,
                        pengirim: item.nama_pengirim,
                        penerima: item.nama_penerima,
                        kotaAsal: item.kota_asal,
                        negaraAsal: item.asal,
                        kotaTujuan: item.kota_tujuan,
                        negaraTujuan: item.tujuan,
                        tglTiba: item.tanggal_rencana_tiba_terakhir,
                        namaAngkut: item.nama_alat_angkut_terakhir,
                        noAngkut: item.no_voyage_terakhir,
                        statusBayar: item.status_bayar,
                    }
                })
                const filteredItems = arrayData.filter(
                    item => 
                        (item.noAju && item.noAju.toLowerCase().includes(filterText.toLowerCase())) | 
                        (item.karantina && item.karantina.toLowerCase().includes(filterText.toLowerCase())) |
                        (item.noDokumen && item.noDokumen.toLowerCase().includes(filterText.toLowerCase())) |
                        (item.tglDokumen && item.tglDokumen.toLowerCase().includes(filterText.toLowerCase())) |
                        (item.jenisPermohonan && item.jenisPermohonan.toLowerCase().includes(filterText.toLowerCase())) |
                        (item.status && item.status.toLowerCase().includes(filterText.toLowerCase())) |
                        (item.pemohon && item.pemohon.toLowerCase().includes(filterText.toLowerCase())) |
                        (item.pengirim && item.pengirim.toLowerCase().includes(filterText.toLowerCase())) |
                        (item.penerima && item.penerima.toLowerCase().includes(filterText.toLowerCase())) |
                        (item.kotaAsal && item.kotaAsal.toLowerCase().includes(filterText.toLowerCase())) |
                        (item.negaraAsal && item.negaraAsal.toLowerCase().includes(filterText.toLowerCase())) |
                        (item.kotaTujuan && item.kotaTujuan.toLowerCase().includes(filterText.toLowerCase())) |
                        (item.negaraTujuan && item.negaraTujuan.toLowerCase().includes(filterText.toLowerCase())) |
                        (item.tglTiba && item.tglTiba.toLowerCase().includes(filterText.toLowerCase())) |
                        (item.namaAngkut && item.namaAngkut.toLowerCase().includes(filterText.toLowerCase())) |
                        (item.noAngkut && item.noAngkut.toLowerCase().includes(filterText.toLowerCase())) |
                        (item.statusBayar && item.statusBayar.toLowerCase().includes(filterText.toLowerCase())),
                    );
                setDataTable(filteredItems);
            }
        } catch (error) {
            console.log(error)
        }
    }, [model, props.dataIn, filterText])
    
    useEffect(() => {
      getListPtk()
    }, [getListPtk])

    const subHeaderComponentMemo = React.useMemo(() => {

		return (
            <div className='col-sm-3'>
                <input
                id="search"
                type="text"
                className='form-control form-control-sm'
                placeholder="Search.."
                aria-label="Search Input"
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
            />
            </div>
		);
	}, [filterText]);

    function handleClick(e) {
        if (window.confirm('Anda memilih No AJU ' + e.selectedRows[0].noAju)) {
            // alert(e.selectedRows[0].noAju)
            Cookies.set("idPtkPage", base64_encode(base64_encode(e.selectedRows[0].noAju) + 'm0R3N0r1R' + base64_encode(e.selectedRows[0].idPtk) + "m0R3N0r1R"  + base64_encode(e.selectedRows[0].noDokumen)), {
                expires: 3,
            });
            Cookies.set("tglPtk", e.selectedRows[0].tglDokumen, {
                expires: 3
            });
            Cookies.set("jenisKarantina", (e.selectedRows[0].karantina === "Tumbuhan" ? "T" : (e.selectedRows[0].karantina === "Hewan" ? "H" : "I")), {
                expires: 3
            });
            Cookies.set("jenisForm", "PTK", {
                expires: 3
            });
            navigate('/k11')
            // navigate('/k11/' + base64_encode(base64_encode(e.selectedRows[0].noAju) + 'm0R3N0r1R' + base64_encode(e.selectedRows[0].idPtk) + "m0R3N0r1R"  + base64_encode(e.selectedRows[0].noDokumen)))
        }
        console.log(e)
    }

  return (
        <DataTable
                title='Table Data PTK'
                customStyles={tableCustomStyles}
                columns={columns}
                data={dataTable}
                selectableRows
                selectableRowsSingle
                onSelectedRowsChange={handleClick}
                pagination
                paginationServer
                dense
                direction="auto"
                fixedHeader
                fixedHeaderScrollHeight="350px"
                highlightOnHover
                pointerOnHover
                responsive
                striped
                subHeader
			    subHeaderComponent={subHeaderComponentMemo}
			    // persistTableHead
            />
  )
}

export default DataMasukTable