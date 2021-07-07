import React from 'react';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { Button, Jumbotron, Card, Row, Col, Container } from 'react-bootstrap';
import Layout from './shared/Layout';

const Home = (props) => {
    const [projects,setProjects] = useState([]);
    useEffect(() => {
        fetch("api/projects")
        .then(res => res.json())
        .then(res => {
            setProjects(res.slice(0,4))
        })
    },[])
    return (
        <Layout>
            <main className='mx-auto'>
                <Jumbotron className="mt-4">
                    <h1>Welcome to Project Explorer</h1>
                    <p>Project Explorer ia a repository for final year project across all departments at your institution. You can submit your project and search projects submitted by others to learn from</p>
                    <Button variant="primary" href="./Signup" >Get started</Button>
                    <Button variant="secondary" href="./Login" >Login</Button>
                </Jumbotron>

                <Container>
                    <Row className="showcase">
                         {projects.map(project => <Col>
                            <Card>
                                <Card.Body >
                                    <Card.Title><Link to={`/projects/${projects.id}`}>{project.title}</Link></Card.Title>
                                    <Card.Subtitle>{project.authors}</Card.Subtitle>
                                    <Card.Text>{project.abstract}</Card.Text>
                                    <Card.Footer>{project.tags}</Card.Footer>
                                </Card.Body>
                            </Card>
                        </Col>)}
                    </Row>
                </Container> <br/><br/>


            </main>
        </Layout>
    )
}
export default Home;