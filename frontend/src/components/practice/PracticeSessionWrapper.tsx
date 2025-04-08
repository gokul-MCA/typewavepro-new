import { Outlet, useParams } from "react-router-dom";
import PracticeLogic from "./PracticeLogic";

const PracticeSessionWrapper = () => {
  const { sessionId } = useParams();
  return (
    <PracticeLogic key={sessionId}>
      <Outlet />
    </PracticeLogic>
  );
};

export default PracticeSessionWrapper;
