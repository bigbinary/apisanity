import React from 'react';
import TableHeader from './table_header';
import ObjectRow from './object_row';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.setState({
      elements: this.props.elements,
      headers: ['Favourite', 'HTTP Method', 'Url', 'Hit Time', '']
    })
  }

  render() {
    return(
      <table className='table'>
        <TableHeader headers={this.state.headers} />
        <tbody>
          {this.state.elements.map(function(object, i){
            return(
              <ObjectRow token={object.token} favouriteState={object.favourite} method={object.method} url={object.url} createdAt={object.created_at} />
            );
          })}
        </tbody>
      </table>
    )
  }
}

export default List;
