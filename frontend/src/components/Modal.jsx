import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

export default function ShowModal({children, headerContent, bool, handleClose}) {
  return (
        <>
                <Modal show={bool} onHide={handleClose} size='lg' centered>
                        <Modal.Header closeButton>
                                <Modal.Title>Buscar profesionales</Modal.Title>
                                {headerContent}
                        </Modal.Header>
                        <Modal.Body>{children}</Modal.Body>
                </Modal>
        </>
  )
}
