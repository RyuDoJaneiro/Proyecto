import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

export default function ShowModal({children, filterSelect}) {
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

  return (
        <>
                <button id="calendarButton" onClick={handleShow}>Pedir turno</button>

                <Modal size='lg' centered show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                                <Modal.Title>Buscar profesionales</Modal.Title>
                                {filterSelect}
                        </Modal.Header>
                        <Modal.Body>{children}</Modal.Body>
                </Modal>
        </>
  )
}
