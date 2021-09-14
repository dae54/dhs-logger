
export default function Logger() {

    async function addRecord() {
        console.log('data')
    }
    return (
        <div className="container-fluid mt-3">
            <div className="row">
                <div className="col">
                    <div className="card">
                        {/* <div className="card-header bg-default">
                            <h2 className='text-center text-white '>Add Data</h2>
                        </div> */}
                        <div className="card-body">
                            <form onSubmit={addRecord} className=''>
                                <h3 className='text-uppercase'>Team Information</h3>
                                <div class="form-row">
                                    <div class="form-group col-md-2">
                                        <label for="inputEmail">Enumerator Number:</label>
                                        <input type="text" class="form-control" />
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label for="inputEmail">Cluster Number:</label>
                                        <input type="text" class="form-control" />
                                    </div>
                                    <div class="form-group col-md-10"></div>
                                    <h5 className='form-group col-md-10'>Team Members</h5>

                                    <div class="form-group col-md-4">
                                        <label for="inputPassword4">Supervisor:</label>
                                        <input type="text" class="form-control" />
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="inputPassword4">Member 1:</label>
                                        <input class="form-control" />
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="inputPassword4">Member 2:</label>
                                        <input class="form-control" />
                                    </div>
                                    {/* <div class="form-group col-md-4">
                                        <label for="inputEmail">Gender/Sex:</label>
                                        <select class="custom-select" id="inputPassword4" >
                                            <option className='form-control' value=''>Select gender</option>
                                            <option className='form-control' value='male'>Male</option>
                                            <option className='form-control' value='female'>Female</option>

                                        </select>
                                    </div> */}
                                    {/* <div class="form-group col-md-4">
                                        <label for="inputPassword4">Phone Number:</label>
                                        <input type="number" class="form-control" id="inputPassword4" />
                                    </div> */}
                                </div>


                                <h3 className='text-uppercase'>Survey Descriptions</h3>
                                <div class="form-row">
                                    <div class="form-group col-md-2">
                                        <label for="inputEmail">Conduct Date:</label>
                                        <input type='date' class="form-control" />
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="inputPassword4">Households expected in cluster:</label>
                                        <input class="form-control" />
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="inputPassword4">households listed:</label>
                                        <input class="form-control" />
                                    </div>

                                    <div class="form-group col-md-10"></div>
                                    <h5 className='form-group col-md-12'>GPS Coordinates</h5>

                                    <div class="form-group col-md-2">
                                        <label >Latitude:</label>
                                        <input type="number" class="form-control" />
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label >Longitude:</label>
                                        <input type='number' class="form-control" />
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label >Altitude:</label>
                                        <input type='number' class="form-control" />
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label >-</label>
                                        {/* <input type='number' class="form-control" /> */}
                                        <button className='form-control btn btn-default px-5' type="button">Decode</button>
                                    </div>

                                    <h5 className='form-group col-md-12'></h5>

                                    <div class="form-group col-md-2">
                                        <label >Region:</label>
                                        <input type="number" class="form-control" />
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label >District:</label>
                                        <input type='number' class="form-control" />
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label >Ward:</label>
                                        <input type='number' class="form-control" />
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label >Street:</label>
                                        <input type='number' class="form-control" />
                                    </div>
                                </div>
                                <button className='float-right btn btn-default px-5' type="submit">Save</button>
                                <button className='float-right btn btn-light px-5 mr-3' type="reset">Clear Input</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
