import React from "react";
import { Space, Table, Typography, Input } from "antd";
import millify from "millify";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
const { Search } = Input;

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;

  const flag = simplified ? false : true;

  const { data: cryptosList, isfetching } = useGetCryptosQuery(count);

  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filterData = cryptosList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filterData);
  }, [cryptosList, searchTerm]);

  if (isfetching) return <Loader />;

  const columns = [
    {
      title: "#",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link to={`/crypto/${record.uuid}`}>
          <img src={record.iconUrl} width="20px" height="20px" alt="icon" />
          {text} <span className="symbol">({record.symbol}) </span>
        </Link>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span>
          $
          {new Intl.NumberFormat("en-IN", {
            maximumSignificantDigits: 5,
          }).format(price)}
        </span>
      ),
    },
    {
      title: "Market Cap",
      dataIndex: "marketCap",
      key: "marketCap",
      render: (marketCap) => <span>${millify(marketCap)}</span>,
    },
    {
      title: "Volume(24h)",
      dataIndex: "24hVolume",
      key: "24hVolume",
      render: (Volume) => <span>${Volume}</span>,
    },
    {
      title: "Daily Change",
      dataIndex: "change",
      key: "change",
      render: (change) => <span>${change} %</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Link to={`/crypto/${record.uuid}`}>Details</Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {!simplified && (
        <>
          <div className="heading-container">
            <Typography.Title level={2} className="home-title">
              Cryptocurrencies Lists
            </Typography.Title>
          </div>
          <Search
            placeholder="input search text"
            enterButton
            size="large"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </>
      )}

      <Table
        columns={columns}
        rowKey="name"
        dataSource={cryptos}
        pagination={(flag, { pageSize: 20 })}
        size="middle"
        scroll={{
          x: 1300,
        }}
      />
    </div>
  );
};

export default Cryptocurrencies;
