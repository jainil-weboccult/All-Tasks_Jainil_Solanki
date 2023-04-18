import { Route, Routes } from "react-router-dom";
import Cpolicy from "./Policy-components/Cpolicy";
import Hmgmt from "./Holiday-components/Hmgmt";
import Hrms from "./Hrms components/Hrms";
import LeaveManagement from "./leave-components/LeaveManagement";
import Llog from "./leave-components/Llog";
import Lsheet from "./leave-components/Lsheet";
import Pass from "./Password-components/Pass";
import Payroll from "./Payroll-components/Payroll";
import Pslip from "./Payroll-components/Pslip";
import Res from "./timetracker-components/Res";
import TimeTracker from "./timetracker-components/TimeTracker";
import Tlog from "./timetracker-components/Tlog";
import Tsheet from "./timetracker-components/Tsheet";





export default function Body() {
  return (
    <div>
      <Routes>
        <Route exact path="/timetracker" element={<TimeTracker />}>
          <Route path="timelog" element={<Tlog />} />
          <Route path="time-sheet" element={<Tsheet />} />
          <Route path="res" element={<Res />} />
        </Route>

        <Route path="/leave-management" element={<LeaveManagement />}>
          <Route path="leaves" element={<Llog />} />
          <Route path="leave-report" element={<Lsheet />} />
        </Route>

        <Route path="/payroll" element={<Payroll/>}>
          
          <Route path="slip" element={<Pslip />} />
        </Route>

        <Route path="/passwordmanagement" element={<Pass />} />
        <Route path="/New_HRMS" element={<Hrms />} />

        <Route path="/companypolicy" element={<Cpolicy />} />

        <Route path="/holiday-mgmt" element={<Hmgmt />} />
      </Routes>
    </div>
  );
}
