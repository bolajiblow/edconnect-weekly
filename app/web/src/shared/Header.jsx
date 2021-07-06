import React from 'react';
import { Navbar, Nav, FormLabel, FormControl, Button, Form } from 'react-bootstrap';

const Header = () => {
    const [username, setUsername] = useState('');
    const [biscuit, setBiscuit] = useState(false);
    let history = useHistory();

    if (document.cookie) {
        function getCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)===' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        }

        
        const cookieValue = getCookie("uid");
        let cookieExists = cookieValue ? true : false;
        if (cookieExists) {
            fetch(`/api/users/${cookieValue}`)
                .then(res => res.json())
                .then(function(response) {
                    setUsername(`Hi ${response.firstname}`);
                    setBiscuit(true);
                })
        }
    }

    // When user clicks the logout link
    function HandleLogout(event) {
        document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Delete cookie
        history.push('/') // Redirect to home page
    }

    return (
        <Navbar bg="primary" expand="lg">
            <Navbar.Brand href="/">Project Explorer</Navbar.Brand>
            <Navbar.Collapse>
                <Form inline name="searchForm">
                    <FormLabel className="sr-only" for="searchForm">Search Projects:</FormLabel>
                    <FormControl type="text" className="form-control" name="searchForm" placeholder="Search Projects"/>
                        <Button type="submit" variant="outline-light">Search</Button>
                </Form>
                <Nav className="mr-auto">
                    <Nav.link href="/projects/submit">Projects</Nav.link>
                </Nav>
                <Nav>
                    {biscuit ? (
                    <>
                        <Nav.link href="#" id="logout">Logout</Nav.link>
                        <Navbar.Text id="username">{username}</Navbar.Text>
                    </>) :
                    (<>
                        <Nav.link href="/signup" id="login">Sign Up</Nav.link>
                        <Nav.link href="/login" id="login">Login</Nav.link>
                    </>)}
                </Nav>
               
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;