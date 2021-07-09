import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Jumbotron, Card, Container, CardGroup } from 'react-bootstrap';
import Layout from './shared/Layout';

const Home = (props) => {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        fetch("api/projects")
            .then(res => res.json())
            .then(res => {
                setProjects(res.slice(0, 4))
            })
    }, [])
    return (
        <Layout>
            <Container>
                <Jumbotron className="mt-4">
                    <h1>Welcome to Project Explorer</h1>
                    <p>Project Explorer ia a repository for final year project across all departments at your institution. You can submit your project and search projects submitted by others to learn from</p>
                    <Button variant="primary" href="./Signup" >Get started</Button>
                    <Button variant="secondary" href="./Login" >Login</Button>
                </Jumbotron>

                <CardGroup className="showcase">

                    {projects.slice(0,4).map(project =>
                        <Card key={project.id}>
                            <Card.Body >
                                <Card.Title><Link to={`/projects/${projects.id}`}>{project.title}</Link></Card.Title>
                                <Card.Subtitle>{project.authors}</Card.Subtitle>
                                <Card.Text>{project.abstract.substring(0, 100)}...</Card.Text>
                                <Card.Footer>{project.tags}</Card.Footer>
                            </Card.Body>
                        </Card>
                    )}

                </CardGroup> <br /><br />
            </Container>
        </Layout>
    )
}
export default Home;