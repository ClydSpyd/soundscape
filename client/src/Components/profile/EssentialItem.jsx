import React, { useEffect, useState } from 'react';
import { getLinkPreview, getPreviewFromContent } from 'link-preview-js';
import styles from './EssentialItem.module.scss';

const EssentialItem = ({ itemUrl, artist, title, setShowVideo }) => {

  const [ linkData, setLinkData ] = useState(null)
  const [inlineStyle, setInlineStyle ] = useState({  
    backgroundImage: "url(https://soundscapeuseravatars.s3.eu-west-1.amazonaws.com/soundscape-white_multi_colour_noBorder.png)",
    backgroundPosition: 'top center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  })

  const getData = async () => {
      setLinkData(await getLinkPreview("https://damp-chamber-60877.herokuapp.com/"+itemUrl))
  }

  useEffect(()=>{ getData() },[])

  useEffect(()=>{
    if(linkData && linkData.images && linkData.images[0]){
      setInlineStyle({  ...inlineStyle,
        backgroundImage: "url(" + linkData.images[0] + ")",
        backgroundSize: 'cover'
      })
    }
  },[linkData])


  return (
    <div className={styles.essentialItem} style={inlineStyle} onClick={()=>setShowVideo(true, itemUrl)}>
      <h3>{artist}</h3>
      <h5>{title}</h5>
      <div className={styles.play}><i class="far fa-play-circle"></i></div>

    </div>
  )

}

export default EssentialItem;