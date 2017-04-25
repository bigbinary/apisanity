import React from 'react';

class TableHeader extends React.Component {
  constructor(props) {
    super(props);
    this.setState({
      headers: this.props.headers
    })
  }

  render() {
    return(
      <thead>
        <tr>
          {this.state.headers.map(function(object, i){
            return(
              <th>{object}</th>
            );
          })}
        </tr>
      </thead>
    )
  }
}

export default TableHeader;
