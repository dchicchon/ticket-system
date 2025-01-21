import { Link as RouterLink } from 'react-router';
import { Link as MuiLink } from '@mui/material';

import styles from './Link.module.css';

export default function Link(props) {
  return (
    <MuiLink
      className={styles.link}
      color={props.color || 'primary'}
      component={RouterLink}
      to={props.to}
    >
      {props.children}
    </MuiLink>
  );
}
