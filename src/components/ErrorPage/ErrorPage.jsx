import React from 'react'
import batError from '../../images/batman.png'

export default function ErrorPage() {

  const colorH1 = {
    color:'#333030',
    letterSpacing:'10px'
  }

  const centerH2 = {
    textAlign:'center',
    marginTop:'50px',
  }

  const imgCenter = {
    display:'block',
    margin:'40px auto'
  }

  return (
    <div className='quiz-bg'>
      <div className="container">
        <h1 style={colorH1}>Error 404</h1>
        <h2 style={centerH2}>Opus, cette page n'existe pas !</h2>
        <img style={imgCenter} src={batError} alt="batman" />
      </div>
    </div>
  )
}
