import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { AppDispatch, logout, setUser, useAppSelector } from "../../store";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const loggedUser = useAppSelector((state) => state.global.user);

  const handleOnClickAddBook = () => {
    navigate("/add-book");
  };

  const handleOnClick = () => {
    navigate("/", { replace: true });
  };

  const handleOnClickLogin = () => {
    navigate("/login", { replace: true });
  };

  const handleOnClickSignUp = () => {
    navigate("/sign-up", { replace: true });
  };

  const handleOnClickLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout(null));
    navigate("/", { replace: true });
  };

  return (
    <Navbar expand='md' className='bg-body-tertiary navbar'>
      <Container>
        <Navbar.Brand onClick={handleOnClick} className='logo'>
          Book Management System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav '>
          <Nav className='me-auto'>
            {!loggedUser && (
              <>
                <Nav.Link onClick={handleOnClickLogin}>Login</Nav.Link>
                <Nav.Link onClick={handleOnClickSignUp}>Sign up</Nav.Link>
              </>
            )}
            <NavDropdown title='Profile' id='basic-nav-dropdown'>
              <NavDropdown.Item href=''>Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={handleOnClickAddBook}>Add Book</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleOnClickLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
