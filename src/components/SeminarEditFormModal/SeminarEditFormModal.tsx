import React from 'react';
import styles from './SeminarEditFormModal.module.scss';
import Overlay from "../common/Overlay/Overlay";
import {useEscapeModalCloser} from "../../redux/hooks";
import {SeminarItemType} from "../../types";

type SeminarEditFormType = {
    seminarData: SeminarItemType,
    editSeminarData: (e: React.FormEvent) => void,
    cancel: () => void,
    cancelEditing: () => void,
    setSeminarData: (seminarData: SeminarItemType) => void,
    isEditFormOpen: boolean
}

const SeminarEditFormModal: React.FC<SeminarEditFormType> = (props) => {

    useEscapeModalCloser(props.cancel)

    // Функция для преобразования формата даты для отображения в поле ввода
    const formatDateForInput = (dateStr: string): string => {
        const parts = dateStr.split(".")
        if (parts.length === 3) {
            const [day, month, year] = parts
            return `${year}-${month}-${day}` // Преобразование в YYYY-MM-DD
        }
        return dateStr
    }

    // Функция для преобразования формата даты при редактировании для отображения на странице
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value // Формат YYYY-MM-DD
        const parts = newDate.split("-")
        if (parts.length === 3) {
            const [year, month, day] = parts
            props.setSeminarData({
                ...props.seminarData,
                date: `${day}.${month}.${year}` // Преобразование обратно в DD.MM.YYYY
            })
        }
    }

    // Функция для выделения URL из ссылки на изображение
    const extractUrl = (url: string): string => {
        try {
            const urlObj = new URL(url)
            if (urlObj.hostname.includes('google.') && urlObj.pathname.includes('imgres')) {
                const urlParam = urlObj.searchParams.get('imgurl')
                if (urlParam) return decodeURIComponent(urlParam)
            }
            return url
        } catch (error) {
            return url
        }
    }

    return (
        <>
            {props.isEditFormOpen &&
                <>
                    <Overlay/>
                    <form className={styles.form}>
                        <div className={styles.form__field}>
                            <label className={styles.form__input_label} htmlFor="title">
                                Title*
                            </label>
                            <input id="title"
                                   type="text"
                                   value={props.seminarData.title}
                                   placeholder="Title"
                                   onChange={(e) => props.setSeminarData({
                                       ...props.seminarData,
                                       title: e.target.value
                                   })}/>
                        </div>
                        <div className={styles.form__field}>
                            <label className={styles.form__input_label} htmlFor="description">Description</label>
                            <input id="description"
                                   value={props.seminarData.description}
                                   placeholder="Description"
                                   onChange={(e) => props.setSeminarData({
                                       ...props.seminarData,
                                       description: e.target.value
                                   })}
                            />
                        </div>
                        <div>
                            <label className={styles.form__input_label} htmlFor="date">Date</label>
                            <input type="date"
                                   id="date"
                                   value={formatDateForInput(props.seminarData.date)}
                                   onChange={handleDateChange}
                            />
                        </div>
                        <div>
                            <label className={styles.form__input_label} htmlFor="time">Time</label>
                            <input type="time"
                                   id="time"
                                   value={props.seminarData.time}
                                   onChange={(e) => props.setSeminarData({
                                       ...props.seminarData,
                                       time: e.target.value
                                   })}
                            />
                        </div>
                        <div>
                            <label className={styles.form__input_label} htmlFor="photo">Photo</label>
                            <input type="url"
                                   id="photo"
                                   value={props.seminarData.photo}
                                   onChange={(e) => props.setSeminarData({
                                       ...props.seminarData,
                                       photo: extractUrl(e.target.value)
                                   })}
                            />
                        </div>
                        <button onClick={props.editSeminarData}>
                            Edit seminar
                        </button>
                        <button onClick={props.cancel}>Cancel</button>
                    </form>
                </>
            }
            </>
    );
}


export default SeminarEditFormModal;