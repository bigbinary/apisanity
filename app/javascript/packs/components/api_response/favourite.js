import React from 'react';

class Favourite extends React.Component {
  constructor(props) {
    super(props);
    this.toggleFavourite = this.toggleFavourite.bind(this);
    this.state = {
      favouriteState: this.props.favouriteState,
      token: props.token
    };
  }

  toggleFavourite () {
    this.updateFavouriteState(!this.state.favouriteState);
  }

  updateFavouriteState(favouriteState) {
    fetch(`/api_responses/${this.state.token}`, {
      method: 'PATCH',
      body: JSON.stringify({api_response: {favourite: favouriteState}}),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        this.setState({
          favouriteState: data.favourite
        });
    }.bind(this))
  }

  render() {
    const favouriteStarClass = this.state.favouriteState ? 'glyphicon-star' : 'glyphicon-star-empty'
    return(
      <a class={`glyphicon star ${favouriteStarClass}`} onClick={this.toggleFavourite}></a>
    )
  }
}

export default Favourite;
