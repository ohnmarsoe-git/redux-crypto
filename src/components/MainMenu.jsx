import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
} from "@ant-design/icons";

const MainMenu = ({ mode }) => {
  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/cryptocurrencies">Cryptocurrencies</Link>,
      key: "crypto",
      icon: <FundOutlined />,
    },
    {
      label: <Link to="/exchanges">Exchanges</Link>,
      key: "exchange",
      icon: <MoneyCollectOutlined />,
    },

    {
      label: <Link to="/news">News</Link>,
      key: "news",
      icon: <BulbOutlined />,
    },
  ];

  return (
    <>
      <Menu
        mode={mode}
        defaultSelectedKeys={["2"]}
        overflowedIndicator=""
        items={items}
      ></Menu>
    </>
  );
};

export default MainMenu;
