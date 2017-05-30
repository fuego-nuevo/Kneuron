import React from "react";
import { Button, Modal, NavItem } from "react-materialize";
import { Link } from 'react-router';

let subject = "";

const CreateCohortModal = (props) => {
  return (
    <Modal
      header="Create a Cohort"
      fixedFooter
      trigger={<NavItem>Create Cohort</NavItem>}
    >
      <input
        type="text"
        placeholder="Cohort Subject"
        onChange={e => {
          subject = e.target.value}
        }
      />
      <br />

      <Link to="/dashboard">
        <Button
          waves="light"
          modal="close"
          onClick={() => {
            console.log(subject);
            props.handleCohortCreate(subject);
          }
        }
        >
          Create Cohort
        </Button>
      </Link>
    </Modal>
  );
};

export default CreateCohortModal;
