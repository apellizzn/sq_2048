import React from "react";
import { connect } from "react-redux";
import { Button } from "react-native";
import { Grid, Row, Col } from "react-native-easy-grid";
class MainScreen extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col>
            <Button title="Play" onPress={this.props.play} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default connect(null, dispatch => ({
  play: () => {
    dispatch({ type: "NAVIGATE_GAME" });
  }
}))(MainScreen);
