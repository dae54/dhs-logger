import { useEffect, useState } from 'react'
import * as UsersAPI from '../../api/authAPI'
import MaterialTable from 'material-table'
import moment from 'moment'
import NewUser from './newUser'

export default function Users() {
    const [users, setUsers] = useState([])
    const [status, setStatus] = useState({ code: 1, message: '' })
    const [modalVisible, setModalVisible] = useState(false)

    async function getAllUsers() {
        setStatus({ code: 0, message: '' })

        await UsersAPI.getAll()
            .then(data => {
                setUsers(data)
                setStatus({ code: 1, message: '' })
            })
            .catch(error => {
                console.log(error)
                setStatus({ code: 2, message: error.message })
            })
    }

    useEffect(() => {
        getAllUsers()
        return () => {
        }
    }, [])

    return (
        <div className="container-fluid mt-3">
            <div className="d-flex justify-content-end">
                <NewUser show={modalVisible} setShow={setModalVisible} />
                <div className="btn btn-neutral mb-2 px-6" onClick={() => setModalVisible(true)}>New User</div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="card">
                        <MaterialTable
                            data={users}
                            editable={{
                                onRowUpdate: async (newData, oldData) => {
                                    // console.log(newData)
                                    const payload = { ...newData, team: newData.teamNumber }
                                    console.log(payload)
                                    await UsersAPI.updateOne(payload).then(res => {
                                        const dataUpdate = [...users];
                                        const index = oldData.tableData.id;
                                        dataUpdate[index] = newData;
                                        setUsers([...dataUpdate]);
                                    }).catch(error => {
                                        console.error(error)
                                    })
                                },
                                onRowDelete: async oldData => {
                                    console.log('delete')
                                    await UsersAPI.deleteOne(oldData._id)
                                        .then(res => {
                                            const dataDelete = [...users];
                                            const index = oldData.tableData.id;
                                            dataDelete.splice(index, 1);
                                            setUsers([...dataDelete]);
                                        }).catch(error => {
                                            console.error(error)
                                        })
                                },
                            }}
                            isLoading={status.code === 0}
                            title='Registered Clusters'
                            columns={[
                                { title: 'First Name', field: 'firstName' },
                                { title: 'Last Name', field: 'lastName', },
                                { title: 'Email', field: 'email', },
                                {
                                    title: 'Role', field: 'role', lookup: {
                                        1: 'Administrator',
                                        2: 'Member'
                                    }
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
