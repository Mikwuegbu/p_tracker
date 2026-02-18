import { Project } from '../types/project';

export const MOCK_PROJECTS: Project[] = [
	{
		id: '1',
		name: 'Website Redesign',
		clientName: 'Acme Corp',
		status: 'active',
		startDate: '2024-01-15',
		description:
			'Modernizing the main corporate landing page with new branding.',
	},
	{
		id: '2',
		name: 'Mobile App Development',
		clientName: 'Global Tech',
		status: 'on_hold',
		startDate: '2023-11-01',
		description: 'Cross-platform inventory management mobile application.',
	},
	{
		id: '3',
		name: 'SEO Optimization',
		clientName: 'Marketing Pro',
		status: 'completed',
		startDate: '2023-09-10',
		endDate: '2023-12-20',
		description:
			'Optimizing search engine visibility for the client portfolio.',
	},
	{
		id: '4',
		name: 'Data Migration',
		clientName: 'Big Logistics',
		status: 'active',
		startDate: '2024-02-01',
		description:
			'Migrating legacy database systems to modern cloud infrastructure.',
	},
	{
		id: '5',
		name: 'Social Media Strategy',
		clientName: 'Small Biz Inc',
		status: 'on_hold',
		startDate: '2024-02-10',
		description: 'Planning content calendar and engagement strategy for Q1-Q2.',
	},
];
