import React, {useState} from 'react'
import './MyNavbar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, NavbarBrand, NavItem, NavbarToggler, Collapse, Nav, NavLink} from 'reactstrap'

function MyNavbar() {
  const [nav, setNav] = useState(false);
  const toggleNav = () => setNav(!nav);

  return (
    <Navbar color="light" expand="md" light>
      <NavbarBrand href="/">DivvyUp</NavbarBrand>
      <NavbarToggler onClick={toggleNav} />
      <Collapse isOpen={nav} navbar>
        <Nav className="ms-auto" navbar >

          <NavItem><NavLink href="/">Home</NavLink></NavItem>

          <NavItem><NavLink href="/HowTo">How to use</NavLink></NavItem>

          <NavItem><NavLink href="/about">About Us</NavLink></NavItem>

          {/* <div>{
        checkLogin()
          ? ( */}
            <NavItem><NavLink href='/signin'>Sign In</NavLink></NavItem>
            {/* )
          : (  */}
            <NavItem><NavLink href='signout'>Sign Out</NavLink></NavItem>
            {/* )
      }</div> */}

      </Nav>
    </Collapse>
  </Navbar>
  )

  // async function checkLogin() {
  //   try {
  //         var isLoggedIn = await fetch(`api/users/loggedIn`).then(data => console.log(data));
  //   } catch(error) {
  //       throw(error)
  //   }
  //   console.log(isLoggedIn)
  //   return isLoggedIn;
  // }
  
}

export default MyNavbar