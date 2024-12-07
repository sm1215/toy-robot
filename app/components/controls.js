import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ControlsComponent extends Component {
  @action
  turnRobot(direction) {
    if (!this.args.robotPlaced) {
      return;
    }
    this.args.setRobotDirection(direction);
  }

  @action
  moveRobot(ev) {
    if (!this.args.robotPlaced) {
      return;
    }
    this.args.moveRobotForward();
  }

  @action
  printReport() {
    if (!this.args.robotPlaced) {
      return;
    }
    this.args.appendReport();
  }
}
