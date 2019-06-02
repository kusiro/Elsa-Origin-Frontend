import PropTypes from 'prop-types';
import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import '../../../../../../node_modules/sweetalert2/dist/sweetalert2.css';

import settings from '../../../../../settings';
import './Show.css';

class lectureShow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const {
      params: { course_id, content_id, lecture_id },
    } = this.props;
    const { token } = localStorage;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    ins
      .get(`courses/${course_id}/contents/${content_id}/lectures/${lecture_id}`)
      .then(res => {
        console.log(res);
        this.setState(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteLecture() {
    const {
      params: { course_id, content_id, lecture_id },
    } = this.props;
    // sweet alert
    swal({
      title: 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(() => {
      const { token } = localStorage;
      const ins = axios.create({
        baseURL: settings.backend_url,
        timeout: 1000,
        headers: {
          Authorization: `JWT ${token}`,
        },
      });

      ins
        .delete(
          `courses/${course_id}/contents/${content_id}/lectures/${lecture_id}`
        )
        .then(res => {
          console.log(res);
          swal({
            title: 'Deleted!',
            text: 'Your lecture has been deleted.',
            type: 'success',
          }).then(() => {
            window.location.href = `/management/courses/${course_id}/contents/${content_id}`;
          });
        })
        .catch(error => {
          console.log(error);
          swal('Deleted Fail', 'Your lecture has not been deleted.', 'error');
        });
    });
  }

  renderFile() {
    if (this.state.files) {
      return this.state.files.map(item => (
        <li key={item.id}>
          <a href={item.url}>{item.title}</a>
        </li>
      ));
    }
  }

  render() {
    const {
      params: { lecture_id },
    } = this.props;
    return (
      <div className="lecture-show-bg">
        <div className="lecture-show-main">
          <div className="lecture-show-title">
            <div className="lecture-show-title-main">
              Lecture {this.state.lecture_number} - {this.state.title}
            </div>
            <div className="lecture-show-btn-group">
              <a
                href="/#"
                onClick={e => this.deleteLecture(e)}
                className="content-show-delete-btn"
              >
                delete
              </a>
              <a
                href={`./${lecture_id}/edit`}
                className="content-show-edit-btn"
              >
                edit
              </a>
            </div>
          </div>
          <div className="lecture-show-main-info">
            <pre>{this.state.description}</pre>
            <div className="files">{this.renderFile()}</div>
          </div>
        </div>
      </div>
    );
  }
}

lectureShow.propTypes = {
  params: PropTypes.shape({
    course_id: PropTypes.string.isRequired,
    content_id: PropTypes.string.isRequired,
    lecture_id: PropTypes.string.isRequired,
  }).isRequired,
};

export default lectureShow;
