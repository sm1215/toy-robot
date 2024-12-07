import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | app-controller', function (hooks) {
  setupTest(hooks);

  test("sets the robot's position", async function (assert) {
    const { class: AppControllerComponentClass } = this.owner.factoryFor(
      'component:app-controller',
    );
    const componentManager = this.owner.lookup('component-manager:glimmer');

    const appControllerComponent = componentManager.createComponent(
      AppControllerComponentClass,
      {
        named: {
          robotColumn: 0,
          robotRow: 0,
        },
      },
    );

    appControllerComponent.setRobotPosition(2, 3);
    assert.equal(appControllerComponent.robotColumn, 2);
    assert.equal(appControllerComponent.robotRow, 3);
  }),
    test("sets the robot's direction", async function (assert) {
      const { class: AppControllerComponentClass } = this.owner.factoryFor(
        'component:app-controller',
      );
      const componentManager = this.owner.lookup('component-manager:glimmer');

      const appControllerComponent = componentManager.createComponent(
        AppControllerComponentClass,
        {
          named: {
            robotDirection: 'south',
          },
        },
      );
      // Overriding the default set in the app-controller component,
      // the WeakMap 'named' object above doesn't do the trick and just defaults to the component's initial default
      appControllerComponent.robotDirection = 'north';

      appControllerComponent.setRobotDirection('left');
      assert.equal(appControllerComponent.robotDirection, 'west');
    }),
    test('moves the robot forward', async function (assert) {
      const { class: AppControllerComponentClass } = this.owner.factoryFor(
        'component:app-controller',
      );
      const componentManager = this.owner.lookup('component-manager:glimmer');

      const appControllerComponent = componentManager.createComponent(
        AppControllerComponentClass,
        {
          named: {
            robotColumn: 0,
            robotRow: 0,
            robotDirection: 'south',
          },
        },
      );
      // Overriding the defaults set in the app-controller component,
      // the WeakMap 'named' object above doesn't do the trick and just defaults to the component's initial default
      appControllerComponent.robotDirection = 'north';

      appControllerComponent.moveRobotForward();
      assert.equal(appControllerComponent.robotRow, 1);
    });

  // TODO: Test the robot respects the table boundaries
  // test('robot doesn\'t move if at the edge of the table', async function (assert) {}

  // TODO: Test key inputs function properly
  // test('keyboard input up arrow moves the robot', async function (assert) {}
  // test('keyboard input left arrow turns the robot', async function (assert) {}

  // TODO: Test the robot can report it's location and direction
  // test('displays the robot\'s current position and direction', async function (assert) {}
});
