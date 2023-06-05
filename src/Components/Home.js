import React from 'react'  

import Styles  from  '../Styles/Home.module.css'

export default function Header() {
    return (
      <>
        <div className={Styles.container}>
          <div className={Styles.text}>
            Seeing the weather of the whole world with <span className={Styles.wisconsin}>WISCONSIN!</span>
          </div>
        </div>
      </>
    )
  }
  

