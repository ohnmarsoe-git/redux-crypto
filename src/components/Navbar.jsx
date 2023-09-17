import React, { useState } from "react";
import { Row, Drawer } from "antd";
import { Link } from "react-router-dom";
import MainMenu from "./MainMenu";
import { MenuOutlined } from "@ant-design/icons";

const Navbar = () => {
  // const navItems = [
  //   {
  //     label: "Home",
  //     icon: <HomeOutlined />,
  //     key: "item-1",
  //     path: "/",
  //   },
  //   {
  //     label: "Cryptocurrencies",
  //     icon: <FundOutlined />,
  //     key: "item-2",
  //   },
  //   { label: "Exchanges", icon: <MoneyCollectOutlined />, key: "item-3" },
  //   { label: "News", icon: <BulbOutlined />, key: "item-4" },
  // ];

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Row>
        <div>
          <div
            style={{
              float: "left",
              width: "220px",
              height: "31px",
              margin: "0 24px 16px 0",
              background: "rgba(255, 255, 255, 0.3)",
              fontSize: 30,
            }}
          >
            <Link to="/"> Crypto Redux </Link>
          </div>

          <div className="menu-items">
            <MainMenu mode={"horizontal"} />
          </div>

          <span className="menu-icons">
            <MenuOutlined
              style={{
                height: 50,
                fontSize: 30,
                position: "absolute",
                top: 15,
                right: 5,
              }}
              onClick={showDrawer}
            />
          </span>

          <Drawer
            title=""
            placement="right"
            closable={false}
            onClose={onClose}
            open={open}
          >
            <MainMenu mode={"inline"} />
          </Drawer>
        </div>
      </Row>
    </>
  );
};

export default Navbar;
