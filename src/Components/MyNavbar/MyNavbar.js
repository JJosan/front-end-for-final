import React from 'react'
import './MyNavbar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, NavbarBrand, NavItem, NavbarToggler, Collapse, Nav, NavLink} from 'reactstrap'


function MyNavbar() {

  const signIn = async () => {

    fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(data => console.log(data));
    // setLoginState({
    //   name: "testname",
    //   username: "testusername"
    // })
  }

  // const signOut = () => {
  //   setLoginState({
  //     name: undefined,
  //     username: undefined
  //   })
  // }


  return (
    <Navbar color="light" expand="md" light>
      <NavbarBrand href="/">DivvyUp</NavbarBrand>
      <NavbarToggler onClick={function noRefCheck(){}} />
      <Collapse navbar>
        <Nav className="ms-auto" navbar >

          <NavItem><NavLink to="Test">Home</NavLink></NavItem>

          <NavItem><NavLink to="">How to use</NavLink></NavItem>

          <NavItem><NavLink to="">About Us</NavLink></NavItem>

          <NavItem><NavLink href='/signin'>Sign In</NavLink></NavItem>
          {/* {!loginState.username ?
            <NavItem><NavLink  onClick={signIn}>Sign In</NavLink></NavItem>
            :
            <p>hello</p>
            //href='/signin'
            // <NavItem><NavLink href='/signout' >Sign Out</NavLink></NavItem>
          } */}
          

      </Nav>
    </Collapse>
  </Navbar>
  )
}

export default MyNavbar