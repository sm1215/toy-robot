import { module, test } from 'qunit';
import { setupRenderingTest } from 'toy-robot/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { click } from '@ember/test-helpers';

module('Integration | Component | controls', function (hooks) {
  setupRenderingTest(hooks);

  test("ignores commands if the robot isn't placed", async function (assert) {
    let didSetRobotDirection = false;
    this.set('robotPlaced', false);
    this.set('setRobotDirection', () => {
      didSetRobotDirection = true;
    });

    await render(
      hbs`<Controls @robotPlaced={{this.robotPlaced}} @setRobotDirection={{this.setRobotDirection}} />`,
    );
    await click('#left');
    assert.false(didSetRobotDirection);
  }),
    test('allows commands if the robot is placed', async function (assert) {
      this.set('robotPlaced', true);
      let didSetRobotDirection = false;
      this.set('setRobotDirection', function () {
        didSetRobotDirection = true;
      });

      await render(
        hbs`<Controls @robotPlaced={{this.robotPlaced}} @setRobotDirection={{this.setRobotDirection}} />`,
      );
      await click('#left');
      assert.true(didSetRobotDirection);
    }),
    test('turns the robot', async function (assert) {
      this.set('robotPlaced', true);
      let robotDirection;
      this.set('setRobotDirection', function (direction) {
        robotDirection = direction;
      });

      await render(
        hbs`<Controls @robotPlaced={{this.robotPlaced}} @setRobotDirection={{this.setRobotDirection}} />`,
      );
      await click('#left');
      assert.equal(robotDirection, 'left');
    }),
    test('moves the robot', async function (assert) {
      this.set('robotPlaced', true);
      let robotMovedForward = false;
      this.set('moveRobotForward', function () {
        robotMovedForward = true;
      });

      await render(
        hbs`<Controls @robotPlaced={{this.robotPlaced}} @moveRobotForward={{this.moveRobotForward}} />`,
      );
      await click('#move');
      assert.true(robotMovedForward);
    }),
    test('appends to the report', async function (assert) {
      this.set('robotPlaced', true);
      let reportAppended = false;
      this.set('appendReport', function () {
        reportAppended = true;
      });

      await render(
        hbs`<Controls @robotPlaced={{this.robotPlaced}} @appendReport={{this.appendReport}} />`,
      );
      await click('#report');
      assert.true(reportAppended);
    });
});
