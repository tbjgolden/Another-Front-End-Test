import React from "react";
import {
  list,
  headerRow,
  columnLeft,
  columnRight,
  row,
  patientHeader,
  patientSubheader,
  patientContact,
  buttons,
  topButton,
  bottomButton,
} from "./PatientList.module.css";

export default ({ patients }) => {
  return (
    <div className={list}>
      <div className={headerRow}>
        <div className={columnLeft}>Patient Details</div>
        <div className={columnRight} />
      </div>
      {patients.map((patient, index) => (
        <PatientRow patient={patient} index={index} />
      ))}
    </div>
  );
};

export const PatientRow = ({ patient }) => {
  const sex = patient.sex ? `${capitalize(patient.sex)}, ` : "";
  const age = patient.age ? `${patient.age}, ` : "";

  const contactDetails = [patient.account.phone, patient.account.email]
    .filter(Boolean)
    .join(", ");

  return (
    <div className={row}>
      <div className={columnLeft}>
        <div className={patientHeader}>
          {patient.patientId} - {patient.account.firstName}{" "}
          {patient.account.lastName}
        </div>
        <div className={patientSubheader}>
          {sex}
          {age}
          {patient.location.city}, {patient.location.state}
        </div>
        <div className={patientContact}>{contactDetails}</div>
      </div>
      <div className={columnRight}>
        {patient.status ? (
          <div>{capitalize(patient.status)}</div>
        ) : (
          <div className={buttons}>
            <button className={topButton}>Randomized</button>
            <button className={bottomButton}>Inactive</button>
          </div>
        )}
      </div>
    </div>
  );
};

const capitalize = (str) => `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
