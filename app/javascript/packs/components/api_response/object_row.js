import React from 'react';
import { Link } from 'react-router';
import Favourite from './favourite';
import TimeAgo from 'react-timeago'

class ObjectRow extends React.Component {
  render() {
    const {token, method, url, createdAt, favouriteState} = this.props
    return(
      <tr>
        <td><Favourite token={token} favouriteState={favouriteState} /></td>
        <td>{method}</td>
        <td>{url}</td>
        <td><TimeAgo date={new Date(createdAt)} /></td>
        <td><Link href={`/#/api_responses/${token}`}>Show</Link></td>
      </tr>
    )
  }
}

export default ObjectRow;
