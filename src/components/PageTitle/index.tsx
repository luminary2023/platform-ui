import React, {FC} from 'react'
import { PageTitleProps } from '@/services/interfaces';
import styles from './PageTitle.module.css'

const PageTitle: FC<PageTitleProps> = ({title, subtitle}) => {
  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  )
}

export default PageTitle