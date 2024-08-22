import React from 'react'

export default function ProgressBar({progressP, progressQ}) {
  
  return (
    <>
        <div className='percentage'>
            <div className="progressPercent">{progressQ}</div>
            <div className="progressPercent">Progression: {progressP}%</div>
        </div>

        <div className="progressBar">
            <div className="progressBarChange" style={{width:`${progressP}%`, transition:'all .3s, 300ms ease-in'}}></div>
        </div>
    </>
  )
}
