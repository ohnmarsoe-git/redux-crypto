import React from "react";
import { Link } from "react-router-dom";
import { Space } from "antd";

const FooterNav = () => {
  return (
    <div className="footer">
      <div className="copyright">Copyright © 2022! All Rights Reserved.</div>
      <Space>
        <Link to="/">Home</Link>
        <Link to="/exchanges">Exchanges</Link>
        <Link to="/news">News</Link>
      </Space>
    </div>
  );
};

export default FooterNav;
