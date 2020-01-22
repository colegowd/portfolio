import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import axios from 'axios';


class Index extends React.Component {

  static async getInitialProps() {
    let userData = {};

    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
      userData = response.data;
    }
    catch(err) {
      console.log(err);
    }

    return {intialData: [1,2,3,4], userData};
  }

  constructor(props) {
    super(props);

    this.state = {
      title: 'I am Index Page'
    }
  }

  updateTitle = () => {
    this.setState({title: 'I am Updated Index Page'});
  }


  render() {

    const { title } = this.state;
    const { userData, intialData } = this.props;

    return(
      <BaseLayout>
        <h1 className='fromPage'> I am Index Page from Class Component </h1>
        <h1> { title } </h1>
        <h2> { userData.title } </h2>
        <button onClick={this.updateTitle}> Change Title </button>
      </BaseLayout>
    )
  }
}


export default Index;