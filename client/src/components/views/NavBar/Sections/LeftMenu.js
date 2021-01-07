import React from 'react'
import {Menu} from'antd'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default function LeftMenu(props) {

    return (
        <Menu mode={props.mode}>
            <Menu.Item key='mail'>
                <a href='/'>Home</a>
            </Menu.Item>
            <SubMenu title={<span>Blogs</span>}>
                <MenuItemGroup title='Item1'>
                    <Menu.Item key='setting:1'>Option1</Menu.Item>
                    <Menu.Item key='setting:2'>Option2</Menu.Item>
                </MenuItemGroup>
                <MenuItemGroup title="Item2">
                    <Menu.Item key = "setting:3">Option3</Menu.Item>
                    <Menu.Item key = "setting:4">Option4</Menu.Item>
                </MenuItemGroup>
            </SubMenu>
        </Menu>
    )
}

