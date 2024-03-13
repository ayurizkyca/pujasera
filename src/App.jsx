import { ConfigProvider } from 'antd'
import { theme } from './config/themeConfig.js'
import RouteConfig from './config/routesConfig.jsx'

function App() {
  return (
    <>
      <ConfigProvider theme={theme}>
        <RouteConfig />
      </ConfigProvider>
    </>
  )
}

export default App
