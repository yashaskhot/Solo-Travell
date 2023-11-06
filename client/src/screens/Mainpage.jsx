import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import Loc from '../components/loc';
import locData from '../components/locdata';

import './Mainpage.css';
import Article from './Article';

function Mainpage() {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    let del = 3;
    let i = 1;

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      ease: 'expo.out',
    });

    gsap.set(['#hero-1 h2, #hero-1 h1, #hero-1 h3'], {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    });

    gsap.set(
      [
        `#hero-2 h2, #hero-3 h2, #hero-4 h2, #hero-5 h2,
         #hero-2 h1, #hero-3 h1, #hero-4 h1, #hero-5 h1,
         #hero-2 h3, #hero-3 h3, #hero-4 h3, #hero-5 h3`,
      ],
      {
        clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
      }
    );

    while (i < 5) {
      tl.to(`#hero-${i} h2`, 0.9, {
        clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
        delay: del,
      })
        .to(
          `#hero-${i} h1`,
          0.9,
          {
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
          },
          '-=0.3'
        )
        .to(
          `#hero-${i} h3`,
          0.9,
          {
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
          },
          '-=0.3'
        )
        .to(
          `#hero-${i} .hi-${i}`,
          0.7,
          {
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
          },
          '-=1'
        )
        .to(`#hero-${i + 1} h2`, 0.9, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        })
        .to(
          `#hero-${i + 1} h1`,
          0.9,
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          },
          '-=0.3'
        )
        .to(
          `#hero-${i + 1} h3`,
          0.9,
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          },
          '-=0.3'
        );

      i++;
    }
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    console.log('button-clicked');
  };

  return (
    <div className="page-wrap">
      <header className="page-header">
        {/* <nav>
          <h1>WanderHub</h1>
          <ul>
            <li>About Us</li>
            <li>Contact Us</li>
            <li id="burger" onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </li>
          </ul>
        </nav> */}
        <main>
          <Article
            id="hero-1"
            i={5}
            title1="Travel the"
            title2="World"
            title3="Pragser Wildsee, Italy"
            imageClass="hi-1"
          />
          <Article
            id="hero-2"
            i={4}
            title1="Savour the"
            title2="Journey"
            title3="Marignier, France"
            imageClass="hi-2"
          />
          <Article
            id="hero-3"
            i={3}
            title1="Expand Your"
            title2="Horizons"
            title3="Hooker Valley Track, New Zealand"
            imageClass="hi-3"
          />
          <Article
            id="hero-4"
            i={2}
            title1="Explore and"
            title2="Reflect"
            title3="Dolomites, Italy"
            imageClass="hi-4"
          />
          <Article
            id="hero-5"
            i={1}
            title1="Change Your"
            title2="Perspective"
            title3="Phuket, Thailand"
            imageClass="hi-5"
          />
        </main>
      </header>
      {showMenu && (
        <section>
          <ul className="level-1">
            <li>
              <h3>Destinations</h3>
              <ul className="level-2">
                <li>
                  <p>Asia</p>
                  <ul className="level-3">
                    <li>Bali</li>
                    <li>Cambodia</li>
                    <li>Georgia</li>
                    <li>India</li>
                    <li>Indonesia</li>
                    <li>Laos</li>
                    <li>Malaysia</li>
                    <li>Maldives</li>
                    <li>Myanmar</li>
                    <li>Philippines</li>
                    <li>Singapore</li>
                    <li>Sri Lanka</li>
                    <li>Thailand</li>
                    <li>Uzbekistan</li>
                    <li>Vietnam</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <h3>Travel Tips</h3>
              <ul>
                <li>Going on a trip</li>
                <li>Travel Insurance</li>
                <li>Working abroad</li>
                <li>Saving</li>
                <li>Instagram tips</li>
              </ul>
              <p>
                <small>More tips...</small>
              </p>
            </li>
            <li>
              <h3>Resources</h3>
              <ul>
                <li>Personalized travel advice</li>
                <li>Where we book our travels</li>
                <li>Become a booking agent</li>
              </ul>
              <p>
                <small>More resources...</small>
              </p>
            </li>
            <li>
              <h3>About Us</h3>
              <ul>
                <li>Our story</li>
                <li>Work with us</li>
                <li>Instagram</li>
                <li>YouTube</li>
              </ul>
              
            </li>
            

          </ul>
        </section>
        
        
        
      )}
      <div className='page-wrap'>
        <h3>Our Locations</h3>
        <Loc locData={locData} />
      </div>
    </div>
    
  );
}

export default Mainpage;
