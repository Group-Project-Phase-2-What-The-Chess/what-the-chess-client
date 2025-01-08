import Swal from "sweetalert2";

export const swallErrorPopup = (value) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: value,
  });
};
