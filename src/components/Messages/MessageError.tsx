import React, { ReactNode } from 'react'
import styles from './MessageError.module.css';

type Props = {
    children: ReactNode;
}

export const MessageError = ({children}: Props) => {

  return (
    <div className={styles.alert}>{children}</div>
  )

}
