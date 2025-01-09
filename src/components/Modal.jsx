import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Modal({
  open,
  children,
  title,
  contentText,
  handleContinue,
  handleClose,
}) {
  let content;
  if (handleClose) {
    content = (
      <div>
        <Dialog open={open}>
          {/*dialog container*/}
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            {/* Main body of modal/dialog */}
            <DialogContentText>
              {/* main text */}
              {contentText}
            </DialogContentText>
            {children} {/* Other content */}
          </DialogContent>
          <DialogActions>
            {/* Dialog action buttons */}
            {/* Force users to make input without option to cancel */}
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleContinue}>Continue</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else {
    content = (
      <div>
        <Dialog open={open}>
          {/*dialog container*/}
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            {/* Main body of modal/dialog */}
            <DialogContentText>
              {/* main text */}
              {contentText}
            </DialogContentText>
            {children} {/* Other content */}
          </DialogContent>
          <DialogActions>
            {/* Dialog action buttons */}
            {/* Force users to make input without option to cancel */}
            <Button onClick={handleContinue}>Continue</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  return <div>{content}</div>;
}
Modal.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.element,
  title: PropTypes.string,
  contentText: PropTypes.string,
  handleContinue: PropTypes.func,
  handleClose: PropTypes.func,
};
