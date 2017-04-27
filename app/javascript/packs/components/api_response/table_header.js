import React from 'react';

class TableHeader extends React.Component {
  render() {
    return(
      <thead>
        <tr>
          {this.props.headers.map(function(header, i){
            return(
              <th>{header}</th>
            );
          })}
        </tr>
      </thead>
    )
  }
}

export default TableHeader;
