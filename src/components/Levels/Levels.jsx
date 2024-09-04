import React from 'react'
import { Stepper } from 'react-form-stepper';

export default function Levels({quizLevel, levelNames}) {

  const levels = levelNames.map((e) => e.toUpperCase())

  return (
    <div className="levelsContainer" style={{background:'transparent'}}>  

          <Stepper
            steps={[{ label: `${levels[0]}` }, { label: `${levels[1]}` }, { label: `${levels[2]}` }]}
            activeStep={quizLevel}
            connectorStateColors={true}
          /> 
    </div>
  )
}
