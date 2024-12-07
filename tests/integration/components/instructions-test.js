import { module, test } from 'qunit';
import { setupRenderingTest } from 'toy-robot/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | instructions', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<Instructions />`);
    assert
      .dom()
      .hasText('Click to place the robot, use the buttons or arrows to move');
  });
});
