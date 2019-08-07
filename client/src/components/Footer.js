import React from 'react'

const Footer = () => {
  const style = {
    position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%',
            backgroundColor: 'white',
            color: 'blue',
            textAlign: 'right',
            zIndex: 2000,
            paddingRight: '2vw',
            paddingLeft: '2vw'
  }

  return (
    <div className="footer" style={style}>
    <a href={'https://newsapi.org/'} target="_blank" >powered by NewsAPI.org</a>
    </div>
  )
}

export default Footer;