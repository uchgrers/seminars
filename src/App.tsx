import React, {useEffect, useState} from 'react';
import './App.scss';
import SeminarsList from "./components/SeminarsList/SeminarsList";
import {useAppDispatch} from "./redux/hooks";
import {getSeminars} from "./redux/seminarsSlice";
import Paginator from "./components/common/Paginator/Paginator";
import Preloader from "./components/common/Preloader/Preloader";

function App() {
    const [isLoading, setIsLoading] = useState(true)

    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchSeminars = async () => {
            try {
                await dispatch(getSeminars())
            } finally {
                setIsLoading(false)
            }
        }
        fetchSeminars()
    }, [dispatch])

    return (
        <div className="App">
            {isLoading ? <Preloader/> : <SeminarsList/>}
            <Paginator/>
        </div>
    );
}

export default App;
