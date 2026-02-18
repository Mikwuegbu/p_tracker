import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
	return (
		<>
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
			</Stack>
			<StatusBar style="dark" />
		</>
	);
}
