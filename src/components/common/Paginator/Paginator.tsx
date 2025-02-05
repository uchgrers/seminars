import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {changeCurrentPage, changePageSize} from "../../../redux/seminarsSlice";
import styles from './Paginator.module.scss';

const Paginator = () => {

    const dispatch = useAppDispatch()
    const currentPage = useAppSelector(state => state.seminarsReducer.currentPage)
    const pageSize = useAppSelector(state => state.seminarsReducer.pageSize)
    const itemsCount = useAppSelector(state => state.seminarsReducer.seminarsCount)
    const pages = Math.ceil(itemsCount / pageSize) || 1 // Количество страниц

    useEffect(() => { // Эффект для того, чтобы не возникало ситуаций, когда номер текущей страницы
        if (currentPage > pages) { // оказывается больше количества страниц
            dispatch(changeCurrentPage(pages))
        }
    },[dispatch, currentPage, pageSize, itemsCount, pages])

    useEffect(() => { // эффект для плавного поднятия вьюпорта на верх содержимого при
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'}); // переходе между страницами
    }, [currentPage])

    const onPageChange = (action: number) => {
        const newPage = currentPage + action
        if (newPage >= 1 && newPage <= Math.ceil(itemsCount / pageSize)) {
            dispatch(changeCurrentPage(newPage))
        }
    }

    const onPageSizeChange = (e: any) => {
        dispatch(changePageSize(e.target.value))
    }

    return (
        <div className={styles.nav}>
            {
                itemsCount > 5 &&
                <nav className={styles.nav__buttons}>
                    <button onClick={() => onPageChange(-1)}
                            className={currentPage === 1 ? styles.nav__buttonDisabled : ''}
                            disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <button onClick={() => onPageChange(1)}
                            className={currentPage === pages ? styles.nav__buttonDisabled : ''}
                            disabled={currentPage === pages}
                    >
                        Next
                    </button>
                </nav>
            }
            <div>
                <p>{currentPage + ' / ' + pages}</p>
                <label htmlFor="pageSizeSelector">Select page size: </label>
                <select name="pageSizeSelector" id="pageSizeSelector" onChange={onPageSizeChange}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                </select>
            </div>
        </div>
    );
};

export default Paginator;