import React from 'react';
import styles from './SeminarsList.module.scss';
import {useAppSelector, usePaginatedSeminars} from "../../redux/hooks";
import SeminarItem from "../SeminarItem/SeminarItem";

const SeminarsList = () => {
    const pageSize = useAppSelector(state => state.seminarsReducer.pageSize)
    const currentPage = useAppSelector(state => state.seminarsReducer.currentPage)
    const seminars = usePaginatedSeminars({currentPage, pageSize}).seminars
        .map(seminar => <SeminarItem id={seminar.id}
                                     title={seminar.title}
                                     description={seminar.description}
                                     date={seminar.date}
                                     time={seminar.time}
                                     photo={seminar.photo}
                                     key={seminar.id}
        />)

    if (seminars.length === 0) {
        return <h1>No seminars</h1>
    }

    return (
        <ul className={styles.list}>
            {seminars}
        </ul>
    );
};

export default SeminarsList;