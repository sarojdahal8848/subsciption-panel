import { ComponentStory, ComponentMeta } from '@storybook/react';
import CustomCard, { ICustomCard } from './CustomCard';
import { mockCustomCardProps } from './CustomCard.mocks';

export default {
  title: 'components/CustomCards',
  component: CustomCard,
  argTypes: {},
} as ComponentMeta<typeof CustomCard>;

const Template: ComponentStory<typeof CustomCard> = (args) => (
  <CustomCard {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockCustomCardProps.card,
} as ICustomCard;
