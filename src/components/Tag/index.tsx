import React, {FC} from 'react'
import styles from './tag.module.css'
import EastIcon from "@mui/icons-material/East";


interface TagProps {
  text?: string
  type?: string
}

const Tag: FC<TagProps> = ({text, type}) => {
  return (
    <div 
      className={`${type === 'link' ? styles.MoreDetailsContainer : styles.TagContainer}`}
    >
      <p>{type === 'link' ? 'More Details' : text}</p>
      {type === 'link' && <EastIcon style={{ marginLeft: 9, fontSize: 14 }} />}
    </div>
  )
}

export default Tag