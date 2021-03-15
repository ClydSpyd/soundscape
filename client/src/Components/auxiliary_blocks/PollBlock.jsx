import React, { useState } from 'react';

import styles from './PollBlock.module.scss';

const PollBlock = ({ pollData: { question, options, submittedBy }}) => {

  const [ selected, setSelected ] = useState(null)
  let totalVotes = 0;
  options.forEach(item => totalVotes += item.votes)

  const calculatePercent = (number) => {
    return number / totalVotes * 100
  }

  return (
    <div className={styles.pollBlock}>
      <>
        <h4 className={"blockHeading"}>Poll of the week</h4>
        <h6>{question}</h6>
        {
          options.map((option, idx) => {

            return <div key={idx} className={styles.pollRow}>
                    <p>{option.answer}</p>
                    <div className={styles.barContainer}>
                      <div className={styles.barInner} style={{ width: `${calculatePercent(option.votes)}%` }} />
                    </div>
                    <label>
                      <input onClick={(e)=> setSelected(e.target.value)} value={idx} type="radio" name="pollOption" />
                      {
                        selected&&parseInt(selected) === idx ? 
                          <i class="fas fa-check-square" />
                        :
                          <i class="far fa-square" />
                      }
                    </label>
                  </div>
          })
        }
        <p className={styles.submittedBy}>Submitted by {submittedBy}</p>

      </>
    </div>
  )

}

export default PollBlock;