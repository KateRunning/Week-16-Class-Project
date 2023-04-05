import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  Link,
  // useRouteMatch,
  // useMatch,
  Routes,
  Outlet,
  useParams
} from 'react-router-dom';

export default function App() {
  const posts = [
    {
      id: 1,
      title: 'My First Post',
      date: '4-7-2023',
      content: 'This is my first post'
    },
    {
      id: 2,
      title: 'Checking In',
      date: '4-8-2023',
      content: 'Yesterday was super fun!'
    },
    {
      id: 3,
      title: 'Vacation Time!',
      date: '4-9-2023',
      content: 'Getting ready for Greece!'
    }
  ];


  return (
    <Container>
      <Router>
        <>
          <ButtonGroup>
            <Button variant="outline-secondary">
              <Link to='/'>Home</Link>
            </Button>
            <Button variant="outline-secondary">
              <Link to='/friends'>Friends</Link>
            </Button>
            <Button variant="outline-secondary">
              <Link to='/posts'>Posts</Link>
            </Button>
          </ButtonGroup>

          <Routes>
            <Route path='/posts' element={
              <Posts posts={posts} />}>
              
                <Route
                  path=":postId"
                 element={<Post posts={posts}/>}
                
                />
                <Route index element={<h3>Please Select a Post.</h3>}>
                  
                </Route>
              
            </Route>
            <Route path='/friends' element={
              <Friends names={['Tom', 'Sammie', 'Casey']} />}>
            </Route>
            <Route path='/' element={
              <Home />}>
            </Route>
          </Routes>
        </>
      </Router>
    </Container>
  );


  function Home() {
    return <h2>Home</h2>
  }

  function Friends(props) {
    const { names } = props; //getting names from li 52

    return (
      <div>
        <ul>
          {names.map((friend, index) => (
            <li key={index}>{friend}</li>
          ))}
        </ul>
      </div>
    );
  }

  function Posts({ posts }) {
    // const match = useMatch();


    return (
      <>
        <h2>Posts</h2>

        {posts.map((post, index) => {
          return (
            <Alert key={index} variant="primary">
              <Link to={`${post.id}`}>
                {post.title}
              </Link>
            </Alert>
          );
        })}

        <Outlet />
      </>
    );
  }

  function Post(props) {

    const { posts } = props;
    const { postId } = useParams();
    const findPostById = (id) =>
    posts.filter((post) => post.id == id)[0];
    const data = findPostById(postId)
    return data == undefined ? <h1>404 Not Found</h1> : (
      <Card>
        <Card.Header>{data.title}</Card.Header>
        <Card.Body>
          <Card.Subtitle>{data.date}</Card.Subtitle>
          <Card.Text>{data.content}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}