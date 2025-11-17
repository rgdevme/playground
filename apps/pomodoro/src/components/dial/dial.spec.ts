import { mount } from '@vue/test-utils';
import Dial from './dial.vue';

describe('Dial', () => {
  it('renders properly', () => {
    const wrapper = mount(Dial, {});
    expect(wrapper.text()).toContain('Welcome to Dial');
  });
});
