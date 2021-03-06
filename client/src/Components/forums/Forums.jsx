import React, { useEffect } from 'react';
import BrowseForums from './BrowseForums';
import { useParams, useRouteMatch } from 'react-router-dom';
import ForumsCategory from './ForumsCategory'

import styles from './Forums.module.scss';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import store from '../../store';
import { fetchAllPosts } from '../../actions/postActions';
import LoaderDiv from '../layout/loaderDiv';

const Forums = ({ toggleModalOverlay }) => {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();
  const posts = useSelector(state => state.post.posts)

  const params = useParams()

  useEffect(()=>{ if(!posts) store.dispatch( fetchAllPosts() ) },[])

  return (
    <div className={`${styles.forumsContainer}`}>

      {
        !posts ?
          <div className={styles.loader}>
            <LoaderDiv /> 
          </div>

        :
          <Switch>

          <Route path={`${path}/:category`} component={()=> ( 
              <ForumsCategory 
                toggleModalOverlay={toggleModalOverlay}
                category={params.category} 
                posts={posts}/> 
            )}/> 
            <Route exact path={path} component={()=> (
              <BrowseForums posts={posts}/> 
            )}/> 

            
          </Switch>
      }
      
    </div>
  )

}

export default Forums;