import React from 'react';
import Overlay from "../Overlay/Overlay";
import styles from './ConfirmDeleteModal.module.scss';
import {useEscapeModalCloser} from "../../../redux/hooks";

type ConfirmDeleteModalType = {
    deleteItem: () => void,
    setConfirmDelete: (confirmDelete: boolean) => void,
    confirmDelete: boolean
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalType> = (props) => {

    useEscapeModalCloser(() => props.setConfirmDelete(false))

    return (
        <>
            {props.confirmDelete && <>
                <Overlay/>
                <div className={styles.confirm}>
                    <span>Delete item?</span>
                    <div className={styles.confirm__control}>
                        <button onClick={props.deleteItem}>Delete</button>
                        <button onClick={() => props.setConfirmDelete(false)}>Cancel</button>
                    </div>
                </div>
            </>

            }
        </>
    );
};

export default ConfirmDeleteModal;