import { createBrowserRouter, RouterProvider } from "react-router";
import SurveyCards from "./components/SurveyCards";
import Body from "./components/Body";
import TakeSurvey from "./pages/TakeSurvey";
import CreateSurvey from "./pages/CreateSurvey";
import SurveyResults from "./pages/SurveyResults";
import Login from "./pages/Login";

function App() {
    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Body />,
            children: [
                {
                    path: '/',
                    element: <SurveyCards />
                },
                {
                    path: '/take-survey/:id',
                    element: <TakeSurvey />
                },
                {
                    path: '/create',
                    element: <CreateSurvey />
                },
                {
                    path: 'survey-result/:id',
                    element: <SurveyResults />
                },
                {
                    path: '/login',
                    element: <Login />
                }
            ]
        }
    ]);

  return (
    <div>
        <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
