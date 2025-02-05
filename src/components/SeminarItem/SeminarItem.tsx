import React, {useEffect, useMemo, useState} from 'react';
import styles from './SeminarItem.module.scss';
import {SeminarItemType} from "../../types";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {editSeminar} from "../../redux/seminarsSlice";
import SeminarEditFormModal from "../SeminarEditFormModal/SeminarEditFormModal";
import SeminarControl from "../SeminarControl/SeminarControl";
import SeminarItemDetails from "./SeminarItemDetails";
import Preloader from "../common/Preloader/Preloader";

const SeminarItem: React.FC<SeminarItemType> = (props) => {

    const dispatch = useAppDispatch()

    const [seminarData, setSeminarData] = useState({
        id: props.id,
        title: '',
        description: '',
        date: '',
        time: '',
        photo: ''
    })
    const [isEditFormOpen, setIsEditFormOpen] = useState(false)
    const seminarsToBeRemoved = useAppSelector(state => state.seminarsReducer.seminarsToBeRemoved)

    // Мемоизация массива элементов, которые в текущий момент удаляются
    const seminarIsRemoving = useMemo(() => {
        return seminarsToBeRemoved.includes(props.id)
    }, [seminarsToBeRemoved, props.id])

    useEffect(() => {
        setSeminarData({
            id: props.id,
            title: props.title,
            description: props.description,
            date: props.date,
            time: props.time,
            photo: props.photo
        })
    }, [props.id, props.title, props.description, props.date, props.time, props.photo])

    const editSeminarData = (e: React.FormEvent) => {
        if (seminarData.title.trim()) {
            dispatch(editSeminar(seminarData))
            setIsEditFormOpen(false)
        }
        e.preventDefault()
    }

    // Функция отмены действия (в данном случае - закрытия модального окна)
    const cancel = () => {
        setIsEditFormOpen(false)
        setSeminarData({
            id: props.id,
            title: props.title,
            description: props.description,
            date: props.date,
            time: props.time,
            photo: props.photo
        })
    }

    return (
        <>
            {!seminarIsRemoving ?
                <li className={styles.item}>
                    <SeminarItemDetails id={props.id}
                                        title={props.title}
                                        description={props.description}
                                        date={props.date}
                                        time={props.time}
                                        photo={props.photo}
                    />
                    <SeminarControl
                        setEditFormIsOpen={setIsEditFormOpen}
                        id={props.id}
                    />
                    {isEditFormOpen && <SeminarEditFormModal editSeminarData={editSeminarData}
                                                             cancel={cancel}
                                                             cancelEditing={() => setIsEditFormOpen(false)}
                                                             setSeminarData={setSeminarData}
                                                             isEditFormOpen={isEditFormOpen}
                                                             seminarData={seminarData}
                    />}
                </li>
                : <Preloader/>
            }
        </>
    );
};

export default SeminarItem;