import { module, test } from 'qunit';
import { setupRenderingTest } from 'toy-robot/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | table', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with the correct columns / rows', async function (assert) {
    this.set('columnMax', 5);
    this.set('rowMax', 5);

    await render(hbs`
      <Table
        @columnMax={{this.columnMax}}
        @rowMax={{this.rowMax}}
      />
    `);

    assert.equal(this.element.querySelectorAll('tr').length, 5);
    assert.equal(this.element.querySelectorAll('td').length, 25);
  });
});
