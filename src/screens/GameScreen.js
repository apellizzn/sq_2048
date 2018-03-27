import React from "react";
import { Button, Text, View } from "react-native";
import {
  sampleSize,
  values,
  flattenDeep,
  sample,
  isEqual,
  compact,
  flow,
  reverse
} from "lodash";
import { Grid, Row, Col } from "react-native-easy-grid";
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";
import styles from "../styles";

export default class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.squashSide = {
      SWIPE_UP: flow(this.transpose, this.squashLeft, this.transpose),
      SWIPE_DOWN: flow(this.transpose, this.squashRight, this.transpose),
      SWIPE_LEFT: this.squashLeft,
      SWIPE_RIGHT: this.squashRight
    };
    this.init(true);
  }

  init = first => {
    const schema = Array(4)
      .fill()
      .map(() => Array(4).fill());
    this.addEmpties(schema);

    if (first) {
      this.state = {
        schema: schema,
        lost: false
      };
    } else {
      this.setState({
        schema: schema,
        lost: false
      });
    }
  };

  addEmpties = schema => {
    this.findEmpties(schema).forEach(
      ({ rIndex, cIndex }) => (schema[rIndex][cIndex] = 2)
    );
    return schema;
  };

  findEmpties = schema =>
    sampleSize(
      schema.reduce(
        (memo, next, rIndex) => [
          ...memo,
          ...next
            .map((val, cIndex) => ({ val, rIndex, cIndex }))
            .filter(({ val }) => !val)
        ],
        []
      ),
      2
    );
  squash = row => {
    const [first, second, ...rest] = row;
    if (!first && !second && rest.length === 0) {
      return [];
    }
    if (second === first) {
      return [first * 2, ...this.squash(rest)];
    } else {
      return [first, ...this.squash([second, ...rest])];
    }
  };

  squashRight = schema =>
    schema.map(row => {
      newRow = this.squash(compact(reverse([...row])));
      return reverse([...[...newRow, ...Array(4 - newRow.length).fill()]]);
    });

  squashLeft = schema =>
    schema.map(row => {
      newRow = this.squash(compact(row));
      return [...newRow, ...Array(4 - newRow.length).fill()];
    });

  transpose = schema =>
    Array(schema.length)
      .fill()
      .map((_, rIndex) =>
        Array(schema.length)
          .fill()
          .map((_, cIndex) => schema[cIndex][rIndex])
      );

  reduceSchema = side => {
    const squashFun = this.squashSide[side];
    let newSchema = [...this.state.schema];
    this.setState({
      schema: squashFun
        ? flow(squashFun, this.addEmpties)(newSchema)
        : newSchema,
      lost: this.lost(newSchema)
    });
  };

  lost = schema => {
    const possibleSchemas = [...values(this.squashSide)].map(squashFunc =>
      flattenDeep(squashFunc([...schema]))
    );
    return possibleSchemas.every(squashedSchema =>
      isEqual(squashedSchema, possibleSchemas[0])
    );
  };

  render() {
    if (this.state.lost) {
      return (
        <View>
          <Text>You have lost!</Text>
          <Button title="Restart" onPress={this.init} />
        </View>
      );
    } else {
      const rows = Array(4)
        .fill()
        .map((_, rIndex) => (
          <Row key={rIndex} style={styles.noMargin}>
            {this.state.schema[rIndex].map((c, cIndex) => (
              <Col key={cIndex} style={styles.colMargin}>
                <View style={[styles.cell, styles[`cell_${c}`]]}>
                  <Text style={styles.cellText}>{c}</Text>
                </View>
              </Col>
            ))}
          </Row>
        ));
      return (
        <GestureRecognizer style={{ flex: 1 }} onSwipe={this.reduceSchema}>
          <Grid>{rows}</Grid>
        </GestureRecognizer>
      );
    }
  }
}
