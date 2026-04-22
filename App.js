import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import OnboardingScreen from './screens/OnboardingScreen';
import CoffeeHomeScreen from './screens/CoffeeHomeScreen';
import DetailItemScreen from './screens/DetailItemScreen';

export default function App() {
  const [screen, setScreen] = useState('onboarding');
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setScreen('detail');
  };

  if (screen === 'onboarding') {
    return (
      <>
        <StatusBar style="light" />
        <OnboardingScreen onGetStarted={() => setScreen('home')} />
      </>
    );
  }

  if (screen === 'home') {
    return (
      <>
        <StatusBar style="light" />
        <CoffeeHomeScreen onSelectItem={handleSelectItem} />
      </>
    );
  }

  if (screen === 'detail') {
    return (
      <>
        <StatusBar style="dark" />
        <DetailItemScreen
          item={selectedItem}
          onBack={() => setScreen('home')}
        />
      </>
    );
  }

  return null;
}