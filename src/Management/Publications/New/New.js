import Dropzone from 'react-dropzone';
import FontAwesome from 'react-fontawesome';
import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';

import settings from '../../../settings';
import '../../../../node_modules/sweetalert2/dist/sweetalert2.css';

import './New.css';

class publicationNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      code_url: 'empty',
      arXiv_url: '',
      files: [],
    };
  }

  onDrop(file) {
    const { files } = this.state;
    if (files.length === 1) {
      swal('One file only', '', 'error');
      return;
    }
    const reader = new FileReader();
    const rea = this;
    reader.onload = () => {
      files.push({
        title: file[0].name,
        preview: file[0].preview,
        size: file[0].size,
        type: file[0].type,
        data: reader.result,
      });
      rea.setState({
        files,
      });
    };
    reader.readAsDataURL(file[0]);
  }

  handleChange = (id, event) => {
    if (id === 'title') {
      this.setState({ title: event.target.value });
    } else if (id === 'code_url') {
      this.setState({ code_url: event.target.value });
    } else if (id === 'arXiv_url') {
      this.setState({ arXiv_url: event.target.value });
    }
  };

  checkForm = () => {
    let reqCol = '';
    if (!this.state.title) {
      reqCol += 'title ';
    }
    if (reqCol) {
      reqCol += 'is required.';
      window.alert(reqCol);
    }
  };

  handleSubmit = event => {
    this.checkForm(event);
    const { token } = localStorage;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 10000,
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    ins
      .post('publications', this.state)
      .then(res => {
        console.log(res);
        window.location.href = '/management/publications';
      })
      .catch(error => {
        alert('請確認資料格式正確!');
        console.log(error);
      });
  };

  delFile(index) {
    const { files } = this.state;
    files.splice(index, 1);
    this.setState({
      files,
    });
  }

  renderFileInfo() {
    return this.state.files.map((f, index) => (
      <div key={index} className="lecture-new-file-block">
        <div className="lecture-new-file-icon-group">
          <FontAwesome
            className="lecture-new-file-delete-icon"
            name="times-circle-o"
            onClick={e => this.delFile(index, e)}
          />
          <FontAwesome
            className="lecture-new-file-icon"
            name="file-o"
            onClick={e => this.delFile(index, e)}
          />
        </div>
        <div className="lecture-new-file-info">{f.title}</div>
      </div>
    ));
  }

  render() {
    return (
      <div className="lecture-new-bg">
        <div className="lecture-new-main">
          <div className="lecture-new-title">New A Lecture</div>
          <div className="lecture-new-form">
            <div className="input-label">title</div>
            <input
              className="content-new-input"
              type="text"
              onChange={e => this.handleChange('title', e)}
            />
            {/* <div className="input-label">code_url</div>
                        <input className='content-new-input' type="text" onChange={(e) => this.handleChange('code_url', e)}/> */}
            <div className="input-label">arxiv_url</div>
            <input
              className="content-new-input"
              type="text"
              onChange={e => this.handleChange('arXiv_url', e)}
            />
            <div className="input-label">
              Upload one File: by dropping file into the block or clicking
              button
            </div>
            <div className="lecture-new-upload">
              <Dropzone
                className="lecture-new-upload-area-main"
                onDrop={this.onDrop.bind(this)}
              />
              <Dropzone
                className="lecture-new-upload-area-icon"
                onDrop={this.onDrop.bind(this)}
              />
              <div className="lecture-new-uploaded-files">
                {this.renderFileInfo()}
              </div>
            </div>
            <div>
              <input
                onClick={this.handleSubmit}
                className="lecture-new-submit-btn"
                type="submit"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default publicationNew;
