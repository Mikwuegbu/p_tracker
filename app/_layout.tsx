import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ProjectsProvider } from '../src/context/ProjectsContext';

export default function RootLayout() {
	return (
		<ProjectsProvider>
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: '#ffffff',
					},
					headerShadowVisible: false,
					headerTitleStyle: {
						fontWeight: '700',
						color: '#202124',
					},
					contentStyle: {
						backgroundColor: '#F8F9FA',
					},
				}}
			>
				<Stack.Screen
					name="index"
					options={{
						title: 'Project Tracker',
					}}
				/>
				<Stack.Screen
					name="project/[id]"
					options={{
						title: 'Project Details',
						headerBackTitle: 'Back',
					}}
				/>
				<Stack.Screen
					name="new-project"
					options={{
						title: 'New Project',
						headerBackTitle: 'Cancel',
						presentation: 'modal',
					}}
				/>
			</Stack>
			<StatusBar style="dark" />
		</ProjectsProvider>
	);
}
