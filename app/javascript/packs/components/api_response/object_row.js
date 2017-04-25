import React from 'react';
import { Link } from 'react-router';
import Favourite from './favourite';
import TimeAgo from 'react-timeago'

class ObjectRow extends React.Component {
  constructor(props) {
    super(props);
    this.setState({
      token: this.props.token,
      method: this.props.method,
      url: this.props.url,
      createdAt: this.props.createdAt,
      favouriteState: this.props.favouriteState
    })
  }

  render() {
    return(
      <tr>
        <td><Favourite token={this.state.token} favouriteState={this.state.favouriteState} /></td>
        <td>{this.state.method}</td>
        <td>{this.state.url}</td>
        <td><TimeAgo date={new Date(this.state.createdAt)} /></td>
        <td><Link href={'/#/api_responses/' + this.state.token}>Show</Link></td>
      </tr>
    )
  }
}

export default ObjectRow;
