import { mount } from '@vue/test-utils';
import Settings from './settings.vue';

describe('Settings', () => {
  it('renders properly', () => {
    const wrapper = mount(Settings, {});
    expect(wrapper.text()).toContain('Welcome to Settings');
  });
});
