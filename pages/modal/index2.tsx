import { useState } from "react";
import { Button, Container } from "@mui/material";
import Modal from "react-modal";
import Head from "next/head";
import Sideber from "../../components/Sidebar";

const customStyles = {
  content: {
    top: "20%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "40%",
  },
};

function App() {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  return (
    <div>
      <Sideber />
      <Container maxWidth="sm">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setEditModalIsOpen(true);
          }}
        >
          モーダル開く
        </Button>
        <Modal isOpen={editModalIsOpen} style={customStyles}>
          モーダル開いた
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setEditModalIsOpen(false);
            }}
          >
            ✕
          </Button>
        </Modal>
      </Container>
    </div>
  );
}

export default App;
