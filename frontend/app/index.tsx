import { Redirect } from "expo-router";

const App = () => {
  // Write Conditional Logic to determine if user already signed in and, if true, redirect user to his account (whether its client or business)

  return <Redirect href="/(auth)/welcome" />;
};

export default App;
