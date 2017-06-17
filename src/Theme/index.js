import React from 'react';
import Navigation from './blocks/Navigation/';
import Homepage from './pages/HomePage/'
import Footer from './blocks/Footer/';

import './assets/css/style.css'; //theme style

class Index extends React.Component {
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

export default fetcher(Index, '/api/configuration')