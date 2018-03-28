import React from "react";
import { connect } from "react-redux";
import { Button, Text } from "react-native";
import { Grid, Row, Col } from "react-native-easy-grid";
import { login, navigateTo } from "../actions";

class SplashScreen extends React.Component {
  componentDidMount() {
    this.props.login();
  }
  render() {
    return (
      <Grid>
        <Row>
          <Col>
            <Text> Splash screen </Text>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: () => {
    dispatch(login());
  }
});
const mapStateToProps = state => ({
  user: state.main.user
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
