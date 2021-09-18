import React from 'react'
import { Toast } from 'react-bootstrap'

export default function ToastAlert({ setShow, show, message }) {
    return (
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Header>
                <strong className="mr-auto">{message}</strong>
                <small>few seconds ago</small>
            </Toast.Header>
            <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
    )
}
