import React from 'react';
import {useParams} from "react-router-dom";

const Concert = ({...props}) => {
    const params = useParams()
    const id = Number(params.id);
    return (
        <div>

        </div>
    );
};

export default Concert;