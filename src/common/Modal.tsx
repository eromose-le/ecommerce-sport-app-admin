import { ReactNode, useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { SxProps, Theme } from "@mui/system";

interface ReusableModalProps {
  customStyle?: SxProps<Theme>; // Optional custom styling passed as props
  triggerSection: ReactNode; // Custom Trigger section
  iconSection: ReactNode; // Custom Icon section
  contentSection: ReactNode; // Custom content inside the modal
  buttonSection: ReactNode; // Custom buttons inside the modal
  handleClose: () => void; // Function to handle modal close action
  handleOpen: () => void; // Function to handle modal open action
  open: boolean; // Modal open state
  reason?: "backdropClick" | "escapeKeyDown"; // Modal open state (optional, with default)
  disableBackdropClick?: boolean; // Prevent closing on backdrop click
}

export default function ReusableModal({
  customStyle,
  triggerSection,
  iconSection,
  contentSection,
  buttonSection,
  handleClose,
  handleOpen,
  open = false,
  reason = "backdropClick",
  disableBackdropClick = true, // Default to prevent closing on backdrop click
}: ReusableModalProps) {
  const defaultStyle: SxProps<Theme> = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    borderRadius: "12px",
    bgcolor: "background.paper",
    border: "1px solid #10182808",
    boxShadow: 24,
    p: 4,
  };

  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleModalClose = () => {
    if (disableBackdropClick && reason === "backdropClick") {
      return;
    }
    handleClose();
  };

  return (
    <>
      {/* Trigger Section */}
      <div onClick={handleOpen}>{triggerSection}</div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleModalClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box sx={{ ...defaultStyle, ...customStyle }} className="space-y-5">
            {/* Icon Section */}
            {iconSection}

            {/* Content Section */}
            {contentSection}

            {/* Button Section */}
            {buttonSection}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
