import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AppWrapperComponent extends Component {
    columnMax = 5;
    rowMax = 5;

    turnDirections = {
        north: 0,
        east: 1,
        south: 2,
        west: 3
    };

    moveDirections = {
        north: {
            axis: 'row',
            modifier: 1
        },
        east: {
            axis: 'column',
            modifier: 1
        },
        south: {
            axis: 'row',
            modifier: -1
        },
        west: {
            axis: 'column',
            modifier: -1
        }
    };

    @tracked robotColumn = 0;
    @tracked robotRow = 0;
    @tracked robotDirection = 'south';
    @tracked robotPlaced = false;
    @tracked report = [];

    @action
    setRobotPosition(column, row) {
        this.robotColumn = column;
        this.robotRow = row;
        this.robotPlaced = true;
    }

    @action
    setRobotDirection(turnDirection) {
        const directionModifier = turnDirection === 'left' ? -1 : 1;
        let adjustedDirection = this.turnDirections[this.robotDirection] + directionModifier;

        // make the rotation circular when exceeding the bounds implied by this.directions
        if (adjustedDirection < this.turnDirections.north) {
            adjustedDirection = this.turnDirections.west;
        } else if (adjustedDirection > this.turnDirections.west) {
            adjustedDirection = this.turnDirections.north;
        }

        const [newDirection] = Object.entries(this.turnDirections).find(
            ([_direction, index]) => {
                return index === adjustedDirection;
            }
        );

        this.robotDirection = newDirection;
    }

    @action
    moveRobotForward() {
        const { axis, modifier } = this.moveDirections[this.robotDirection];

        if (axis === 'column') {
            const newPosition = this.robotColumn + modifier;
            if (newPosition < this.columnMax && newPosition >= 0) {
                this.robotColumn = newPosition;
            }
        }

        if (axis === 'row') {
            const newPosition = this.robotRow + modifier;
            if (newPosition < this.rowMax && newPosition >= 0) {
                this.robotRow = newPosition;
            }
        }
    }

    @action
    handleKeyInput(key) {
        if (!this.robotPlaced) {
            return;
        }
        if (key === 'up') {
            this.moveRobotForward();
        }
        if (key === 'left' || key === 'right') {
            // the key also matches the turning direction and can be used as a parameter here
            this.setRobotDirection(key);
        }
    }

    // helper function to make things more readable
    capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    @action
    appendReport() {
        const direction = this.capitalizeFirstLetter(this.robotDirection);
        // creating a new array is an Ember thing so the tracked property will update properly
        this.report = [
            `X: ${this.robotColumn}, Y: ${this.robotRow}, F: ${direction}`,
            ...this.report
        ];
    }
}
