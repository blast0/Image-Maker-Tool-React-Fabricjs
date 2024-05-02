import React from "react";
import PropTypes from "prop-types";
import manager from "./manager";

import "./style.css";

class HorizontalLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }
  componentDidMount() {
    manager.register(this.props.id, {
      showSpinner: this.show,
      hideSpinner: this.hide,
    });
  }
  show() {
    this.setState({ active: "active" });
  }

  hide() {
    this.setState({ active: "" });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.active ? (
          <div className="horizontal-spinner">
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

HorizontalLoader.propTypes = {
  id: PropTypes.string.isRequired,
};

export default HorizontalLoader;
