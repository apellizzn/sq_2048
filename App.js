import React from 'react';
import { Text, View } from 'react-native';
import { sampleSize } from 'lodash';
import { Grid, Row, Col } from 'react-native-easy-grid';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import styles from './styles';

const SWIPES = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGTH: 'right',
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const schema = Array(4).fill().map(() => Array(4).fill());
    const empties = this.findEmpties(schema);
    console.log(empties);

    empties.forEach((e) => schema[e.rIndex][e.cIndex] = 2 );
    this.state = {
      schema,
    };
  }

  findEmpties = schema =>
    sampleSize(schema.reduce((memo, next, rIndex) => {
      return [...memo, ...next.map((val, cIndex) => ({
        val,
        rIndex,
        cIndex
      })).filter(({
        val
      }) => !val)]

    }, []), 2);

  squash = side => {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    let newSchema = [...this.state.schema];
    console.log(side);
    switch (side) {
      case SWIPE_UP:
        break;
      case SWIPE_DOWN:
        break;
      case SWIPE_LEFT:
        newSchema.forEach((column) => {
          let i;
          for (i = column.length - 1; i > -1; i--) {
            if (column[i] && i - 1 > -1) {
              if (column[i] === column[i - 1]) {
                column[i] = undefined;
                column[i - 1] = column[i - 1] * 2
              } else if (column[i - 1] === undefined) {
                column[i - 1] = column[i];
                column[i] = undefined;
              }
            }
          }
        });
        break;
      case SWIPE_RIGHT:
        newSchema.forEach((column) => {
          let i;
          for (i = 0; i < column.length; i++) {
            if (column[i] && i + 1 < column.length) {
              if (column[i] === column[i + 1]) {
                column[i] = undefined;
                column[i + 1] = column[i + 1] * 2
              } else if (column[i + 1] === undefined) {
                column[i + 1] = column[i];
                column[i] = undefined;
              }
            }
          }
        });
        break;
    }
    const empties = this.findEmpties(newSchema);
    empties.forEach((e) => newSchema[e.rIndex][e.cIndex] = 2);
    this.setState({ schema: newSchema });
  }

  render() {
    const rows = Array(4).fill().map((_, rIndex) => (
      <Row key={rIndex} style={styles.noMargin}>
        {
          this.state.schema[rIndex].map((c, cIndex) =>
          (
            <Col key={cIndex} style={styles.colMargin}>
              <View style={styles.cell}>
                <Text style={styles.cellText}>{c}</Text>
              </View>
            </Col>
          )
          )
        }
      </Row>
    ))
    return (
      <GestureRecognizer style={{ flex: 1}} onSwipe={this.squash}>
        <Grid>{rows}</Grid>
      </GestureRecognizer>
    );
  }
};
