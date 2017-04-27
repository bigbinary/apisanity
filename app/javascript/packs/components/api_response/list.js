import React from 'react';
import TableHeader from './table_header';
import ObjectRow from './object_row';

class List extends React.Component {
  render() {
    return(
      <table className='table'>
        <TableHeader headers={this.props.headers} />
        <tbody>
          {this.props.apiResponses.map(function(apiResponse, index) {
            const {token, favourite, method, url, created_at} = apiResponse
            return(
              <ObjectRow token={token} favouriteState={favourite} method={method} url={url} createdAt={created_at} />
            );
          })}
        </tbody>
      </table>
    )
  }
}

export default List;
