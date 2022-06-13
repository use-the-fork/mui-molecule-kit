import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {ImageAsBackground} from '../molecules';
import {Button} from '../atoms/button/Button';

export default {
  title: 'molecules/Cards/ImageAsBackground',
  component: ImageAsBackground,
} as ComponentMeta<typeof ImageAsBackground>;

const Template: ComponentStory<typeof ImageAsBackground> = (args) => <ImageAsBackground {...args} />;


export const Dark = Template.bind({});
Dark.args = {
  title: 'title',
  text: 'test',
  eyebrow: 'eyebrow',
  image: {
    url: 'https://image-us.samsung.com/SamsungUS/home/audio/galaxy-buds/MB-04-JustWhatYouWantV4.jpg?$cm-g-fb-full-bleed-img-mobile-jpg',
    alt: ''
  },
  button: (<Button />)
};
