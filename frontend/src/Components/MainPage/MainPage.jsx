import React, {useState} from 'react';
import Searchbar from "../Searchbar/Searchbar.jsx";
import PropertyList from "../PropertyList/PropertyList.jsx";
import Pagination from "./Pagination.jsx";

function MainPage(props) {
    const [properties, setProperties] = useState([]);
    const [page, setPage] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)
    return (
        <div>
            <div>
                <Searchbar properties={properties} changeProperties={(e) => setProperties(e)} page={page}
                           changePageNumber={(e) => setPageNumber(e)} changePage={(e) => setPage(e)}/>
                <PropertyList properties={properties}/>
                <Pagination page={page} changePage={(e) => setPage(e)} properties={properties} pageNumber={pageNumber}/>
            </div>
        </div>
    );
}

export default MainPage;