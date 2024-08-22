import { Moon, Sun, SunMoon } from 'lucide-react';
import { Dropdown } from '../components/Dropdown'
import { useTheme } from '../components/ThemeProvider'

export default function Home() {
  const { theme, setTheme } = useTheme();

  return <div>
    <Dropdown value={theme} setValue={setTheme}
      options={["light", "dark", "system"]}
      icons={[<Sun />, <Moon />, <SunMoon />]} />
  </div>
}

