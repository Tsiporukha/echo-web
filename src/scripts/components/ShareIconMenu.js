import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'react-toolbox/lib/tooltip';
import {IconMenu, MenuItem} from 'react-toolbox/lib/menu';
import CopyToClipboard from 'react-copy-to-clipboard';

import styles from '../../assets/styles/shareIconMenu.css';

/* eslint-disable no-undef */
const shareOnFacebook = (path, title, picture, description) => () => FB.ui({
  method: 'share',
  href: `${document.domain}${path}`,
  title,
  picture,
  caption: document.domain,
  description,
}, _response => true);
/* eslint-enable no-undef */

const TooltipIconMenu = Tooltip(IconMenu);

const ShareButton = () => (
  <span className={styles.iconDescription}>
    <i className={styles.shareIcon}>share</i><span className={styles.shareLabel}>Share</span>
  </span>
);


// {path, title, picture, description}
const ShareIconMenu = props => (
  <TooltipIconMenu icon={<ShareButton />} iconRipple={false} theme={styles} tooltip='Share' tooltipDelay={500} >
    <MenuItem caption='Share via:' disabled theme={styles} />

    <CopyToClipboard text={`${document.domain}${props.path}`}>
      <MenuItem icon='link' caption='Link' theme={styles} />
    </CopyToClipboard>

    <MenuItem icon={<i className={styles.facebookIcon} />} caption='Facebook' theme={styles}
      onClick={shareOnFacebook(props.path, props.title, props.picture, props.description)} />
  </TooltipIconMenu>
);

ShareIconMenu.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  picture: PropTypes.string,
  path: PropTypes.string,
};

export default ShareIconMenu;
