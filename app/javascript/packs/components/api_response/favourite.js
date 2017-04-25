import React from 'react';

class Favourite extends React.Component {
  constructor(props) {
    super(props);
    this.toggleFavourite = this.toggleFavourite.bind(this);
    this.setState({
      favouriteState: this.props.favouriteState,
      token: props.token
    });
  }

  favouriteStarClass() {
    if (this.state.favouriteState === true) {
      return 'glyphicon-star';
    }
    else {
      return 'glyphicon-star-empty';
    }
  }

  toggleFavourite() {
    if (this.state.favouriteState === false) {
      this.updateFavouriteState(true);
    }
    else {
      this.updateFavouriteState(false);
    }
  }

  updateFavouriteState(favouriteState) {
    $.ajax({
      url: '/api_responses/' + this.state.token,
      context: this,
      data: $.param({ api_response: { favourite: favouriteState } }),
      dataType: 'json',
      type: 'PATCH'
    }).done(function (data){
      this.setState({
        favouriteState: data.favourite
      });
    })
  }

  render() {
    return(
      <a class={"glyphicon star " + this.favouriteStarClass()} onClick={this.toggleFavourite}></a>
    )
  }
}

export default Favourite;
