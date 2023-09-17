import React, { useState, useEffect } from "react";
import { useGetCryptosExchangesQuery } from "../services/cryptoExchangesApi";
import millify from "millify";
import Loader from "./Loader";
import { Row, Col, Typography, Collapse, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data: Lists, isFetching } = useGetCryptosExchangesQuery();

  const [exchanges, setExchanges] = useState();

  useEffect(() => {
    setExchanges(Lists);
  }, [Lists]);

  if (isFetching) return <Loader />;

  return (
    <>
      <div className="heading-container">
        <Typography.Title level={2} className="home-title">
          Exchanges Top 100 Lists
        </Typography.Title>
      </div>
      <Row>
        <Col span={6}>NAME</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Turst Score</Col>
        <Col span={6}>Website</Col>
      </Row>
      <Row className="exchanges-list">
        {exchanges?.map((exchange, index) => (
          <Col span={24} key={exchange.id}>
            <Collapse>
              <Panel
                pagination={{ pageSize: 20 }}
                key={index}
                showArrow={false}
                header={
                  <Row key={exchange.id + 1}>
                    <Col span={6}>
                      <Text>
                        <strong>{index + 1}. </strong>
                      </Text>
                      <Avatar className="exchange-image" src={exchange.image} />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>
                      ${millify(exchange.trade_volume_24h_btc)}
                    </Col>
                    <Col span={6} className="score">
                      {exchange.trust_score_rank}
                    </Col>
                    <Col span={6}>
                      <a href={exchange.url} target="_blank" rel="noreferrer">
                        {exchange.url}
                      </a>
                    </Col>
                  </Row>
                }
              >
                <Text>Country: {exchange.country}</Text> <br />
                <Text>
                  Established: {exchange.year_established || "-"}
                </Text>{" "}
                <br />
                {HTMLReactParser(exchange.description || "")}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
