import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { Select, Typography, Row, Col, Avatar, List } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import Loader from "./Loader";
import moment from "moment";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  const { data } = useGetCryptosQuery(100);

  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: 12,
  });

  if (!cryptoNews?.value) return <Loader />;

  const cryoNewsLists = cryptoNews?.value.map((news) => ({
    href: news.url,
    title: news.name,
    image: news?.image?.thumbnail?.contentUrl,
    avatar: news?.image?.thumbnail?.contentUrl,
    content: news.description,
    providerName: news.provider[0]?.name,
    providerImg: news.provider[0]?.image?.thumbnail?.contentUrl,
    date: moment(news.datePublished).startOf("ss").fromNow(),
  }));

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24} style={{ marginTop: "20px" }}>
          <Select
            showSearch
            className="select-news"
            placeholder="select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency, i) => (
              <Option value={currency.name} key={i}>
                {currency.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}

      <Col
        span={24}
        style={{
          backgroundColor: "#fff",
          marginBottom: "20px",
        }}
      >
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: () => {},
            pageSize: 10,
          }}
          dataSource={cryoNewsLists}
          renderItem={(item) => (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <div className="list-news">
                <div className="list-news-img">
                  <img width={150} src={item.image} alt="news" />
                </div>
                <div>
                  <Title level={2}>
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {item.title}
                    </a>
                  </Title>
                  <Text>{ HTMLReactParser(item.content)}</Text>
                  <div className="provider-container">
                    <div>
                      <Avatar src={item.providerImg}></Avatar>
                      <Text className="provider-name">{item.providerName}</Text>
                      <Text className="published-date">{item.date}</Text>
                    </div>
                  </div>
                </div>
              </div>
            </Row>
          )}
        />
      </Col>
    </Row>
  );
};

export default News;
