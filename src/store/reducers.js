import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

// App-wide Reducers
import Global from './ui/Global';
import Notifications from './ui/Notifications';
import User from './ui/User';
import Media from './api/Media';

// Survey Reducers
import Survey from './api/Survey';
import SurveyPage from './api/SurveyPage';
import SurveyQuestion from './api/SurveyQuestion';
import SurveySummary from './api/SurveySummary';
import SurveyResponse from './api/SurveyResponse';
import SurveyInterview from './api/SurveyInterview';
import SurveySource from './api/SurveySource';
import SurveyReport from './api/SurveyReport';
import SurveyReportFilter from './api/SurveyReportFilter';
import SurveyLogo from './api/SurveyLogo';

// Modal Reducers
import CreateSurveyModal from './ui/CreateSurveyModal';
import QuestionOptionModal from './ui/QuestionOptionModal';
import CopySurveyModal from './ui/CopySurveyModal';
import ReportFilterModal from './ui/ReportFilterModal';
import CreateFilterModal from './ui/CreateFilterModal';
import TextResponseModal from './ui/TextResponseModal';
import DownloadReportModal from './ui/DownloadReportModal';

// Other Reducers
import RealTimeCharts from './ui/RealTimeCharts';
import InlineEditor from './ui/InlineEditor';
import SourceSelector from './ui/SourceSelector';
import SourceDashboard from './ui/SourceDashboard';
import EmailLeads from './api/EmailLeads';
import ThankYouPage from './ui/ThankYouPage';
import TerminatePage from './ui/TerminatePage';
import PageList from './ui/PageList';
import PageLogic from './ui/PageLogic';
import ProjectAudience from './api/ProjectAudience';
import Reorder from './ui/Reorder';
import QuestionEditor from './ui/QuestionEditor';

const appReducers = {
  Global,
  Notifications,
  User,
  Media
};

const surveyReducers = {
  Survey,
  SurveyPage,
  SurveyQuestion,
  SurveySummary,
  SurveyResponse,
  SurveyInterview,
  SurveySource,
  SurveyReport,
  SurveyReportFilter,
  SurveyLogo
};

const modalReducers = {
  CreateSurveyModal,
  QuestionOptionModal,
  CopySurveyModal,
  ReportFilterModal,
  CreateFilterModal,
  TextResponseModal,
  DownloadReportModal
};

const otherUIReducers = {
  RealTimeCharts,
  InlineEditor,
  SourceSelector,
  SourceDashboard,
  EmailLeads,
  ThankYouPage,
  TerminatePage,
  PageList,
  PageLogic,
  ProjectAudience,
  Reorder,
  QuestionEditor
};

export default combineReducers({
  routing: routerReducer,
  ...appReducers,
  ...surveyReducers,
  ...modalReducers,
  ...otherUIReducers,
  form: formReducer
});
