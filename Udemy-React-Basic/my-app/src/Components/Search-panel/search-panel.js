import { Component } from "react";
import "./search-panal.css";

class SearchPanal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        term: '',
    }
  }


  onUpdateSearch = (e) => {
    const term = e.target.value;
    this.setState({term})
    this.props.onUpdateSearch(term)
  }
  
  
  
    render() {
    return (
      <input
        className="form-control search-input"
        type="text"
        placeholder="Search employee"
        value={this.state.term}
        onChange = {this.onUpdateSearch}
      />
    )
  }
}

export default SearchPanal;
