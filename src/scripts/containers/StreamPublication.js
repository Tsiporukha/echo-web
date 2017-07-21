import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Button, IconButton} from 'react-toolbox/lib/button';

import styles from '../../assets/styles/streamPublication.css';


const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = dispatch => ({

});


class StreamPublication extends Component {

  render() {
    return(
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.leftReg}>
            <span className={styles.title}>Save To New Room</span>
          </div>
          <div className={styles.rightReg}>
            <div className={styles.buttons}>
              <Button theme={styles} icon='save' label='Save' raised />
              <Button theme={styles} label='Cancel' flat onClick={this.props.onCancel} />
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamPublication);
