import React from 'react';
import { Routes, Route } from 'react-router-dom';

const HomePage = React.lazy(() => import('./pages/Homepage/HomePage'));
const SubscriptionDetail = React.lazy(
  () => import('./pages/Homepage/SubscriptionDetail')
);

const Loading = () => <div>Loading ...</div>;
const RoutePage = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/subscriber/:id" element={<SubscriptionDetail />} />
      </Routes>
    </React.Suspense>
  );
};

export default RoutePage;
