import React, { useEffect, useState } from 'react'
import * as EnumeratorAPI from '../../api/enumeratorAPI'
import MaterialTable from 'material-table'
import NewEnumerator from './NewEnumerator'

export default function Enumerators() {
    const [enumerators, setEnumerators] = useState([])
    const [status, setStatus] = useState({ code: 1, message: '' })
    const [modalVisible, setModalVisible] = useState(false)

    async function fetchAll() {
        setStatus({ code: 0, message: '' })
        await EnumeratorAPI.getAll()
            .then(data => {
                console.log(data)
                setEnumerators(data)
                setStatus({ code: 1, message: '' })

            }).catch(error => {
                setStatus({ code: 2, message: error.message })
            })
    }

    useEffect(() => {
        fetchAll()
        return () => {
            // setLogData()
            // setStatus()
        }
    }, [])

    return (
        <div className="container-fluid mt-3">
            <div className="d-flex justify-content-end">
                <NewEnumerator setEnumerators={setEnumerators} show={modalVisible} setShow={setModalVisible} />
                <div className="btn btn-neutral mb-2 px-6" onClick={() => setModalVisible(true)}>New Entry</div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="card rounded">
                        <MaterialTable
                            data={enumerators}
                            totalCount
                            editable={{
                                onRowUpdate: async (newData, oldData) => {
                                    await EnumeratorAPI.updateOne(newData).then(res => {
                                        const dataUpdate = [...enumerators];
                                        const index = oldData.tableData.id;
                                        dataUpdate[index] = newData;
                                        setEnumerators([...dataUpdate]);
                                    }).catch(error => {
                                        console.error(error)
                                    })
                                },
                                onRowDelete: async oldData => {
                                    console.log('delete')
                                    await EnumeratorAPI.deleteOne(oldData._id)
                                        .then(res => {
                                            const dataDelete = [...enumerators];
                                            const index = oldData.tableData.id;
                                            dataDelete.splice(index, 1);
                                            setEnumerators([...dataDelete]);
                                        }).catch(error => {
                                            console.error(error)
                                        })
                                },
                            }}
                            isLoading={status.code === 0}
                            title='Registered Enumerators'
                            columns={[
                                {
                                    title: 'Full Name', render: (data) => `${data.firstName} ${data.middleName} ${data.lastName}`,
                                    customFilterAndSearch: (term, rowData) => {
                                        return (`${rowData.firstName} ${rowData.middleName} ${rowData.lastName}`).indexOf(term) !== -1
                                    }
                                },
                                { title: 'Phone Number', field: 'phoneNumber', emptyValue: 'no val' },
                                { title: 'Role', field: 'role', },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
