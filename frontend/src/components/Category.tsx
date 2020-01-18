import React, {useEffect, useState} from 'react'
import {Button, Comment, Form, Header, List, Loader} from 'semantic-ui-react'
import {observer} from "mobx-react-lite";
import {useStore} from "../stores";
import {Link, useParams} from "react-router-dom";
import Links from "../enums";
import {Submission} from "../stores/submissions";
import {types, Instance, unprotect, castToSnapshot} from "mobx-state-tree";
import { Segment } from 'semantic-ui-react'
import { Card, Icon } from 'semantic-ui-react'


type SubmissionType = Instance<typeof Submission>
const Category: React.FC<{}> = observer(() => {
    const { category } = useStore();
    let { id } = useParams();

    useEffect(() => {
        category.getById(id);
    }, []);
    console.log(id);

    if (category.loading){
        return <Loader />
    }
    if (!category.category){
        return <h2> Not found </h2>
    };

    return (
        <div>
            {category.category.display_name}
            <Segment.Group>
                {category.submissions.map((submission: SubmissionType) =>
                    <Segment key={submission.id} style={{display: "flex", flexDirection: "row" }}>
                        <div style={{
                            margin: "2px",
                            minWidth: "40px",
                            display: "flex", flexDirection: "column", alignItems: "center" }}>
                         <Icon style={{marginBottom: "5px"}} name='triangle up'/>
                            <span style={{marginRight: "3px"}}>{submission.score} </span>
                         <Icon name='triangle down' />
                        </div>
                        <div style={{
                            borderLeft: "1px solid rgb(235, 237, 240)",
                            paddingLeft: "10px",
                            display: "flex", flexDirection: "column", alignItems: "baseline" }}>

                        <Link to={Links.Submission + String(submission.id)}> <strong>{submission.title} title </strong> </Link>
                            <br/>
                            {submission.url?submission.url:""}
                            <br/>
                            {submission.comment_count} comments
                            <Link to={Links.Category + String(submission.category?.id)}> /r/{submission.category?.slug}/ </Link>
                        </div>
                    </Segment>
                )}
            </Segment.Group>
        </div>
    )
});

export default Category;