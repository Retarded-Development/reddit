import React, {useEffect, useState} from 'react'
import {Button, Comment, Form, Header, List, Loader} from 'semantic-ui-react'
import {observer} from "mobx-react-lite";
import {useStore} from "../stores";
import {useParams} from "react-router-dom";

const Category: React.FC<{}> = observer(() => {
    const { categories } = useStore();
    let { id } = useParams();
    useEffect(() => {
        categories.getById(id);
    }, []);
    if (categories.loading){
        return <Loader />
    }
    let category = categories.byId.get(String(id));
    if (!category){
        return <h2> Not found </h2>
    }
    return (
        <div>
            {category.display_name}
        </div>
    )
});

export default Category;