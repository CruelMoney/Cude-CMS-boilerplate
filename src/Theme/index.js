import React from 'react';
import Navigation from './blocks/Navigation/';
import Homepage from './pages/HomePage/'
import Footer from './blocks/Footer/';
import fetcher from '../CMS/higher-order-components/Fetcher'
import './assets/css/style.css'; //theme style

class Index extends React.Component {
  
  render() {
    return (
      <main>
        <header>
          <Navigation />
        </header>
        <Homepage />
        <Footer 
          data={this.props.data}
        />
      </main>
    );
  }
}

export default fetcher(Index, '/api/configuration')