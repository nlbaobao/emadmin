import React from 'react';
import Loadable from 'react-loadable';
import Loading from '../../components/loading'
const Reactloadable = Loadable({
  loader: () => import('./login.jsx'),
  loading: Loading,
});

class Loadable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Reactloadable />
    );
  }
}

export default Loadable;
