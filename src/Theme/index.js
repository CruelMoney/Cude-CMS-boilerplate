import React from 'react';
import Navigation from './blocks/Navigation/';
import Homepage from './pages/HomePage/'
import Footer from './blocks/Footer/';

import './assets/css/style.scss'; //theme style

export default class Index extends React.Component {

  render() {
    return (
      <main>
        <header>
          <Navigation />
        </header>
        <Homepage />
        <Footer />
      </main>
    );
  }
}




