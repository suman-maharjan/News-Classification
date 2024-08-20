import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedin } from "../utils/login";
import { removeToken } from "../utils/sessions";

function NavBar() {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    removeToken();
    navigate("/login");
  };
  return (
    <>
      <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand>
            <Link to={"/"} className="text-dark text-decoration-none">
              News Classifier
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {isLoggedin() ? (
                <Link
                  onClick={handleLogout}
                  className="nav-link text-dark text-decoration-none"
                >
                  Logout
                </Link>
              ) : (
                <Link
                  to={"/login"}
                  className="nav-link text-dark text-decoration-none"
                >
                  Login
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
