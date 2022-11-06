import { ComponentStory, ComponentMeta } from '@storybook/react';
import CustomTable, { ICustomTable } from './CustomTable';
import { mockCustomTableProps } from './CustomTable.mocks';

export default {
  title: 'components/CustomTables',
  component: CustomTable,
  argTypes: {},
} as ComponentMeta<typeof CustomTable>;

const Template: ComponentStory<typeof CustomTable> = (args) => (
  <CustomTable {...args} />
);

export const Table = Template.bind({});

Table.args = {
  ...mockCustomTableProps.table,
} as ICustomTable;
