import React from 'react';
import { Text, View } from 'react-native';
import { sampleSize, compact } from 'lodash';
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

  squashRow = (row) => {
    const [first, second, ...rest] = row;
    if (!first && !second && rest.length === 0) { return []; }
    if (!first) {
      return this.squashRow([second, ...rest]);

    } else if (!second) {
      return [first, ...this.squashRow(rest)];

    } else if (second === first) {
      return [first * 2, ...this.squashRow(rest)];

    } else {
      return [first, ...this.squashRow([second, ...rest])];
    }
  }

  squash = side => {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    let newSchema = [...this.state.schema];
    switch (side) {
      case SWIPE_LEFT:
        newSchema = newSchema.map((row) => {
          newRow = this.squashRow(compact(row));
          return [...newRow, ...Array(4 - newRow.length).fill()];
        });
        const empties = this.findEmpties(newSchema);
        empties.forEach((e) => newSchema[e.rIndex][e.cIndex] = 2);
        this.setState({
          schema: newSchema
        });
        break;
    }
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
