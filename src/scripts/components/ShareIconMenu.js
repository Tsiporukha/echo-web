import React, {Component} from 'react';

import {IconMenu, MenuItem, Tooltip} from 'react-toolbox';
import CopyToClipboard from 'react-copy-to-clipboard';

import styles from '../../assets/styles/shareIconMenu.css';

const shareOnFacebook = (path, title, picture, description) => () => FB.ui({
  method: 'share',
  href: `${document.domain}${path}`,
  title,
  picture,
  caption: document.domain,
  description,
}, response => true);


const TooltipIconMenu = Tooltip(IconMenu);

const ShareButton = () => (
  <span className={styles.iconDescription}>
    <i className={styles.shareIcon}>share</i><span className={styles.shareLabel}>Share</span>
  </span>
)


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

export default ShareIconMenu;
