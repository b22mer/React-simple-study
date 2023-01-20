// -----------------------------------------------------------------------------------------
// 📌 강의내용중 중요부분 체크
// ⭐️ 집중하자 집중을
// -----------------------------------------------------------------------------------------
// -
import React, { Fragment } from 'react';
import classes from './Modal.module.css'
import ReactDOM from 'react-dom'
const BackDrop =props =>{
    return <div className={classes.backdrop} onClick={props.onClose}/>
}

const ModalOverlay = props =>{
    return (<div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
    );
}

const portalElement = document.getElementById("overlays");
const Modal = (props) => {
    return (
       <Fragment>
        {ReactDOM.createPortal(<BackDrop onClose={props.onClose}/>,portalElement )}
         {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
       </Fragment>
    );
};

export default Modal;