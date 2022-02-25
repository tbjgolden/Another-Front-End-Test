import React, { useMemo, useEffect } from "react";
import { Tabs, Tab } from "baseui/tabs-motion";
import { Notification, KIND } from "baseui/notification";
import PatientList from "./components/PatientList";

const TAB_OVERRIDES = {
  TabPanel: {
    style: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
};

export default () => {
  const [activeKey, setActiveKey] = React.useState("0");
  const [isLoading, setIsLoading] = React.useState(false);
  const [{ patients, error }, setResponse] = React.useState({
    patients: [],
    error: null,
  });

  useEffect(() => {
    setIsLoading(false);
    fetch(`/patients`)
      .then((res) => res.json())
      .then((patients) => {
        setResponse({
          patients,
          error: null,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        setResponse({
          patients: [],
          error,
        });
      });
  }, []);

  const { inactive, randomized } = useMemo(() => {
    const inactive = [];
    const randomized = [];
    patients.forEach((patient) => {
      if (patient.status === "inactive") {
        inactive.push(patient);
      } else if (patient.status === "randomized") {
        randomized.push(patient);
      }
    });
    return {
      inactive,
      randomized,
    };
  }, [patients]);

  return (
    <main>
      <h1 className="mb2">Patients</h1>
      {error === null ? null : (
        <Notification
          kind={KIND.negative}
          overrides={{
            Body: { style: { width: "auto" } },
          }}
        >
          Error loading data
        </Notification>
      )}
      {isLoading ? null : (
        <Tabs
          activeKey={activeKey}
          onChange={({ activeKey }) => {
            setActiveKey(activeKey);
          }}
          activateOnFocus
        >
          <Tab
            title={`Inactive (${inactive.length})`}
            overrides={TAB_OVERRIDES}
          >
            <PatientList patients={inactive} />
          </Tab>
          <Tab
            title={`Randomized (${randomized.length})`}
            overrides={TAB_OVERRIDES}
          >
            <PatientList patients={randomized} />
          </Tab>
          <Tab title={`All (${patients.length})`} overrides={TAB_OVERRIDES}>
            <PatientList patients={patients} />
          </Tab>
        </Tabs>
      )}
    </main>
  );
};
