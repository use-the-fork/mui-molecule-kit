import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {GlassPaper} from '../molecules';

export default {
  title: 'molecules/GlassPaper',
  component: GlassPaper,
} as ComponentMeta<typeof GlassPaper>;

const Template: ComponentStory<typeof GlassPaper> = (args) => <GlassPaper {...args} />;


export const Dark = Template.bind({});
Dark.args = {
  backgroundColor: '#212529',
  opacity: 0.6,
};

export const DarkBorder = Template.bind({});
DarkBorder.args = {
  backgroundColor: '#212529',
  opacity: 0.6,
  borderRadius: 5
};

export const Light = Template.bind({});
Light.args = {
  backgroundColor: '#f9fafb',
  opacity: 0.6,
};

export const Theme = Template.bind({});
Theme.args = {
  backgroundColor: '#C20430',
  opacity: 0.8,
};
