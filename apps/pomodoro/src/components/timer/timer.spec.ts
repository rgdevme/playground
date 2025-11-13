import { mount } from '@vue/test-utils';
import Timer from './timer.vue';

describe('Timer', () => {
  it('renders properly', () => {
    const wrapper = mount(Timer, {});
    expect(wrapper.text()).toContain('Welcome to Timer');
  });
});
