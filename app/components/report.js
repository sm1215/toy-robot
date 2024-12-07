import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class ReportComponent extends Component {
  @tracked history = [];
}
