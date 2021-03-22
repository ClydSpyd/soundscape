import React from 'react';
import { connect } from 'react-redux';
import styles from './ModalOverlay.module.scss';



class ModalOverlay extends React.Component {

  componentDidMount(){
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no";
  }
  
  componentWillUnmount(){
    document.documentElement.style.overflow = 'scroll';
    document.body.scroll = "yes";
  }

  render(){

  const modalOverlay = this.props.modalOverlay
  const { component, vis} = modalOverlay

    return (
      <div className={`${styles.modalOverlay} ${!vis && styles.hidden}`}>
       {component && React.cloneElement(component,{ closeModal: this.props.closeModal })}
      </div>
    )
  }

}

function mapStateToProps(state) {
  const modalOverlay = state.modalContent;
  return {modalOverlay};
}

export default connect(mapStateToProps)(ModalOverlay)



