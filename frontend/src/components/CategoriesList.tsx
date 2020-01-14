import React from 'react'
import { Button, Comment, Form, Header, List} from 'semantic-ui-react'
import {observer} from "mobx-react-lite";
import {useStore} from "../stores";
import Links from "../enums";
import {Link} from "react-router-dom";

const CategoriesList: React.FC<{}> = observer(() => {
    const { categories } = useStore();
    const items = categories.cats;
    return (
    <List>
        {items.map((item: any) => <List.Item key={item.id}>
                <Link to={Links.Category + String(item.id)}> {item.display_name}</Link>
        </List.Item>)}
    </List>)
});

export default CategoriesList;