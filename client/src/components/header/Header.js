import { NavLink } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Header.css'



const styles = {

    logo: {
        maxHeight: '100px',
        width: 'auto'
    },
}

export default function Header() {

    return (

        <Row className="header">
            <Col md={3} className="navLogo">
                

            </Col>
            <Col md={6} className="navCol">
                    <NavLink
                        to='/'
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active navigationLink" : "navigationLink"
                        }
                    >Home
                    </NavLink>

                    <NavLink
                        to='/Login'
                        className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active navigationLink" : "navigationLink"
                    }
                    >Login
                    </NavLink>

                    <NavLink
                        to='/SignUp'
                        className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active navigationLink" : "navigationLink"
                    }
                    >Sign Up
                    </NavLink>

            </Col>
        </Row>

    )
}