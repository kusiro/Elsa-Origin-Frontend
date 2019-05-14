import https from 'https';

import React, { Component } from 'react';
import showdown from 'showdown';
import axios from 'axios';
import { Value } from 'slate';
import './Edit.css';
import FontAwesome from 'react-fontawesome';
import swal from 'sweetalert2';
import '../../../../node_modules/sweetalert2/dist/sweetalert2.css';
import settings from '../../../settings.js';

import RichTextEditor from '../../../terry/components/Share/RichTextEditor';

class newsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      content: '',
      image_url: '',
    };
    this.newId = this.props.params.news_id;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // const newsId = this.props.params.news_id
    const token = localStorage.token;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    ins
      .get(`news/${this.newId}`)
      .then(res => {
        console.log(res);
        this.setState({
          ...res.data,
          content: Value.fromJSON(JSON.parse(res.data.content)),
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(id, event) {
    if (id === 'title') {
      this.setState({ title: event.target.value });
    } else if (id === 'description') {
      this.setState({ description: event.target.value });
    } else if (id === 'image_url') {
      this.setState({ image_url: event.target.value });
    }
  }

  checkForm(event) {
    let reqCol = '';
    if (!this.state.title) {
      reqCol += 'title ';
    }
    if (!this.state.description) {
      reqCol += 'description ';
    }
    if (reqCol) {
      reqCol += 'is required.';
      window.alert(reqCol);
    }
  }

  handleSubmit(event) {
    this.checkForm(event);
    const token = localStorage.token;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
      headers: {
        Authorization: 'JWT ' + token,
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    ins
      .put(`news/${this.newId}`, {
        ...this.state,
        content: JSON.stringify(this.state.content.toJSON()),
      })
      .then(res => {
        console.log(res);
        window.location.href = '/management/news';
      })
      .catch(error => {
        alert('請確認資料格式正確!');
        console.log(error);
      });
  }

  handleChangeFromParent = value => {
    this.setState({ content: value });
  };

  render() {
    return (
      <div className="lecture-new-bg">
        <div className="news-new-main">
          <div className="lecture-new-title">Edit a news</div>
          <div className="news-new-flex-box">
            <div className="news-new-form">
              <div className="input-label">title</div>
              <input
                className="content-new-input"
                type="text"
                value={this.state.title}
                onChange={e => this.handleChange('title', e)}
              />
              <div className="input-label">image url</div>
              <input
                className="content-new-input"
                type="text"
                value={this.state.image_url}
                onChange={e => this.handleChange('image_url', e)}
              />
              <div className="input-label">description</div>
              <div className="news-new-description">
                <textarea
                  className="news-new-description-textarea"
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  value={this.state.description}
                  onChange={e => this.handleChange('description', e)}
                />
              </div>
              {/* <div className="input-label">content ( can use HTML )</div>
                            <div className='news-new-content'>
                                <textarea className='news-new-content-textarea' name="" id="" cols="30" rows="5" value={this.state.content}onChange={(e) => this.handleChange('content', e)}>
                                </textarea>
                            </div> */}
              <div>
                <input
                  onClick={this.handleSubmit}
                  className="news-new-submit-btn"
                  type="submit"
                />
              </div>
            </div>
            <div className="news-new-preview">
              <div className="input-label">content</div>
              <div className="news-new-editor">
                <RichTextEditor
                  handleChangeFromParent={this.handleChangeFromParent}
                  content={this.state.content}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default newsEdit;
