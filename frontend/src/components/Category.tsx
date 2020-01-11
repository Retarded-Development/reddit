import React, {useEffect, useState} from 'react'
import { Button, Comment, Form, Header, List} from 'semantic-ui-react'
import {observer} from "mobx-react-lite";
import {useStore} from "../stores";
import {useParams} from "react-router-dom";
const axios = require('axios');

const Category: React.FC<{}> = observer(() => {
    // const { categories } = useStore();
    let { id } = useParams();
    const [data, setData] = useState({text: "not found"});
    useEffect(() => {
        const result = axios.get('/api/categories/' + String(id));
        setData(result.data);
    }, []);

    return (
        <div>
            {data?data.text:"dd"}
        </div>
    )
});

export default Category;