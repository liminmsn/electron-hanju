import { HashRouter, Route, Routes } from 'react-router'
import { ConfigProvider } from 'antd'
import ReactDOM from 'react-dom/client'
import App from './AppMain'
import '@fortawesome/fontawesome-free/css/all.css'
import '@renderer/assets/base.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider>
    <HashRouter>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </HashRouter>
  </ConfigProvider>
)
