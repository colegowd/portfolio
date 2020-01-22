import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import { withRouter } from 'next/router';

class Portfolio extends React.Component {

  render() {
    console.log(this.props);

    return(
      <BaseLayout>
        <h1> I am a Portfolio Page </h1>
        <h2>{this.props.router.query.id}</h2>
      </BaseLayout>
    )
  }
}

export default withRouter(Portfolio);