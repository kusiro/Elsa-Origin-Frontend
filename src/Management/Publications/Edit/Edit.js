import Dropzone from 'react-dropzone';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import axios from 'axios';

import settings from '../../../settings';

import './Edit.css';

class publicationEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      code_url: 'empty',
      arXiv_url: '',
      files: '',
    };
  }

  componentWillMount() {
    const {
      params: { publication_id },
    } = this.props;
    const { token } = localStorage;
    const ins = axios.create({
      baseURL: settings.backend_url,
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    ins
      .get(`publications/${publication_id}`)
      .then(res => {
        console.log(res);
        this.setState(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  onDrop(file) {
    if (this.state.files) {
      alert('最多上傳一個檔案');
      return;
    }
    const files = [];
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

  handleSubmit = () => {
    const {
      params: { publication_id },
    } = this.props;
    const { token } = localStorage;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 10000,
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    ins
      .put(`publications/${publication_id}`, this.state)
      .then(res => {
        console.log(res);
        window.location.href = `/management/publications`;
      })
      .catch(error => {
        alert('請確認資料格式正確!');
        console.log(error);
      });
  };

  delFile() {
    const {
      params: { publication_id },
    } = this.props;
    // delete file from backend
    const { token } = localStorage;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    ins
      .delete(`publications/${publication_id}/file`)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
    // delete file from react state
    this.setState({
      files: '',
    });
  }

  renderFileInfo() {
    if (this.state.files) {
      return (
        <div className="lecture-new-file-block">
          <div className="lecture-new-file-icon-group">
            <FontAwesome
              className="lecture-new-file-delete-icon"
              name="times-circle-o"
              onClick={e => this.delFile(e)}
            />
            <FontAwesome className="lecture-new-file-icon" name="file-o" />
          </div>
          <div className="lecture-new-file-info">{this.state.title}</div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="lecture-new-bg">
        <div className="lecture-new-main">
          <div className="lecture-new-title">New A Lecture</div>
          <div className="lecture-new-form">
            <div className="input-label">title</div>
            <input
              value={this.state.title}
              className="content-new-input"
              type="text"
              onChange={e => this.handleChange('title', e)}
            />
            {/* <div className="input-label">code url</div>
                        <input value={this.state.code_url} className='content-new-input' type="text" onChange={(e) => this.handleChange('code_url', e)}/> */}
            <div className="input-label">arXiv url</div>
            <input
              value={this.state.arXiv_url}
              className="content-new-input"
              type="text"
              onChange={e => this.handleChange('arXiv_url', e)}
            />
            <div className="input-label">
              Upload File: by dropping file into the block or clicking button
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

publicationEdit.propTypes = {
  params: PropTypes.shape({
    publication_id: PropTypes.string.isRequired,
  }).isRequired,
};

export default publicationEdit;
