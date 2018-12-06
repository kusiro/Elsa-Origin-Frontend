import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import { Link } from 'react-router';

import BackgroundImage from '../../static/background_image_invert_vertical.jpg';
import Header from '../../Share/Header';
import IconImg from '../../static/icon.png';
import {
  BackgroundColor,
  BigTitle,
  Hr,
  IconImage,
  LogoContent,
  MainRow,
  MedContent,
  SmallContent,
  Title1,
  Title2,
  TitleText,
} from '../../Share';

const Blocks = styled.div`
  padding-top: 20vh;
`;

const EachBlock = styled.div`
  width: 80%;
  height: 20vh;
  background-color: rgba(0, 0, 0, 0.3);
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5vh;
  color: white;
  font-size: 1.5vw;
`;

const Date = styled.span`
  font-size: 0.8vw;
  padding-left: 0.25vw;
`;

const Title = styled.div`
  font-size: 2vw;
  line-height: 120%;
`;

const TextArea = styled.div`
  padding-left: 2.5vw;
  padding-right: 4vw;
  padding-top: 3vh;
`;

const ImageArea = styled.div`
  width: 100%;
  height: 20vh;
  background: url(${props => props.image});
  background-size: cover;
  background-position: center center;
`;

const MidText = styled.div`
  font-size: 80%;
  font-style: italic;
  margin-top: 3vh;
`;

const CourseContent = {
  Hardware_Design_And_Lab: {
    year: '2018 Fall',
    name: 'Hardware Design and lab',
    pdfs: [
      {
        name: 'Course Syllabus',
        link: '/course/Hardware_Design_And_Lab/syllabus',
      },
      {
        name: 'Verilog-Introduction-and-FPGA-Implementation',
        link: '/course/Hardware_Design_And_Lab/lecture_1',
      },
      {
        name: 'Verilog-Data-Flow-and-Data-Types',
        link: '/course/Hardware_Design_And_Lab/lecture_2',
      },
    ],
  },
  Hardware_Design_And_Lab_2: {
    year: '2018 Fall',
    name: 'Hardware Design and lab 2',
    pdfs: [
      {
        name: 'NOTHING',
        link: '/course/Hardware_Design_And_Lab_2',
      },
    ],
  },
};

const Course = ({ courseName }) => (
  <Row>
    <Col span={9}>
      <BackgroundColor color="#f8d188">
        <MainRow type="flex" justify="center">
          <LogoContent span={18}>
            <Row type="flex" justify="start" align="middle" gutter={8}>
              <Col>
                <IconImage src={IconImg} />
              </Col>
              <Col>
                <Title1>NTHU</Title1>
                <Title2>ELSA</Title2>
              </Col>
            </Row>
          </LogoContent>
          <SmallContent span={18} color="#8c8c8c">
            <Row type="flex" justify="start" align="bottom">
              <Col span={6}>
                <Hr color="#8c8c8c" />
              </Col>
              <Col span={12} offset={1}>
                Home / Courses
              </Col>
            </Row>
          </SmallContent>
          <BigTitle span={18}>
            <TitleText>{CourseContent[courseName].year}</TitleText>
            <MidText>{CourseContent[courseName].name}</MidText>
          </BigTitle>
          <MedContent span={12} color="#8c8c8c" />
          <Col span={6} />
        </MainRow>
      </BackgroundColor>
    </Col>
    <Col span={15}>
      <BackgroundColor color="white">
        <Header fontColor="#9b9b9b" />
        <Blocks>
          {CourseContent[courseName].pdfs.map(({ name, link }, index) => (
            <Link key={name} to={link}>
              <EachBlock>
                <Row>
                  <Col span={8}>
                    <ImageArea image={BackgroundImage} />
                  </Col>
                  <Col span={16}>
                    <TextArea>
                      <div>
                        material #{index + 1} <Date>2019/02/17</Date>
                      </div>
                      <Title>{name}</Title>
                    </TextArea>
                  </Col>
                </Row>
              </EachBlock>
            </Link>
          ))}
        </Blocks>
      </BackgroundColor>
    </Col>
  </Row>
);

Course.propTypes = {
  courseName: PropTypes.string.isRequired,
};

export default Course;
