import Component from '@glimmer/component';
import ENV from 'super-rentals/config/environment';

export default class MapMapComponent extends Component {
  get mapURL() {
    return ENV.mapURL
  }

  get src() {
    const base =  "../assets/images"
    return `${base}/${this.mapURL}`
  }

  constructor(...args) {
    super(...args);
  }
}
