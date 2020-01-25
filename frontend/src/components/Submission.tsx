import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {useStore} from "../stores";
import {Link, useParams} from "react-router-dom";
import {Icon, Loader, Segment} from "semantic-ui-react";
import { Button, Comment, Form, Header } from 'semantic-ui-react'

import Links from "../enums";
import {useForm} from "react-hook-form";

import {Instance} from "mobx-state-tree";
import {RootStore} from "../stores/rootStore";
import {Comment as CommentStore} from "../stores/comments";
type CommentType = Instance<typeof CommentStore>;

// const CommentAction: React.FC<{}> = observer((comment) => {
//     const { submission } = useStore();
//     const {reply, handleSubmit, errors} = useForm({});
//
//     return (
//     <Comment.Actions>
//         <Comment.Action onClick={()=>submission.changeActiveReply(comment.id)}>Reply</Comment.Action>
//         <Form reply onSubmit={handleSubmit()}>
//             <Form.TextArea />
//             <Button content='Add Reply' labelPosition='left' icon='edit' primary  />
//         </Form>
//     </Comment.Actions>
//     )
// });

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
    }

    function buildComments(comments:any) {
        console.log(comments);
        return comments.filter((el:CommentType) => Boolean(el.children)).map(
            (comment:CommentType) =>
                <Comment.Group>
                <Comment key={comment.id}>
                <Comment.Avatar src={comment.author?.gravatar_url} />
                <Comment.Content>
                    <Comment.Author as='a'>{comment?.author?.username}</Comment.Author>
                    <Comment.Metadata>
                        <div>{comment.created_at.toString()}</div>
                    </Comment.Metadata>
                    <Comment.Text>
                        <p>{comment.raw_comment} hell world</p>
                    </Comment.Text>
                    <Comment.Actions>
                        {comment.opened?<Comment.Action onClick={() => comment.toggle()}>Hide

                        </Comment.Action>:<Comment.Action onClick={() => comment.toggle()}>Reply</Comment.Action>}
                    </Comment.Actions>
                    {comment.opened? <Form reply><Form.TextArea />
                    <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                    </Form>:""}
                </Comment.Content>
                     {comment.children?buildComments(comment.children.map(id => submission.comments.get(String(id)))):''}
            </Comment>
                    </Comment.Group>);
    }
    const comments = buildComments(Array.from(submission.comments.values()).filter(c => c.parent === null));

    return (
        <div>
            <h1> {submission.submission.title} </h1>
            <h2> {submission.submission.url} </h2>
            <p> {submission.submission.text} </p>


        <Comment.Group>
            <Header as='h3' dividing>
                Comments
            </Header>
            {comments}


            <Comment>
                <Comment.Avatar src='http://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
                <Comment.Content>
                    <Comment.Author as='a'>Elliot Fu</Comment.Author>
                    <Comment.Metadata>
                        <div>Yesterday at 12:30AM</div>
                    </Comment.Metadata>
                    <Comment.Text>
                        <p>This has been very useful for my research. Thanks as well!</p>
                    </Comment.Text>
                    <Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>

                    </Comment.Actions>
                </Comment.Content>
                <Comment.Group>
                    <Comment>
                        <Comment.Avatar src='http://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                        <Comment.Content>
                            <Comment.Author as='a'>Jenny Hess</Comment.Author>
                            <Comment.Metadata>
                                <div>Just now</div>
                            </Comment.Metadata>
                            <Comment.Text>Elliot you are always so right :)</Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                                <Form reply>
                                    <Form.TextArea />
                                    <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                                </Form>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>
                </Comment.Group>
            </Comment>

            <Comment>
                <Comment.Avatar src='http://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                <Comment.Content>
                    <Comment.Author as='a'>Joe Henderson</Comment.Author>
                    <Comment.Metadata>
                        <div>5 days ago</div>
                    </Comment.Metadata>
                    <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
                    <Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                </Comment.Content>
            </Comment>

            <Form reply>
                <Form.TextArea />
                <Button content='Add Reply' labelPosition='left' icon='edit' primary />
            </Form>
        </Comment.Group>
        </div>
)
});

export {Submission};