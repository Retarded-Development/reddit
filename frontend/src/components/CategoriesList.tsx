import React, {useEffect} from 'react'
import { Button, Comment, Form, Header, List} from 'semantic-ui-react'
import {observer} from "mobx-react-lite";
import {useStore} from "../stores";
import Links from "../enums";
import {Link} from "react-router-dom";
import { Segment } from 'semantic-ui-react'

const CategoriesList: React.FC<{}> = observer(() => {
    const { categories } = useStore();
    useEffect(() => {
        categories.getAll();
    }, [categories]);
    const items = categories.cats;
    return (
    <Segment.Group>
        {items.map((item: any) => <Segment key={item.id}>
                <Link to={Links.Category + item.slug}> {item.display_name}</Link>
        </Segment>)}
    </Segment.Group>)
});

export default CategoriesList;