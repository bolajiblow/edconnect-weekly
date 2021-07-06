import React, {useState, useEffect } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import Layout from './shared/layout';
import { useHistory } from 'react-router-dom';

const Signup = (props) => {
    const [programs, setPrograms] = useState([]);
    const [gradYears, setGradYears] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [matricNumber, setMatricNmber] = useState('');
    const [programName, setProgramName] = useState('');
    const [graduateYear, setGraduateYear] = useState('');
    const [alerts, setAlerts] = useState([]);
    const [alertBlock, setAlertBlock] = useState(false);
    let history = useHistory();

    useEffect(() => {
        fetch("/api/programs")
        .then(response => response.json())
        .then((res) => {
            setPrograms(res)
        })

        fetch("/api/graduationYears")
        .then(res => res.json())
        .then((resp) => {
            setGradYears(resp)
        })
    },[])

    const handleInputChange = (event) => {
        const {name,value} = event.target
        switch (name) {
            case 'firstName':
                setFirstName(value)
                break;
            case 'lastName':
                setLastName(value)
                break;
            case 'email':
                setEmail(value)
                break;
            case 'password':
                setPassword(value)
                break;
            case 'matricNumber':
                setMatricNmber(value)
                break;
            case 'graduationYear':
                setGraduateYear(value)
                break;
            case 'program':
                setProgramName(value)
        }

    }

    const handleSubmit = event => {
        event.preventDefault();
        let regInfo = {
            firstname :  firstName,
            lastname : lastName,
            email : email,
            password : password,
            matricNumber : matricNumber,
            program : programName,
            graduationYear : graduateYear,
        }
    }

    fetch("/api/register", {
        method: 'POST',
        body: JSON.stringify(regInfo),
        headers: {
               'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(res => {
        if (res.status === "ok") {
            document.cookie = `uid=${res.data.id}; path=/ `; // I am to store the id in a cookie named uid.
            history.push("/"); // redirect user to home page
        } else if (res.status !== "ok") {
            setAlertBlock(true);
            setAlerts(res.errors); // Supposed to print error message.
        }
    })


    return(
        <Layout>
            <main className="mx-auto w-75 mt-5">
                <h2>Signup</h2>
                <Form id="signupForm" onSubmit={handleSubmit}>
                    {alertBlock && (
                    <Alert variant="danger">
                        {alerts.map((anyAlert) => { return <> {anyAlert} <br/></>})}
                    </Alert>)}

                    <Form.Group as={Row}>
                        <Col>
                            <Form.Label for="firstName">First Name</Form.Label>
                            <Form.Control type="text" name="firstName"  id="firstname" value={firstName} onChange={handleInputChange}/>
                        </Col>
                        <Col className="Form-group col-md-6">
                            <Form.Label for="lastName">Last Name</Form.Label>
                            <Form.Control type="text" name="lastName"  id="lastname" value={lastName} onChange={handleInputChange}/>
                        </Col>
                    </Form.Group>   
                    <Form.Group as={Row}>
                        <Col>
                            <Form.Label for="email">Email Address</Form.Label>
                            <Form.Control type="email" id="email" name="email" value={email} onChange={handleInputChange} placeholder="Your Email Address"/>
                        </Col>
                        <Col>
                            <Form.Label for="password">Password</Form.Label>
                            <Form.Control type="password" className="Form-control" id="password" name="password" value={password} onChange={handleInputChange} placeholder="Your password"/>
                        </Col>
                    </Form.Group>    
                    <Form.Group>
                        <Col>
                            <Form.Label for="matricNumber">Matric Number:</Form.Label>
                            <Form.Control type="text" name="matricNumber" className="Form-control" value={matricNumber} onChange={handleInputChange} id="matricNumber"/>
                        </Col>
                        <Col>
                            <Form.Label for="program">Program</Form.Label>
                            <Form.Control as="select" id="program" name="program">
                                <option>Select Program</option>
                                {programs.map(program =><option>{program}</option>)}
                            </Form.Control>
                        </Col>
                        <Col >
                            <Form.Label for="graduationYear">Graduation Year</Form.Label>
                            <Form.Control as="select" id="graduationYear" name="graduationYear" value={graduateYear} onChange={handleInputChange}>
                                <option> Select Graduation Year</option>
                                {gradYears.map((gradYear) => <option>{gradYear}</option>)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Button variant='primary' type="submit">Sign Up</Button>
                </Form>
            </main>
        </Layout>

    )
}
export default Signup;