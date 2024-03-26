import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constant/routesConstant';
import LoginPage from '../page/LoginPage';
import HomePage from '../page/HomePage';
import PortalRestoPage from '../page/PortalRestoPage';
import HistoryPage from '../page/HistoryPage'
import StatsPage from '../page/StatsPage';
import RestoMenuPage from '../page/RestoMenuPage';
import NotFoundPage from '../page/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import CartPage from '../page/CartPage';
import ReportPage from '../page/ReportPage';
import DashboardPage from '../page/DashboardPage';

const RoutesConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.ROOT} element={<LoginPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.HOME} element={<PrivateRoute><HomePage /></PrivateRoute>}>
          <Route path={ROUTES.PORTAL_RESTO} element={<PortalRestoPage />} />
          <Route path={ROUTES.HISTORY} element={<HistoryPage />} />
          <Route path={ROUTES.STATS} element={<StatsPage />} />
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.REPORT} element={<ReportPage />} />
          <Route path={ROUTES.DETAIL_RESTO + '/:id'} element={<RestoMenuPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
        <Route path={ROUTES.CART} element={<PrivateRoute><CartPage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesConfig;
