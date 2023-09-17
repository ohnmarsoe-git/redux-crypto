import React from "react";
import millify from "millify";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Typography, Row, Col, Statistic, Card } from "antd";
import {
  BankOutlined,
  DollarOutlined,
  LineChartOutlined,
  SlidersOutlined,
} from "@ant-design/icons";

import Cryptocurrencies from "./Cryptocurrencies";
import Loader from "./Loader";

const { Title } = Typography;

const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>

      <Row gutter={24}>
        <Col xs={24} md={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Cryptocurrencies"
              value={globalStats.total}
              valueStyle={{
                color: "#3f8600",
              }}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Market Cap"
              value={`$${millify(globalStats.totalMarketCap)}`}
              precision={3}
              valueStyle={{
                color: "#cf1322",
              }}
              prefix={<LineChartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Markets"
              value={globalStats.totalMarkets}
              precision={2}
              valueStyle={{
                color: "#cf1322",
              }}
              prefix={<SlidersOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Exchanges"
              value={millify(globalStats.totalExchanges)}
              valueStyle={{
                color: "#3f8600",
              }}
              prefix={<BankOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <div className="heading-container">
            <Title level={2} className="home-title">
              Top 10 Cryptos In The World
            </Title>
          </div>
          <Cryptocurrencies simplified />
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
