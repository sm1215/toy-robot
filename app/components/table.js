import Component from '@glimmer/component';

export default class TableComponent extends Component {
  // "rows" is reversed because the origin (0, 0) is located at the SOUTHWEST (bottom left) corner of the table
  rows = [...Array(this.args.rowMax).keys()].reverse();
  columns = [...Array(this.args.columnMax).keys()];

  get robotClass() {
    return `robot ${this.args.robotDirection}`;
  }
}
