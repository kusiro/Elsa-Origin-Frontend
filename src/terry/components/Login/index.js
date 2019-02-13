import MediaQuery from 'react-responsive';
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button, Col, Input, Row } from 'antd';

import Header from '../Share/Header';
import IconImg from '../static/icon.png';
import settings from '../../../settings';
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

const TeachBlock = styled.div`
  width: 100%;
  float: right;
  margin-top: 20vh;
  padding-left: 5vw;

  ${media.lessThan('notebook')`
    margin-top: 3vh;
  `};
`;

const BackgroundStyleColor = styled(BackgroundColor)`
  ${media.lessThan('notebook')`
    height: 45vh;
  `};
`;

const BackgroundStyleColor2 = styled(BackgroundColor)`
  ${media.lessThan('notebook')`
    height: 55vh;
  `};
`;

const IconStyleImage = styled(IconImage)`
  ${media.lessThan('notebook')`
    width: 8vw;
  `};
`;

const UserInput = styled(Input)`
  background-color: #cfcfcf;
  width: 100%;
  height: 4vh;
  box-shadow: 0 0 0 100px white inset;
  -webkit-box-shadow: 0 0 0 100px white inset;
`;

const InputText = styled.div`
  font-weight: bold;
  color: white;
  margin-top: 1vh;
  margin-bottom: 1vh;
`;

const TitleStyleText = styled(TitleText)`
  ${media.lessThan('notebook')`
    font-size: 10vw;
  `};
`;

const SubmitButton = styled(Button)`
  float: right;
  margin-top: 2vh;
`;

class Login extends Component {
  state = {
    account: '',
    password: '',
    message: '',
  };

  renderMessage = () => {
    if (this.state.message) {
      return <div className="message">{this.state.message}</div>;
    }
  };

  handleChange = (id, event) => {
    if (id === 'account') {
      this.setState({ account: event.target.value });
    } else if (id === 'password') {
      this.setState({ password: event.target.value });
    }
  };

  handleSubmit = event => {
    const reactIns = this;
    axios
      .post(`${settings.backend_url}/api-token-auth/`, {
        username: this.state.account,
        password: this.state.password,
      })
      .then(response => {
        console.log(response);
        const userId = response.data.user.id;
        localStorage.token = response.data.token;
        localStorage.user_id = userId;
        // redirect to user page
        if (
          settings.root_user_types.includes(
            response.data.user.profile.studentType
          )
        ) {
          window.location = `${settings.root_url}/management/users`;
        } else {
          // const url = new URL(window.location.href);
          // const redirectUrl = url.searchParams.get('redirect_url');
          // if (redirectUrl) {
          //   window.location = redirectUrl;
          // } else {
          //   window.location = '/';
          // }
          // FIXME: 要加 Account
          window.location = `${settings.root_url}/account`;
        }
      })
      .catch(error => {
        console.log(error.response);
        // handle login error
        if (error) {
          // set error message or fade out after 2s.
          reactIns.setState({ message: 'Account or Password error.' }, () =>
            setTimeout(() => reactIns.setState({ message: '' }), 2000)
          );
        }
      });
    event.preventDefault();
  };

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
    <Row>
      <TextCol span={24}>
        <PageLink to="/about">
          <Text color="rgba(0, 0, 0, 0.4)">About Elsa Lab</Text>
        </PageLink>
      </TextCol>
      <TextCol span={24}>{this.renderLogin()}</TextCol>
    </Row>
  );

  render() {
    return (
      <Row>
        <Col xs={{ span: 24 }} xl={{ span: 9 }}>
          <BackgroundStyleColor color="#aac2ff">
            <MainRow type="flex" justify="center">
              <LogoContent xs={{ span: 22 }} xl={{ span: 18 }}>
                <Row type="flex" justify="start" align="middle" gutter={8}>
                  <Col>
                    <IconStyleImage src={IconImg} />
                  </Col>
                  <Col>
                    <Title1>NTHU</Title1>
                    <Title2>ELSA</Title2>
                  </Col>
                  <Col xs={{ span: 8 }} xl={{ span: 0 }} offset={10}>
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
                <TitleStyleText>Sign In</TitleStyleText>
              </BigTitle>
              <MedContent xs={{ span: 22 }} xl={{ span: 12 }} color="#8c8c8c">
                Sign in to get more informations
              </MedContent>
              <Col span={6} />
            </MainRow>
          </BackgroundStyleColor>
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 15 }}>
          <BackgroundStyleColor2 color="#6e7794">
            <MediaQuery query={`(max-width: ${notebook})`}>
              {matches => (!matches ? <Header fontColor="white" /> : <></>)}
            </MediaQuery>
            <TeachBlock>
              <Row type="flex" justify="start" align="top">
                <Col xs={{ span: 18, offset: 2 }} xl={{ span: 10 }}>
                  {this.renderMessage()}
                  <InputText>Account</InputText>
                  <UserInput
                    size="large"
                    type="text"
                    value={this.state.account}
                    onChange={e => this.handleChange('account', e)}
                  />
                  <InputText>Password</InputText>
                  <UserInput
                    size="large"
                    type="password"
                    value={this.state.password}
                    onChange={e => this.handleChange('password', e)}
                  />
                  <SubmitButton onClick={e => this.handleSubmit(e)} href="#">
                    Submit
                  </SubmitButton>
                </Col>
              </Row>
            </TeachBlock>
          </BackgroundStyleColor2>
        </Col>
      </Row>
    );
  }
}

export default Login;
