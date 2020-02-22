import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import ENV from 'super-rentals/config/environment';

module('Integration | Component | map/map', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a map image for the specified parameters', async function(assert) {
    await render(hbs`<Map::Map
      @alt="My Test"
      @width="150"
      @height="120"
    />`);

    assert.dom('.map').exists();
    assert.dom('.map img').hasAttribute('alt', 'Map for My Test');
    assert.dom('.map img').hasAttribute('src',  /^..\/assets\/images\//, 'the src starts with "../assets/images/"');
    assert.dom('.map img').hasAttribute('width', '150');
    assert.dom('.map img').hasAttribute('height', '120');

    let { src } = find('.map img');
    let mapURL = encodeURIComponent(ENV.mapURL);

    assert.ok(src.includes(mapURL), 'the src should include the map file name');
  });

  test('the default alt attribute can be overridden', async function(assert) {
    await render(hbs`<Map::Map
      @lat="37.7797"
      @lng="-122.4184"
      @zoom="10"
      @width="150"
      @height="120"
      alt="A map in my tests"
    />`);

    assert.dom('.map img').hasAttribute('alt', 'A map in my tests');
  });

  test('the src, width and height attributes cannot be overridden', async function(assert) {
    await render(hbs`<Map::Map
      @alt="Test Map"
      @width="150"
      @height="120"
      src="public/assets/images/teaching-tomster.png"
      width="200"
      height="300"
    />`);

    assert.dom('.map img').hasAttribute('src',  /^..\/assets\/images\//, 'the src starts with "../assets/images/"');
    assert.dom('.map img').hasAttribute('width', '150');
    assert.dom('.map img').hasAttribute('height', '120');
  });
});
