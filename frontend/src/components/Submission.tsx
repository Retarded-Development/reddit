import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {useStore} from "../stores";
import {Link, useParams} from "react-router-dom";
import {Icon, Loader, Segment} from "semantic-ui-react";
import Links from "../enums";

const Submission: React.FC<{}> = observer(() => {
    const { submission } = useStore();
    let { id } = useParams();

    useEffect(() => {
        submission.getById(id);
    }, []);
    console.log(id);

    if (submission.loading){
        return <Loader />
    }
    if (!submission.submission){
        return <h2> Not found </h2>
    };

    return (
        <div>

        </div>
    )
});

export {Submission};