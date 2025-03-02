import { Redirect } from 'expo-router';

export default function Index() {
  // Simply redirect to the login screen
  return <Redirect href="/login" />;
}
