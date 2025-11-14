import { mount } from '@vue/test-utils';
import Layout from './layout.vue';

describe('Layout', () => {
  it('renders properly', () => {
    const wrapper = mount(Layout, {});
    expect(wrapper.text()).toContain('Welcome to Layout');
  });
});
