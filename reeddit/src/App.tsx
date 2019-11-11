import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link, RouteComponentProps} from "react-router-dom";
import {Segment, Menu, Container, Button} from 'semantic-ui-react';
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";



type TParams = { id?: string };


function Product({match}: RouteComponentProps<TParams>) {
  return <h2>This is a page for product with ID: {match.params.id} </h2>;
}



const App: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("home");
  return (
         <Router>
       <div>
         <Menu size='large'>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={event => setActiveItem( "home") }
        />

        <Menu.Item
          name='messages'
          active={activeItem === 'messages'}
          onClick={event => setActiveItem('messages')}
        > <Link to={'/products/11'}>Text </Link> </Menu.Item>



        <Menu.Menu position='right'>
            <Menu.Item>
                              <Link to={"/login"}>

                <Button primary>Login</Button>
                                                </Link>

          </Menu.Item>
          <Menu.Item>
              <Link to={"/signup"}>
            <Button primary>Sign Up</Button>
              </Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
         <Container >
           <Segment>
         <Route path="/login" exact component={LoginForm} />
         <Route path="/products/:id" component={Product} />
         <Route path="/signup" exact component={SignupForm} />

         </Segment>
         </Container>
       </div>
     </Router>
  );
}

export default App;
