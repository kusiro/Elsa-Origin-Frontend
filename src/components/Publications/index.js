import https from 'https';

import MediaQuery from 'react-responsive';
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Col, Row } from 'antd';

// import BackgroundImage from '../static/background_image_invert_vertical.jpg';
import Drawer from '../Share/Drawer';
import Header from '../Share/Header';
import IconImg from '../static/icon.png';
import settings from '../../settings';
import {
  BackgroundColor,
  BigTitle,
  Hr,
  IconImage,
  LogoContent,
  MainRow,
  MedContent,
  PageLink,
  SmallContent,
  Text,
  TextCol,
  Title1,
  Title2,
  TitleText,
} from '../Share';
import { media, notebook } from '../size';

const Blocks = styled.div`
  padding-top: 15vh;
  width: 100%;
  height: 92vh;
  overflow-y: scroll;

  ${media.lessThan('notebook')`
    padding-top: 0;
    height: 100%;
  `};
`;

const BackgroundStyleColor = styled(BackgroundColor)`
  ${media.lessThan('notebook')`
    height: 60vh;
  `};
`;

const BackgroundStyleColor2 = styled(BackgroundColor)`
  ${media.lessThan('notebook')`
    height: 100%;
  `};
`;

const EachBlock = styled.div`
  width: 100%;
  height: 20vh;
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 5vh;
  color: white;
  font-size: 1.2vw;

  ${media.lessThan('notebook')`
    margin-bottom: 0;
    margin-top: 2vh;
  `};
`;

const TextArea = styled.div`
  padding-left: 2.5vw;
  padding-right: 4vw;
  padding-top: 4.5vh;

  ${media.lessThan('notebook')`
    padding-top: 3.5vh;
    padding-left: 4vw;
    font-size:4vw;
  `};
`;

const Title = styled.div`
  font-size: 2vw;
  padding-top: 1vh;

  ${media.lessThan('notebook')`
    font-size:5vw;
  `};
`;

const LinkArea = styled.div`
  width: 100%;
  height: 20vh;
`;

const LinkBlock = styled.div`
  width: 100%;
  height: 50%;
  background-color: ${props => props.color};
  display: flex;
`;

const TitleStyleText = styled(TitleText)`
  ${media.lessThan('notebook')`
    font-size: 10vw;
  `};
`;

const IconStyleImage = styled(IconImage)`
  ${media.lessThan('notebook')`
    width: 8vw;
  `};
`;

const LinkText = styled.a`
  margin: auto;
  color: white;

  :hover {
    color: white;
  }
`;

class Publications extends Component {
  state = {
    publications: [],
  };

  componentWillMount() {
    // const { token } = localStorage;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    ins
      .get('publications')
      .then(res => {
        console.log(res);
        this.setState({ publications: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // [
  //   {
  //     "id": 1,
  //     "title": "fdsfsd",
  //     "code_url": "sdaf",
  //     "arXiv_url": "sadf",
  //     "files": {
  //       "id": 1,
  //       "size": 3170,
  //       "type": "image/png",
  //       "url": "http://35.201.173.113:8080/static/fdsfsd/fdsfsd.png"
  //     }
  //   }
  // ]

  renderPublications = () =>
    this.state.publications.map(
      ({
        id: publicationId,
        title,
        // code_url: codeUrl,
        arXiv_url: arXivUrl,
        files,
      }) => (
        <EachBlock key={publicationId}>
          <Row type="flex">
            <Col span={20}>
              <TextArea>
                <Title>{title}</Title>
              </TextArea>
            </Col>
            <Col span={4}>
              <LinkArea>
                <LinkBlock color="rgba(0, 0, 0, 0.3)">
                  <LinkText href={arXivUrl}>arXiv</LinkText>
                </LinkBlock>
                <LinkBlock color="rgba(0, 0, 0, 0.4)">
                  <LinkText href={files.url}>PDF</LinkText>
                </LinkBlock>
              </LinkArea>
            </Col>
          </Row>
        </EachBlock>
      )
    );

  renderLogin = () => {
    const { token } = localStorage;
    if (token) {
      return (
        <PageLink to="/logout">
          <Text color="rgba(0, 0, 0, 0.4)">Sign out</Text>
        </PageLink>
      );
    }
    return (
      <PageLink to="/login">
        <Text color="rgba(0, 0, 0, 0.4)">Sign in</Text>
      </PageLink>
    );
  };

  renderOtherBlock = () => (
    <Row type="flex" justify="end">
      <Col span={14}>
        <TextCol>
          <PageLink to="/about">
            <Text color="rgba(0, 0, 0, 0.4)">About Elsa Lab</Text>
          </PageLink>
        </TextCol>
        <TextCol>{this.renderLogin()}</TextCol>
      </Col>
      <Col span={5}>
        <Drawer />
      </Col>
    </Row>
  );

  render() {
    return (
      <Row>
        <Col xs={{ span: 24 }} xl={{ span: 9 }}>
          <BackgroundStyleColor color="#aec3c2">
            <MainRow type="flex" justify="center">
              <LogoContent xs={{ span: 22 }} xl={{ span: 18 }}>
                <Row type="flex" justify="start" align="middle" gutter={8}>
                  <Col span={2.5}>
                    <IconStyleImage src={IconImg} />
                  </Col>
                  <Col span={3}>
                    <Title1>NTHU</Title1>
                    <Title2>ELSA</Title2>
                  </Col>
                  <Col xs={{ span: 14 }} xl={{ span: 0 }} offset={4}>
                    {this.renderOtherBlock()}
                  </Col>
                </Row>
              </LogoContent>
              <SmallContent xs={{ span: 22 }} xl={{ span: 18 }} color="#8c8c8c">
                <Row type="flex" justify="start" align="bottom">
                  <Col span={6}>
                    <Hr color="#8c8c8c" />
                  </Col>
                  <Col span={12} offset={1}>
                    Home
                  </Col>
                </Row>
              </SmallContent>
              <BigTitle xs={{ span: 22 }} xl={{ span: 18 }}>
                <TitleStyleText>Publications</TitleStyleText>
              </BigTitle>
              <MedContent span={12} color="#8c8c8c" />
              <Col span={6} />
            </MainRow>
          </BackgroundStyleColor>
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 15 }}>
          <BackgroundStyleColor2 color="white">
            <MediaQuery query={`(max-width: ${notebook})`}>
              {matches => (!matches ? <Header fontColor="#9b9b9b" /> : <></>)}
            </MediaQuery>
            <Blocks>{this.renderPublications()}</Blocks>
          </BackgroundStyleColor2>
        </Col>
      </Row>
    );
  }
}

export default Publications;
