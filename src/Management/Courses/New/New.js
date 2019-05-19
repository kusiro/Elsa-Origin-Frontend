import React, { Component } from 'react';
import axios from 'axios';

import settings from '../../../settings';

import './New.css';

class courseNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };
  }

  handleChange = (id, event) => {
    if (id === 'title') {
      this.setState({ title: event.target.value });
    } else if (id === 'description') {
      this.setState({ description: event.target.value });
    }
  };

  handleSubmit = event => {
    this.checkForm(event);
    const { token } = localStorage;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    ins
      .post('courses', this.state)
      .then(res => {
        console.log(res);
        window.location.href = '/management/courses';
      })
      .catch(error => {
        alert('請確認資料格式正確!');
        console.log(error);
      });
  };

  checkForm = () => {
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
  };

  render() {
    return (
      <div className="course-new-bg">
        <div className="course-new-main">
          <div className="course-new-title">New A Course</div>
          <div className="course-new-form">
            <div className="input-label">title</div>
            <input
              className="form-input"
              type="text"
              onChange={e => this.handleChange('title', e)}
            />
            <div className="input-label">description</div>
            <textarea
              className="input-textarea"
              name=""
              id=""
              cols="30"
              rows="10"
              onChange={e => this.handleChange('description', e)}
            />
            <input
              className="course-new-submit-btn"
              type="submit"
              onClick={this.handleSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default courseNew;
