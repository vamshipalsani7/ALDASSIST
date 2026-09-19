import type { Meta, StoryObj } from '@storybook/react';
import { CompanyLegalScreen } from './CompanyLegalScreen';
import { companyLegalScenarios } from '../../fixtures/scenarios/public';

const meta: Meta<typeof CompanyLegalScreen> = { title: 'Screens/SC-P15 Company Legal', component: CompanyLegalScreen, parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj<typeof CompanyLegalScreen>;
export const S_About: Story = { args: { loaded: companyLegalScenarios['about'] } };
export const S_Terms: Story = { args: { loaded: companyLegalScenarios['terms'] } };
export const S_Loading: Story = { args: { loaded: companyLegalScenarios['loading'] } };
