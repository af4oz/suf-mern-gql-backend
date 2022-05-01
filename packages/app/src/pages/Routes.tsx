import { Routes, Route, Navigate } from 'react-router-dom';
import NavMenuDesktop from '../components/NavMenuDesktop';
import RightSidePanel from '../components/RightSidePanel';
import QuesListPage from './QuesListPage';
import AllTagsPage from './AllTagsPage';
import AllUsersPage from './AllUsersPage';
import QuestionPage from './QuestionPage';
import AskQuestionPage from './AskQuestionPage';
import UserPage from './UserPage';
import NotFoundPage from './NotFoundPage';
import { useAuthContext } from '../context/auth';

import 'twin.macro';

const AppRoutes = () => {
  const { user } = useAuthContext();

  return (
    <div tw="max-width[1264px] w-full mx-auto flex flex-row flex-nowrap relative">
      <Routes>
        <Route path="/">
          <NavMenuDesktop />
          <QuesListPage />
          <RightSidePanel />
        </Route>
        <Route path="/ask">
          {user ? (
            <>
              <NavMenuDesktop />
              <AskQuestionPage />
              <RightSidePanel />
            </>
          ) : (
            <Navigate to="/" />
          )}
        </Route>
        <Route path="/tags">
          <NavMenuDesktop />
          <AllTagsPage />
        </Route>
        <Route path="/users">
          <NavMenuDesktop />
          <AllUsersPage />
        </Route>
        <Route path="/user/:username">
          <NavMenuDesktop />
          <UserPage />
        </Route>
        <Route path="/questions/:quesId">
          <NavMenuDesktop />
          <QuestionPage />
          <RightSidePanel />
        </Route>
        <Route path="/tags/:tagName">
          <NavMenuDesktop />
          <QuesListPage tagFilterActive={true} />
          <RightSidePanel />
        </Route>
        <Route path="/search/:query">
          <NavMenuDesktop />
          <QuesListPage searchFilterActive={true} />
          <RightSidePanel />
        </Route>
        <Route>
          <NavMenuDesktop />
          <NotFoundPage />
          <RightSidePanel />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
