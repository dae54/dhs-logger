import React, { useState } from 'react'
import Login from './login'
// import ResetPassword from './forgotPassword'

export default function AuthCheck() {
    const [accountStatus, setAccountStatus] = useState('hasAccount')

    if (accountStatus === 'hasAccount') {
        return (<Login setAccountStatus={setAccountStatus} />)
    }
    //  else if (accountStatus === 'forgotPassword') {
    //     return (<ResetPassword setAccountStatus={setAccountStatus} />)
    // }
}