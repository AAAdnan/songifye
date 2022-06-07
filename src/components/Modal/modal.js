import React, { Fragment } from "react";
import {
 ModalBlock,
 ModalBody,
 ModalClose,
 ModalContainer,
 ModalFooter,
 ModalHeader,
 ModalOverlay,
 ModalTitle,
} from "./modal.styles";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Modal = ({ title, footer, children, active, hideModal, icon }) => {
    return (
    <Fragment>
        {active && (
        <ModalBlock>
            <ModalOverlay onClick={() => hideModal()}></ModalOverlay>
            <ModalContainer onClick={() => hideModal()}>
                <>
                <FontAwesomeIcon icon={icon} />
                <ModalBody>{children}</ModalBody>
                </>
            </ModalContainer>
        </ModalBlock>
        )}
    </Fragment>
    );
    };
export default Modal;