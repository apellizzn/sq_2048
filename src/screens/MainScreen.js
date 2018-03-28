import React from "react";
import { connect } from "react-redux";
import { Button, Text, Image } from "react-native";
import { Grid, Row, Col } from "react-native-easy-grid";
import { navigateTo } from "../actions";
class MainScreen extends React.Component {
  render() {
    const { user, play, login } = this.props;

    return (
      <Grid>
        <Row>
          <Col>
            <Image
              style={{ width: 150, height: 150 }}
              source={{
                uri: user.picture.data.url
              }}
            />
          </Col>
          <Col>
            <Text>{user.name}</Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button title="Play" onPress={play} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  play: () => {
    dispatch(navigateTo("Game"));
  }
});
const mapStateToProps = state => ({
  user: state.main.user
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
