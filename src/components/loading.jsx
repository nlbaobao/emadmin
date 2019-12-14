
import React from 'react';
import { Icon } from 'antd';

import './index.less';

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="common-loading"><Icon type="loading" /></div>
    );
  }
}

export default Loading;
