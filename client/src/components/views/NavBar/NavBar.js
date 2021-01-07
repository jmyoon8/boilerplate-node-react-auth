import React, { useState } from 'react';
import LeftMenu from'./Sections/LeftMenu';
import RightMenu from'./Sections/RightMenu';
import {Drawer, Button} from 'antd';
import './Sections/Navbar.css'

function NavBar() {

    const [visible, setVisivle]=useState(false)
    const showDrawer =()=>{
        setVisivle(true)
    };

    const onClose=()=>{
        setVisivle(false)
    }
   
    return (

        <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
        <span className="menu__logo">
          <a href="/">HOME</a>
        </span>
        <div className="menu__container">
          <div className="menu_left">
            <LeftMenu mode="horizontal" />
          </div>
          <div className="menu_rigth">
            <RightMenu mode="horizontal" />
          </div>
          <Button
            className="menu__mobile-button"
            type="primary"
            onClick={showDrawer}
          >
            
          </Button>
          <Drawer
            title="Basic Drawer"
            placement="right"
            className="menu_drawer"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <LeftMenu mode="inline" />
            <RightMenu mode="inline" />
          </Drawer>
        </div>
      </nav>
    )
}

export default NavBar
