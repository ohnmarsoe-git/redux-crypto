import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { HomePage, Navbar, Cryptocurrencies, CryptoDetails, Exchanges, News, FooterNav } from './components'
import "./App.css";

const {Header, Footer, Content } = Layout;

function App() {
  return (
    <div className="app">
      <Layout>
      <Header style={{backgroundColor: '#fff' }}>
        <Navbar/>
      </Header>
      <Content>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/exchanges" element={<Exchanges />} />
          <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />} />
          <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
          <Route exact path="/news" element={<News />} />
        </Routes>
      </Content>
      <Footer style={{backgroundColor: '#001529' }}>
        <FooterNav/>
      </Footer>
    </Layout>
    </div>
  );
}

export default App;
