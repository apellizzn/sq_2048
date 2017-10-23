import React from 'react';
import { Text, View } from 'react-native';
import { sampleSize, compact } from 'lodash';
import { Grid, Row, Col } from 'react-native-easy-grid';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import styles from './styles';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const schema = Array(4).fill().map(() => Array(4).fill());
    this.addEmpties(schema)

    this.state = {
      schema,
    };
  }

  addEmpties = schema =>
    this.findEmpties(schema).forEach(({ rIndex, cIndex }) => schema[rIndex][cIndex] = 2)

  findEmpties = schema =>
    sampleSize(
      schema.reduce(
        (memo, next, rIndex) =>
          [
            ...memo,
            ...next.map((val, cIndex) => ({ val, rIndex, cIndex }))
              .filter(({ val }) => !val)
          ],
          []
      ),
      2
    );

  squash = (row) => {
    const [first, second, ...rest] = row;
    if (!first && !second && rest.length === 0) { return []; }
    if (second === first) {
      return [first * 2, ...this.squash(rest)];
    } else {
      return [first, ...this.squash([second, ...rest])];
    }
  }

  reduceSchema = side => {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    let newSchema = [...this.state.schema];
    switch (side) {
      case SWIPE_LEFT:
        newSchema = newSchema.map((row) => {
          newRow = this.squash(compact(row));
          return [...newRow, ...Array(4 - newRow.length).fill()];
        });
        break;
      case SWIPE_RIGHT:
        newSchema = newSchema.map((row) => {
          newRow = this.squash(compact(row.reverse()));
          return [...newRow, ...Array(4 - newRow.length).fill()].reverse();
        });
        break;
    }
    this.addEmpties(newSchema);
    this.setState({ schema: newSchema});
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
      <GestureRecognizer style={{ flex: 1 }} onSwipe={this.reduceSchema}>
        <Grid>{rows}</Grid>
      </GestureRecognizer>
    );
  }
};
