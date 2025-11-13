import { Status } from "@/constants";
import React, { ReactNode } from "react";

// type RequestStatus = "idle" | "loading" | "success" | "error";

interface RequestStateProps {
  status: Status;
  children: ReactNode;
}

const RequestStateContext = React.createContext<Status>(Status.IDLE);

export const RequestState = ({ status, children }: RequestStateProps) => {
  return (
    <RequestStateContext.Provider value={status}>
      {children}
    </RequestStateContext.Provider>
  );
};

const createSubComponent =
  (matchStatus: Status) =>
  ({ children }: { children: ReactNode }) => {
    const status = React.useContext(RequestStateContext);
    return status === matchStatus ? <>{children}</> : null;
  };

RequestState.Loading = createSubComponent(Status.LOADING);
RequestState.Error = createSubComponent(Status.ERROR);
RequestState.Success = createSubComponent(Status.SUCCESS);