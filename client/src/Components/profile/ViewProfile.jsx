import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllPosts } from '../../actions/postActions';
import { dummyProjects } from '../../dummy_data/projects';
import titleCase from '../../helpers/titleCase';
import store from '../../store';
import DiscoveryItem from '../dashboard/DiscoveryItem';
import PostRowCompact from '../posts/PostRowCompact';
import EssentialItem from './EssentialItem'
import styles from './ViewProfile.module.scss';

const ViewProfile = ({ displayProfile:{ status, location, genres, projects, bio, facebook, instagram, youtube, spotify, soundcloud, twitter, essentialListening, user: {name, avatar } }, isMe, setShowVideo, userId, toggleModalOverlay }) => {

  const firstName = name.split(' ')[0];
  const hasSocial = facebook || instagram || youtube || spotify || soundcloud || twitter;
  const statePosts = useSelector(state => state.post.posts)
  const  [userPosts, setUserPosts ] = useState(null)
  useEffect(()=>{ if(!statePosts) store.dispatch( fetchAllPosts() ) },[])
  useEffect(()=>{ setUserPosts(statePosts.filter(post => post.user._id === userId )) },[statePosts])

 
  
  const essentialItems = [
    {
      artist:"Primus",
      title:"Tommy The Cat",
      itemUrl:"https://youtu.be/r4OhIU-PmB8"
    },
    {
      artist:"Queens of the Stone Age",
      title:"Noone Knows",
      itemUrl:"https://youtu.be/s88r_q7oufE"
    },
    {
      artist:"Foo Fighters",
      title:"Everlong",
      itemUrl:"https://www.youtube.com/watch?v=eBG7P-K-r1Y&ab_channel=foofightersVEVO"
    },
    // {
    //   artist:"Primus",
    //   title:"Tommy The Cat",
    //   itemUrl:"https://www.dailymotion.com/video/x1h0pwb"
    // },
  ]

  return (
    <div className={`${styles.viewProfile}`}>

      <div className={styles.top}>
        <div className={styles.content}>
          <img src={avatar} alt="avatar"/>
          <div className={styles.details}>
            <h1>{name}</h1>
            <h4>{status} {location && `, ${location}`}</h4>
          </div>

          <div className={styles.buttons}>
            {
              isMe ? 
                <Link to={"/profile/edit"} className={"btn-blue_hollow"} style={{width:"140px"}} ><i class="fas fa-user-edit"></i>{" "} Edit profile</Link>

              :

              <>
              <div className={"btn-blue sml"}> <i class="fas fa-comment-alt"></i> Message</div>
                <div className={"btn-blue sml"}><i class="fas fa-user-plus"></i>Follow</div>
              </>
            }
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.thinColumn}>
          <div className={styles.genres}>
            <h5 className={styles.heading}>{firstName}'s genres</h5>
            {
                !genres.length||genres[0]==="" ? <p style={{fontSize:'13px', margin:"0 auto", width:"100%", textAlign:"center"}}>No genres added</p>

              :

                genres.map((genre, idx) => {
                  return genre !== "" &&  <p key={idx}> <i class="fas fa-headphones"></i> {" "} { titleCase(genre) }</p>
                })

            }
          </div>

          <div className={styles.social}>
            <h5 className={styles.heading}>More {firstName} online</h5>
            <div className={styles.items}>
              {
                !hasSocial ?
                  <p style={{fontSize:'13px', margin:"0 auto", width:"100%", textAlign:"center"}}>No links shared</p>
                  :
                  <>
                    { facebook && <a href={'http://'+facebook}><i class="fab fa-facebook"></i></a>}
                    { instagram && <a href={'http://www.instagram.com/'+instagram}><i class="fab fa-instagram"></i></a>}
                    { youtube && <a href={'http://'+youtube}><i class="fab fa-youtube"></i></a>}
                    { spotify && <a href={'http://'+spotify}><i class="fab fa-spotify"></i></a>}
                    { soundcloud && <a href={'http://www.soundcloud.com/'+soundcloud}><i class="fab fa-soundcloud"></i></a>}
                    { twitter && <a href={'http://'+twitter}><i class="fab fa-twitter"></i></a>}
                  </>
              }
            </div>

          </div>

          <div className={styles.groups}>
            <h5 className={styles.heading}>{firstName}'s groups</h5>
              <Link to="/groups/uke-underground"><i class="fas fa-users"></i>{" "}Ukelele Underground</Link>
              <Link  to="/groups/prog-guitarrists"><i class="fas fa-users"></i>{" "}Prog Guitarists</Link>
              <Link  to="/groups/ultimate-shred"><i class="fas fa-users"></i>{" "}Ultimate Shredderz</Link>
              <Link  to="/groups/tamborine-guild"><i class="fas fa-users"></i>{" "}The Tamborine Guild</Link>
          </div>
        </div>

        <div className={styles.mainArea}>

          <div className={styles.bio}>
            <h5 className={styles.heading}>About {firstName}</h5>
            <p>{bio}</p>
          </div>

          <div className={styles.essential}>
            <h5 className={styles.heading}>{firstName}'s essential listening</h5>

            <div className={styles.items}>
              {
                essentialItems.map((item, idx) => {
                  return <EssentialItem
                    toggleModalOverlay={toggleModalOverlay}
                    setShowVideo={setShowVideo}
                    artist={item.artist}
                    title={item.title}
                    itemUrl={item.itemUrl} />
                })
              }
            </div>


          </div>
          <div className={styles.projects}>
            <h5 className={styles.heading}>{firstName}'s projects</h5>

            <div className={styles.items}>
            {
              dummyProjects.map((item, idx) => idx<3 && <DiscoveryItem item={item} key={idx}/>)
            }
            </div>
          </div>

          <div className={styles.recentPosts}>
            <h5 className={styles.heading}>Recent posts by {firstName}</h5>

            {
              userPosts && userPosts.map((post, idx) => <PostRowCompact key={idx} post={post} />)
            }

          </div>
        </div>

      </div>


    </div>
  )

}

export default ViewProfile;