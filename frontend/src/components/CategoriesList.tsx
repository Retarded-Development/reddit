import React, {useEffect} from 'react'
import { Button, Comment, Form, Header, List, Pagination} from 'semantic-ui-react'
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
    let total_pages = Math.floor(categories.total/10);
    if (categories.total%10 !== 0){
        total_pages = total_pages +1;
    }
    return (<div>
            <Pagination
                defaultActivePage={categories.curent_page}
                firstItem={null}
                lastItem={null}
                pointing
                secondary
                onPageChange={(event, data)=> categories.getAll(data.activePage)}
                totalPages={total_pages}
            />
    <Segment.Group>
        {items.map((item: any) => <Segment key={item.id}>
                <Link to={Links.Category + item.slug}> {item.display_name}</Link>
        </Segment>)}
    </Segment.Group>

    </div>
    )
});

export default CategoriesList;