import React, {useEffect, useState} from 'react';
import styles from "./SeminarItem.module.scss";
import placeholder from '../../images/placeholder.png';
import {SeminarItemType} from "../../types";

const SeminarItemDetails: React.FC<SeminarItemType> = (props) => {

    const [imgSrc, setImgSrc] = useState<string>(props.photo || placeholder)
    const [imgIsLoading, setImgIsLoading] = useState(true)

    // Обновление фото при каждом редактировании URL
    useEffect(() => {
        if (!props.photo) {
            setImgSrc(placeholder)
            setImgIsLoading(false)
            return
        }

        setImgIsLoading(true)
        const img = new Image()
        img.src = props.photo

        img.onload = () => {
            setImgSrc(props.photo)
            setImgIsLoading(false)
        }

        img.onerror = () => {
            setImgSrc(placeholder)
            setImgIsLoading(false)
        }
    }, [props.photo])

    return (
        <div className={styles.item__body}>
            <div className={styles.item__body_textBlock}>
                <div className={styles.item__title}>
                    <h3>{props.title}</h3>
                </div>
                <div className={styles.item__description}>
                    <p>{props.description}</p>
                </div>
                <div>
                    <p>Дата: <time dateTime={props.date}>{props.date}</time></p>
                </div>
                <div>
                    <p>Время: <time>{props.time}</time></p>
                </div>
            </div>
            {imgIsLoading ? (
                <img src={placeholder} alt="Loading..." />
            ) : (
                <img src={imgSrc} alt="Seminar" />
            )}
        </div>
    );
};

export default SeminarItemDetails;